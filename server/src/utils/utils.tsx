import { type JSX } from "react";
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json'
import React from "react";



/**
 * This function takes a raw string with potential formatting and returns a JSX element.
 * Supported tokens:
 *    - "\n"           → line break between regular lines
 *    - "*text*"       → <em>text</em>
 *    - "**text**"     → <strong>text</strong>
 *    - "***text***"   → <strong><em>text</em></strong>
 *    - "<name>"       → foodbank / brand name
 *    - "/b text"      → bullet-point list item  (consecutive /b lines → one <ul>)
 *    - "/l text"      → numbered list item       (consecutive /l lines → one <ol>)
 *
 * List tokens must appear at the very start of a line followed by a space and the item
 * content (e.g. "/b First item").  Inline formatting (*bold*, etc.) works inside list
 * items too.  Consecutive lines of the same list type are grouped into a single <ul> or
 * <ol>; mixing /b and /l on adjacent lines produces separate lists.
 *
 * The returned element is wrapped in a <span>.
 *
 * @param rawTranslation - the raw translation string
 * @returns JSX.Element | JSX.Element[]
 */
export function formatTranslations(translation: string | string[]): JSX.Element | JSX.Element[] {
  const workableTranslation: string[] = Array.isArray(translation) ? translation : [translation];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formattedTranslation: JSX.Element[] = workableTranslation.map((line: string, _index: number) => {
    return formatTranslation(line, aesthetics.foodbank_name).element;
  });
  return formattedTranslation.length === 1 ? formattedTranslation[0] : formattedTranslation;
}

// ── Internal helpers ────────────────────────────────────────────────────────

/** The three kinds of content a single source line can represent. */
type LineKind = 'regular' | 'bullet' | 'ordered';

/** Classify a raw source line. */
function lineKind(line: string): LineKind {
  if (/^\/b(\s|$)/.test(line)) return 'bullet';
  if (/^\/l(\s|$)/.test(line)) return 'ordered';
  return 'regular';
}

/** Strip the /b or /l prefix (and the trailing space) from a list line. */
function listContent(line: string): string {
  return line.replace(/^\/[bl]\s*/, '');
}

/**
 * Process inline formatting tokens (*italic*, **bold**, ***bold+italic***, <name>)
 * within a single flat string and return an array of React nodes.
 * keyPrefix must be unique within the surrounding render to avoid key collisions.
 */
function formatInline(text: string, foodbankName: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const remaining = text.replace(/<name>/gi, foodbankName);
  const pattern = /(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = pattern.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push(remaining.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-${keyIndex}`}><em>{match[2]}</em></strong>);
    } else if (match[4] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-${keyIndex}`}>{match[4]}</strong>);
    } else if (match[6] !== undefined) {
      parts.push(<em key={`${keyPrefix}-${keyIndex}`}>{match[6]}</em>);
    }

    lastIndex = pattern.lastIndex;
    keyIndex++;
  }

  if (lastIndex < remaining.length) {
    parts.push(remaining.slice(lastIndex));
  }

  return parts;
}

// ── Public API ──────────────────────────────────────────────────────────────

/** The result of formatting a single translation string. */
type FormatTranslationResult = {
  element: JSX.Element;
  invalidTokens: string[];
};

export function formatTranslation(
  translation: string,
  foodbankName: string
): FormatTranslationResult {
  const { isValid, invalidTokens } = validateTranslationString(translation);

  if (!isValid) {
    throw new Error(`Invalid translation string. Invalid tokens: ${invalidTokens.join(', ')}`);
  }

  const lines = translation.split('\n');

  // Group consecutive lines of the same kind into segments so we can emit
  // a single <ul> or <ol> per run of list lines instead of one per line.
  type Segment = { kind: LineKind; lines: string[] };
  const segments: Segment[] = [];
  for (const line of lines) {
    const kind = lineKind(line);
    const last = segments[segments.length - 1];
    if (last && last.kind === kind) {
      last.lines.push(line);
    } else {
      segments.push({ kind, lines: [line] });
    }
  }

  const rendered: React.ReactNode[] = [];

  segments.forEach((seg: Segment, segIndex: number) => {
    if (seg.kind === 'bullet') {
      rendered.push(
        <ul key={`seg-${segIndex}`}>
          {seg.lines.map((line: string, lineIndex: number) => (
            <li key={lineIndex}>
              {formatInline(listContent(line), foodbankName, `${segIndex}-${lineIndex}`)}
            </li>
          ))}
        </ul>
      );
    } else if (seg.kind === 'ordered') {
      rendered.push(
        <ol key={`seg-${segIndex}`}>
          {seg.lines.map((line: string, lineIndex: number) => (
            <li key={lineIndex}>
              {formatInline(listContent(line), foodbankName, `${segIndex}-${lineIndex}`)}
            </li>
          ))}
        </ol>
      );
    } else {
      // Regular lines: emit each as a Fragment and add <br /> between them.
      // No <br /> at segment boundaries — block list elements provide their own spacing.
      seg.lines.forEach((line: string, lineIndex: number) => {
        rendered.push(
          <React.Fragment key={`${segIndex}-${lineIndex}`}>
            {formatInline(line, foodbankName, `${segIndex}-${lineIndex}`)}
            {lineIndex < seg.lines.length - 1 && <br />}
          </React.Fragment>
        );
      });
    }
  });

  return {
    element: <span>{rendered}</span>,
    invalidTokens,
  };
}

// ── Validation ──────────────────────────────────────────────────────────────

type TranslationValidationResult = {
  isValid: boolean;
  invalidTokens: string[];
};

/**
 * Validates a translation string for malformed tokens.
 * Invalid tokens: bare "<" / ">" (not part of <name>), unclosed asterisk groups.
 * List prefixes (/b, /l) are valid and do not need escaping.
 */
export function validateTranslationString(raw: string): TranslationValidationResult {
  const invalidTokens: string[] = [];

  const protectedRaw = raw.replace(/<name>/gi, '__NAME_PLACEHOLDER__');

  if (protectedRaw.includes('<')) invalidTokens.push('<');
  if (protectedRaw.includes('>')) invalidTokens.push('>');

  // *** must be closed
  const triplePattern = /\*\*\*(.+?)\*\*\*/g;
  let match: RegExpExecArray | null;
  while ((match = triplePattern.exec(raw)) !== null) {
    if (match[1].includes('*')) {
      invalidTokens.push(`Invalid nested formatting in ***${match[1]}***`);
    }
  }
  const withoutTriple = raw.replace(triplePattern, '$1');
  if (/\*\*\*(.*)/g.test(withoutTriple)) {
    invalidTokens.push('Unclosed triple asterisks');
    return { isValid: false, invalidTokens };
  }

  // ** must be closed
  const doublePattern = /\*\*(.+?)\*\*/g;
  while ((match = doublePattern.exec(withoutTriple)) !== null) {
    if (match[1].includes('*')) {
      invalidTokens.push(`Invalid nested formatting in **${match[1]}**`);
    }
  }
  const withoutDouble = withoutTriple.replace(doublePattern, '$1');
  if (/\*\*(.*)/g.test(withoutDouble)) {
    invalidTokens.push('Unclosed double asterisks');
    return { isValid: false, invalidTokens };
  }

  // Remaining * count must be even
  const asteriskCount = (withoutDouble.match(/\*/g) ?? []).length;
  if (asteriskCount % 2 !== 0) {
    invalidTokens.push('Unmatched asterisk');
  }

  return {
    isValid: invalidTokens.length === 0,
    invalidTokens,
  };
}
