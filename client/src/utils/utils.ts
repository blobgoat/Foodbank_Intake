
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
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';

/**
 * Returns the CSS custom properties that are identical across every button
 * variant.  Spread this into a button's cssVars object and then add only the
 * per-button properties (font, size, width, height, icon-size) on top.
 *
 * @example
 * const cssVars = {
 *   ...getBaseButtonVars(),
 *   '--button-font': aesthetics.dramatic_button_font,
 *   '--button-font-size': pxToFluid(aesthetics.button_font_size_start, ...),
 *   ...
 * } as React.CSSProperties;
 */
export function getBaseButtonVars(): Record<string, string> {
  return {
    '--button-color-static': `#${aesthetics.button_color_static}`,
    '--button-color-hover': `#${aesthetics.button_color_hover}`,
    '--button-color-active': `#${aesthetics.button_color_active}`,
    '--button-color-disabled': `#${aesthetics.button_color_disabled}`,
    '--button-color-text': `#${aesthetics.button_color_text}`,
    '--button-border-color': `#${aesthetics.button_border_color}`,
    '--button-border-width': aesthetics.button_border_width,
    '--button-radius': aesthetics.corner_radius,
  };
}

export function toPlainText(raw: string, foodbankName: string): string {
  return raw
    .replace(/\*+/g, '')
    .replace(/<name>/gi, foodbankName)
    .trim();
}

/**
 * Converts a CSS pixel value string into a fluid clamp() expression so that
 * the element scales proportionally with the viewport instead of staying fixed.
 *
 * The px value is treated as the *designed size* at `referenceViewportWidth`
 * (set via button_scale_reference_width in foodbank_aesthetics).  At that exact
 * width the button renders at the authored px size; below it the button shrinks
 * to a minimum of `minFraction * value`; it never grows beyond the authored px.
 *
 * Non-px values ("auto", "1em", etc.) are returned unchanged.
 *
 * Examples (referenceViewportWidth = 1440, minFraction = 0.5):
 *   "335px"  →  "clamp(168px, 23.26vw, 335px)"
 *   "106px"  →  "clamp(53px, 7.36vw, 106px)"
 *   "120px"  →  "clamp(60px, 8.33vw, 120px)"
 *   "auto"   →  "auto"
 *
 * @param pxStr                  - CSS value string from the aesthetics config
 * @param referenceViewportWidth - viewport width (px) the design was authored at
 * @param minFraction            - floor as a fraction of the authored value (0–1)
 */
export function pxToFluid(
  pxStr: string,
  referenceViewportWidth: number = 1440,
  minFraction: number = 0.5,
): string {
  const match = /^(\d+(?:\.\d+)?)px$/.exec(pxStr);
  if (!match) return pxStr;                          // "auto", "1em", etc. — unchanged
  const val = parseFloat(match[1]);
  const vw = ((val / referenceViewportWidth) * 100).toFixed(2);
  const min = Math.round(val * minFraction);
  return `clamp(${min}px, ${vw}vw, ${val}px)`;
}