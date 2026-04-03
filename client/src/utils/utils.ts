
/**
 * Strips formatting markers (* ** ***) and replaces <name> with the given
 * foodbank name to produce a plain string suitable for aria-label attributes.
 * Use this alongside formatTranslations() when you need both a rendered JSX
 * element and an accessible plain-text equivalent of the same raw translation.
 *
 * @param raw - the raw translation string (may contain * ** *** and <name>)
 * @param foodbankName - the foodbank name to substitute for <name>
 * @returns a plain string with all formatting tokens removed
 */
export function toPlainText(raw: string, foodbankName: string): string {
  return raw
    .replace(/\*+/g, '')
    .replace(/<name>/gi, foodbankName)
    .trim();
}
