import { describe, test, expect } from "vitest";
import { BLANK_DISABLED_CONTENT } from "../../generated/blankDisabledContent";
import { BLANK_MUTABLE_TEXT_TRANSLATION } from "../../generated/blankMutableTextTranslation";
import { BLANK_STANDARD_TEXT_TRANSLATION } from "../../generated/blankStandardTextTranslation";
import { DisabledQuestionsAndPages, MutableTextTranslation, StandardTextTranslation } from "../../../modifiable_content/translationTextInterface";


//test to make sure the above are indeed blank
describe('Test blank content creation functions', () => {
    test('createBlankDisabledContent creates a blank disabled content object', () => {
        for (const key in BLANK_DISABLED_CONTENT) {
            expect(BLANK_DISABLED_CONTENT[key as keyof DisabledQuestionsAndPages]).toBe(false)
        }
        //make sure its not empty
        expect(Object.keys(BLANK_DISABLED_CONTENT).length).toBeGreaterThan(0)
    })
    test('createBlankStandardTextTranslation creates a blank standard text translation object', () => {
        for (const key in BLANK_STANDARD_TEXT_TRANSLATION) {
            expect(BLANK_STANDARD_TEXT_TRANSLATION[key as keyof StandardTextTranslation]).toBe('')
        }
        expect(Object.keys(BLANK_STANDARD_TEXT_TRANSLATION).length).toBeGreaterThan(0)
    })
    test('createBlankMutableTextTranslation creates a blank mutable text translation object', () => {
        for (const key in BLANK_MUTABLE_TEXT_TRANSLATION) {
            expect(BLANK_MUTABLE_TEXT_TRANSLATION[key as keyof MutableTextTranslation]).toBe('')
        }
        expect(Object.keys(BLANK_MUTABLE_TEXT_TRANSLATION).length).toBeGreaterThan(0)
    })
});