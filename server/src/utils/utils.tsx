import { JSX } from "react";
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json'
import React from "react";
import { format } from "jsonc-parser";



/**
 * This function takes a raw string with potential formatting and return a HTML string.
 * Currently in functionality you should expect
 *    -"\n" to be replaced with line break
 *    -"*text*" to be replaced with <strong>text</strong>
 *    -"**text**" to be replaced with <em>text</em>
 *    -"***text***" to be replaced with <strong><em>text</em></strong>
 *    - "<name>" to be replaced with foodbank or brand name 
 * and the jsx element with be surrounded by <span>
 * @param rawTranslation - the raw translation string that may contain placeholders for formatting
 * @returns a JSX element array where the placeholders in the raw translation string are replaced with the appropriate JSX elements.
 *       or it returns a single JSX element if there is only one line in the translation string 
 */
export function formatTranslations(translation: string | string[]): JSX.Element | JSX.Element[] {
  let workableTranslation: string[] = (Array.isArray(translation)) ? translation : [translation];

  const formattedTranslation: JSX.Element[] = workableTranslation.map((line, index) => {
    // just put a span around the lin for now
    //find any <Name> and replace with Foodbank Name
    return formatTranslation(line, aesthetics.foodbank_name).element
  });
  return formattedTranslation.length === 1 ? formattedTranslation[0] : formattedTranslation;



}

/**This is the result of formatting a translation string */
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

  const formattedLines = lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let remaining = line.replace(/<name>/gi, foodbankName);

    //going to look for ***text***, **text**, *text* in that order, and replace with appropriate jsx elements, we will use regex groups to identify which one it is

    const pattern = /(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;


    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let keyIndex = 0;

    while ((match = pattern.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.slice(lastIndex, match.index));
      }

      if (match[2] !== undefined) {
        parts.push(
          <strong key={`${lineIndex}-${keyIndex}`}>
            <em>{match[2]}</em>
          </strong>
        );
      } else if (match[4] !== undefined) {
        parts.push(
          <strong key={`${lineIndex}-${keyIndex}`}>
            {match[4]}
          </strong>
        );
      } else if (match[6] !== undefined) {
        parts.push(
          <em key={`${lineIndex}-${keyIndex}`}>
            {match[6]}
          </em>
        );
      }

      lastIndex = pattern.lastIndex;
      keyIndex++;
    }

    if (lastIndex < remaining.length) {
      parts.push(remaining.slice(lastIndex));
    }

    return (
      <React.Fragment key={lineIndex}>
        {parts}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });

  return {
    element: <span>{formattedLines}</span>,
    invalidTokens,
  };
}
/**
  * Validates the translation string for any invalid tokens. Currently, the only invalid tokens are "<" and ">" that are not part of a valid placeholder. 
 */
type TranslationValidationResult = {
  isValid: boolean;
  invalidTokens: string[];
};
/**
 * this function checks for invalid tokens
 * invalid tokens are "<" and ">" that are not part of a valid placeholder.
 * note valid placeholders are only <name> for now
 * @param raw - the raw translation string to validate
 * @return an object containing a boolean indicating whether the string is valid and an array of the invalid tokens found
 */
export function validateTranslationString(raw: string): TranslationValidationResult {
  const invalidTokens: string[] = [];

  const protectedRaw = raw.replace(/<name>/gi, '__NAME_PLACEHOLDER__');

  if (protectedRaw.includes('<')) {
    invalidTokens.push('<');
  }

  if (protectedRaw.includes('>')) {
    invalidTokens.push('>');
  }
  //if there is three apostrophe in a row it should be closed with a three apostrophes
  const tripleApostrophePattern = /\*\*\*(.+?)\*\*\*/g;
  let match: RegExpExecArray | null;
  while ((match = tripleApostrophePattern.exec(raw)) !== null) {
    const content: string = match[1];
    if (content.includes('*')) {
      invalidTokens.push(`Invalid nested formatting in ***${content}***`);
    }
  }
  //now remove all the triple apostrophes so they dont interfere with the double and single apostrophe checks
  const withoutTriple = raw.replace(tripleApostrophePattern, '$1');
  //check to see if there are any triple apostrophes that are not closed
  const unclosedTriplePattern = /\*\*\*(.*)/g;
  if (unclosedTriplePattern.test(withoutTriple)) {
    invalidTokens.push('Unclosed triple apostrophes');
    return invalidTokens.length === 0 ? { isValid: true, invalidTokens: [] } : { isValid: false, invalidTokens };
  }

  //if there is two apostrophe in a row it should be closed with two apostrophes
  const doubleApostrophePattern = /\*\*(.+?)\*\*/g;
  while ((match = doubleApostrophePattern.exec(withoutTriple)) !== null) {
    const content: string = match[1];
    if (content.includes('*')) {
      invalidTokens.push(`Invalid nested formatting in **${content}**`);
    }
  }
  const withoutDouble = withoutTriple.replace(doubleApostrophePattern, '$1');
  //now check if unclosed double apostrophes
  const unclosedDoublePattern = /\*\*(.*)/g;
  if (unclosedDoublePattern.test(withoutDouble)) {
    invalidTokens.push('Unclosed double apostrophes');
    return invalidTokens.length === 0 ? { isValid: true, invalidTokens: [] } : { isValid: false, invalidTokens };
  }

  //if there is one apostrophe it should be closed or in other words there should not be an odd number of apostrophes
  //so count all apostrophes
  const apostrophePattern = /\*/g;
  let apostropheCount = 0;
  while ((match = apostrophePattern.exec(withoutDouble)) !== null) {
    apostropheCount++;
  }
  if (apostropheCount % 2 !== 0) {
    invalidTokens.push('Unmatched apostrophe');
  }

  return {
    isValid: invalidTokens.length === 0,
    invalidTokens,
  };
}
