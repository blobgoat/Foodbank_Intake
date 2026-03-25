import { describe, test, expect, vi } from "vitest";
import { BLANK_DISABLED_CONTENT } from "../../generated/blankDisabledContent";
import { BLANK_MUTABLE_TEXT_TRANSLATION } from "../../generated/blankMutableTextTranslation";
import { BLANK_STANDARD_TEXT_TRANSLATION } from "../../generated/blankStandardTextTranslation";
import { DisabledQuestionsAndPages, MutableTextTranslation, StandardTextTranslation } from "../../../modifiable_content/translationTextInterface";
import { validateKeyNaming } from "../utils/testUtils";
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json'
import { formatTranslations } from '../utils/utils'
import { renderToStaticMarkup } from 'react-dom/server';

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

//testing to makesure formating the strings utitlity function is working correctly
describe.each([
    //no translations, just it accepts strings
    { translation: 'Welcome to the Foodbank!', expected: '<span>Welcome to the Foodbank!</span>', message: 'simple string with no place holders', valid: true },
    { translation: '', expected: '<span></span>', message: 'empty string', valid: true },

    //<name> placeholder

    { translation: 'Welcome to the <name>!', expected: `<span>Welcome to the ${aesthetics.foodbank_name}!</span>`, message: 'name placeholder lowercase', valid: true },
    { translation: 'Welcome to the <NAME>!', expected: `<span>Welcome to the ${aesthetics.foodbank_name}!</span>`, message: 'name placeholder uppercase', valid: true },

    //italics
    { translation: 'Welcome to the *Foodbank*!', expected: `<span>Welcome to the <em>Foodbank</em>!</span>`, message: 'italics placeholder', valid: true },
    { translation: 'Welcome to the *Foodbank* and enjoy your stay at the *Foodbank*!', expected: `<span>Welcome to the <em>Foodbank</em> and enjoy your stay at the <em>Foodbank</em>!</span>`, message: 'multiple italics placeholders', valid: true },
    { translation: 'Welcome to the *Foodbank and enjoy your stay*!', expected: `<span>Welcome to the <em>Foodbank and enjoy your stay</em>!</span>`, message: 'one long italics placeholder', valid: true },

    //bold
    { translation: 'Welcome to the **Foodbank**!', expected: `<span>Welcome to the <strong>Foodbank</strong>!</span>`, message: 'single word bold placeholder', valid: true },
    { translation: 'Welcome to the **Foodbank** and enjoy your stay at the **Foodbank**!', expected: `<span>Welcome to the <strong>Foodbank</strong> and enjoy your stay at the <strong>Foodbank</strong>!</span>`, message: 'multiple bold placeholders', valid: true },
    { translation: 'Welcome to the **Foodbank and enjoy your stay**!', expected: `<span>Welcome to the <strong>Foodbank and enjoy your stay</strong>!</span>`, message: 'one long bold placeholder', valid: true },

    //bold and italics
    { translation: 'Welcome to the ***Foodbank***!', expected: `<span>Welcome to the <strong><em>Foodbank</em></strong>!</span>`, message: 'single word bold and italics placeholder', valid: true },
    { translation: 'Welcome to the ***Foodbank*** and enjoy your stay at the ***Foodbank***!', expected: `<span>Welcome to the <strong><em>Foodbank</em></strong> and enjoy your stay at the <strong><em>Foodbank</em></strong>!</span>`, message: 'multiple bold and italics placeholders', valid: true },
    { translation: 'Welcome to the ***Foodbank and enjoy your stay***!', expected: `<span>Welcome to the <strong><em>Foodbank and enjoy your stay</em></strong>!</span>`, message: 'one long bold and italics placeholder', valid: true },

    //combinations of bold and bold and italics and name placeholder
    { translation: 'Welcome to the ***<name>***!', expected: `<span>Welcome to the <strong><em>${aesthetics.foodbank_name}</em></strong>!</span>`, message: 'name placeholder with bold and italics', valid: true },
    { translation: 'Welcome to the **<name>** and enjoy your stay at the *<name>*!', expected: `<span>Welcome to the <strong>${aesthetics.foodbank_name}</strong> and enjoy your stay at the <em>${aesthetics.foodbank_name}</em>!</span>`, message: 'multiple name placeholders with bold and italics', valid: true },
    { translation: 'Welcome to the ***<name>* and enjoy your stay**!', expected: `<span>Welcome to the <strong><em>${aesthetics.foodbank_name}</em> and enjoy your stay</strong>!</span>`, message: 'disjointed italics and bold, some covering some not, shouldnt support this', valid: false },

    //invalid cases
    { translation: 'Welcome to the **Foodbank!', expected: '', message: 'unclosed bold placeholder', valid: false },
    { translation: 'Welcome to the *Foodbank!', expected: '', message: 'unclosed italics placeholder', valid: false },
    { translation: 'Welcome to the ***Foodbank!', expected: '', message: 'unclosed bold and italics placeholder', valid: false },
    { translation: 'Welcome to the <name!', expected: '', message: 'unclosed name placeholder', valid: false },

    //tries to do html injection but should break
    { translation: 'Welcome to the <span>Foodbank</span>!', expected: ``, message: 'html injection attempt with span tags', valid: false },

])('formatTranslation test', ({ translation, expected, message, valid }) => {
    if (valid) {
        test(`The test:"${message}" should format the translation correctly. The params are: translation="${translation}", expected="${expected}"`, () => {
            const result = formatTranslations(translation);
            //now turn result into a string by rendering the jsx element to a string, we can use the renderToStaticMarkup function from react-dom/server for this
            const resultString: string = renderToStaticMarkup(result);
            expect(resultString).toEqual(expected);
        });
    } else {
        test(`The test:"${message}" should throw an error. The params are: translation="${translation}"`, () => {
            let error: Error | undefined;
            try {
                formatTranslations(translation);
            } catch (e) {
                error = e as Error;
            }
            expect(error).toBeDefined();
        });
    }
})