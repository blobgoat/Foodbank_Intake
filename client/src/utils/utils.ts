
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
/**
 * this function is used to convert raw translation strings that may contain formatting markers
 * into a plain text string suitable for aria-labels
 * @param raw @type(String) 
 * @param foodbankName @type(String) optional, defaults to aesthetics.foodbank_name 
 * @returns 
 */
export function toPlainText(raw: string, foodbankName: string = aesthetics.foodbank_name): string {
  return raw
    .replace(/\*+/g, '')
    .replace(/<name>/gi, foodbankName)
    //removes everything with / followed by non-space characters, this gets all the markers for bullets and ordered lists
    .replace(/\/\S*/g, '')
    .trim();
}

/**
 * Converts a CSS pixel value string into a fluid clamp() expression so that
 * the element scales proportionally with the viewport instead of staying fixed.
 *
 * The authored px value is treated as the *minimum* size (ideal for the phone
 * reference viewport set via button_scale_reference_width).  Above that width
 * the element grows proportionally with the viewport, capped at
 * `maxFraction * value` so it never becomes unreasonably large on wide screens.
 *
 * Non-px values ("auto", "1em", etc.) are returned unchanged.
 *
 * Examples (referenceViewportWidth = 360, maxFraction = 2):
 *   "335px"  →  "clamp(335px, 93.06vw, 670px)"
 *   "106px"  →  "clamp(106px, 29.44vw, 212px)"
 *   "120px"  →  "clamp(120px, 33.33vw, 240px)"
 *   "auto"   →  "auto"
 *
 * @param pxStr                  - CSS value string from the aesthetics config
 * @param referenceViewportWidth - phone viewport width (px) the design was authored at
 * @param maxFraction            - ceiling as a multiple of the authored value (≥1)
 */
export function pxToFluid(
  pxStr: string,
  referenceViewportWidth: number = 360,
  maxFraction: number = 2,
): string {
  const match = /^(\d+(?:\.\d+)?)px$/.exec(pxStr);
  if (!match) return pxStr;                          // "auto", "1em", etc. — unchanged
  const val = parseFloat(match[1]);
  const vw = ((val / referenceViewportWidth) * 100).toFixed(2);
  const max = Math.round(val * maxFraction);
  return `clamp(${val}px, ${vw}vw, ${max}px)`;
}