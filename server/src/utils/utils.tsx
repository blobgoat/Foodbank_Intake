import { JSX } from "react";
// import aesthetics from '../../modifiable_content/foodbank_aesthetics.json'

// utility file that contains helper functions for the client
export function demo_sum(a: number, b: number) {
  return a + b
}

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
 */
export function formatTranslation(translation: string | string[]): JSX.Element | JSX.Element[] {
  let workableTranslation: string[] = (Array.isArray(translation)) ? translation : [translation];

  const formattedTranslation: JSX.Element[] = workableTranslation.map((line, index) => {
    // just put a span around the lin for now
    //find any <Name> and replace with Foodbank Name



    return <span key={index}>{line}</span>
  });
  return formattedTranslation.length === 1 ? formattedTranslation[0] : formattedTranslation;



}