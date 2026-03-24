import { describe, test, expect, vi } from "vitest";
import { BLANK_DISABLED_CONTENT } from "../../generated/blankDisabledContent";
import { BLANK_MUTABLE_TEXT_TRANSLATION } from "../../generated/blankMutableTextTranslation";
import { BLANK_STANDARD_TEXT_TRANSLATION } from "../../generated/blankStandardTextTranslation";
import { DisabledQuestionsAndPages, MutableTextTranslation, StandardTextTranslation } from "../../../modifiable_content/translationTextInterface";
import { validateKeyNaming } from "../utils/testutils";


//test to make sure the above are indeed blank, this is generated content
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


//test to make sure the function that tests difference jsonc files have correct key naming conventions is running correctly
describe.each([
    //valid tests
    //booleans
    //pages
    { content: { p1q1name: true, p1q2age: true, p1q3gender: true, p1q4ethnicity: true }, message: 'pages all true', valid: true },
    { content: { p1q1name: false, p1q2age: false, p1q3gender: false, p1q4ethnicity: false }, message: 'pages all false', valid: true },
    { content: { p1q1name: true, p1q2age: false, p1q3gender: true, p1q4ethnicity: false }, message: 'pages mixed values', valid: true },
    { content: { p1name: true, p1age: false, p3gender: true }, message: 'pages but with no q', valid: true },
    //components
    { content: { cBackButton: true, cNextButton: true, cSubmitButton: true, cIntakeInfoHeader: true }, message: 'components all true', valid: true },
    { content: { cBackButton: false, cNextButton: false, cSubmitButton: false, cIntakeInfoHeader: false }, message: 'components all false', valid: true },
    { content: { cBackButton: true, cNextButton: false, cSubmitButton: true, cIntakeInfoHeader: false }, message: 'components mixed false and true', valid: true },
    //mixture
    { content: { p1q1name: true, p1q2age: false, p1q3gender: true, p1q4ethnicity: false, cBackButton: true, cNextButton: false, cSubmitButton: true, cIntakeInfoHeader: false }, message: 'mixed pages and components', valid: true },

    //strings

    //pages
    { content: { p1WelcomeMessage: 'Welcome', p1Notice: 'Notice', p1Preamble: 'Preamble' }, message: 'just pages string all filled', invalidKeys: [], valid: true },
    { content: { p1WelcomeMessage: '', p1Notice: '', p1Preamble: '' }, message: 'just pages string all empty', invalidKeys: [], valid: true },
    { content: { p1WelcomeMessage: 'Welcome', p1Notice: '', p1Preamble: 'Preamble' }, message: 'just pages string some empty', invalidKeys: [], valid: true },
    { content: { p1q1WelcomeMessage: 'Welcome', p1Notice: '', p1q1Preamble: 'Preamble' }, message: 'just pages with questions string some empty', invalidKeys: [], valid: true },

    //components
    { content: { cBackButton: 'Back', cNextButton: 'Next', cSubmitButton: 'Submit', cIntakeInfoHeader: 'Header' }, message: 'just components all filled', invalidKeys: [], valid: true },
    { content: { cBackButton: '', cNextButton: '', cSubmitButton: '', cIntakeInfoHeader: '' }, message: 'just components all empty', invalidKeys: [], valid: true },
    { content: { cBackButton: 'Back', cNextButton: '', cSubmitButton: 'Submit', cIntakeInfoHeader: '' }, message: 'just components mixed values', invalidKeys: [], valid: true },
    //mixture
    { content: { p1WelcomeMessage: 'Welcome', p1Notice: '', p1Preamble: 'Preamble', cBackButton: 'Back', cNextButton: '', cSubmitButton: 'Submit', cIntakeInfoHeader: '' }, message: 'mixed pages and components with some empty values', invalidKeys: [], valid: true },

    //mixture of boolean and strings
    { content: { p1WelcomeMessage: 'Welcome', p1Notice: '', p1Preamble: 'Preamble', cBackButton: 'Back', cNextButton: '', cSubmitButton: 'Submit', cIntakeInfoHeader: '', p1q1name: true, p1q2age: false, p1q3gender: true, p1q4ethnicity: false }, message: 'mixed pages and components with some empty values and booleans', invalidKeys: [], valid: true },

    //specific
    { content: {}, message: 'empty object', invalidKeys: [], valid: true },
    //invalid tests, will just use boolean for simplicity

    //boolean
    { content: { name: true, age: false, gender: true, ethnicity: false }, message: 'all keys no prescript', invalidKeys: ['name', 'age', 'gender', 'ethnicity'], valid: false },
    { content: { p1q1name: true, p1q2age: false, p1q3gender: true, invalidKey: true }, message: 'single clearly invalid key', invalidKeys: ['invalidKey'], valid: false },
    { content: { cBackButton: true, cNextButton: true, cSubmitButton: true, invalidKey: true }, message: 'components with one invalid key', invalidKeys: ['invalidKey'], valid: false },
    { content: { e1q1name: true, p1q2age: false, p1q3gender: true }, message: 'one key starts with e instead of p', valid: false },


    //number is already being caught by syntax of javascript objects
    //specific cases
    { content: { p1: true }, message: 'just prefix for page', invalidKeys: ['p1'], valid: false },
    { content: { c: true }, message: 'just prefix for component', invalidKeys: ['c'], valid: false },

    //testing generated content cause why not, but it should be accurate given other tests
    { content: BLANK_DISABLED_CONTENT, message: 'BLANK_DISABLED_CONTENT is valid', valid: true },
    { content: BLANK_MUTABLE_TEXT_TRANSLATION, message: 'BLANK_MUTABLE_TEXT_TRANSLATION is valid', valid: true },
    { content: BLANK_STANDARD_TEXT_TRANSLATION, message: 'BLANK_STANDARD_TEXT_TRANSLATION is valid', valid: true },
])('validateKeyNaming test', ({ content, message, invalidKeys, valid }) => {
    if (invalidKeys === undefined) {
        invalidKeys = []
    }
    if (valid) {
        test(`The test:"${message}" had a problem with logic. `, () => {
            expect(() => validateKeyNaming(content, 'test content')).not.toThrow()
        })
        //want to test that the console is not currently logging any invalid keys
        test(`The test:"${message}" should not log anything`, () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
            validateKeyNaming(content, 'test content');
            expect(consoleSpy).not.toHaveBeenCalled();
            consoleSpy.mockRestore();
        })

    } else {
        //the test should throw an error with the invalid keys in the message
        test(`The test:"${message}" should throw an error with the invalid keys: ${invalidKeys.join(', ')}.`, () => {
            let error: Error | undefined;
            try {
                validateKeyNaming(content, 'test content');
            } catch (e) {
                error = e as Error;
            }
            expect(error).toBeDefined();
            expect(error?.message).toContain(invalidKeys.join(', '));
        })
    }
})

