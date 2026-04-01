//all the tests for modifiable content should be on this file, opted for backend cause its static

//import the file at ../../modifiable_content/disabled_questions_and_pages.json
import { describe, test, expect } from 'vitest'
import disabledContent from '../../../modifiable_content/disabled_questions_and_pages.generated.json'
import { BLANK_DISABLED_CONTENT } from '../../generated/blankDisabledContent'
import { validateKeyNaming } from '../utils/testUtils'



type dummyDisabledQuestionType = {
    p1q1name: boolean;
    p1q2age: boolean;
    p1q3gender: boolean;
    p1q4ethnicity: boolean;
}
const dummyDisabledContent: dummyDisabledQuestionType = {
    p1q1name: true,
    p1q2age: false,
    p1q3gender: true,
    p1q4ethnicity: false
}





//we can assume that type interface is valid since other test cases cover it
describe('isDisabledContent test helper function working?', () => {
    describe.each([

        //valid cases
        { valid: true, description: 'valid all true', disabledContent: { p1q1name: true, p1q2age: true, p1q3gender: true, p1q4ethnicity: true } },
        { valid: true, description: 'valid all false', disabledContent: { p1q1name: false, p1q2age: false, p1q3gender: false, p1q4ethnicity: false } },
        { valid: true, description: 'valid mixed values', disabledContent: { p1q1name: true, p1q2age: false, p1q3gender: true, p1q4ethnicity: false } },

        //invalid cases
        { valid: false, description: 'empty', disabledContent: {} },
        //missing one key
        { valid: false, description: 'missing fourth key', disabledContent: { p1q1name: true, p1q2age: false, p1q3gender: true } },
        { valid: false, description: 'missing second key', disabledContent: { p1q1name: true, p1q3gender: true, p1q4ethnicity: false } },
        //extra invalid key
        { valid: false, description: 'extra invalid key', disabledContent: { p1q1name: true, p1q2age: false, p1q3gender: true, p1q4ethnicity: false, invalidKey: true } },

        //non boolean value
        { valid: false, description: 'non-boolean value', disabledContent: { p1q1name: 'true', p1q2age: false, p1q3gender: true, p1q4ethnicity: false } },
        { valid: false, description: 'null value', disabledContent: { p1q1name: null, p1q2age: false, p1q3gender: true, p1q4ethnicity: false } }
    ])('should validate disabled content structure', ({ valid, description, disabledContent }) => {
        if (valid) {
            test(description, () => {
                expect(() => validateDisabledContent(disabledContent, dummyDisabledContent)).not.toThrow()
            })
        } else {
            test(description, () => {
                expect(() => validateDisabledContent(disabledContent, dummyDisabledContent)).toThrow()
            })
        }
    })
})


function validateDisabledContent(content: any, inter: any): void {
    //extracting purely interface from interface object

    //first make sure the content is the same type object as the interface
    const disabledContentCopy: any = JSON.parse(JSON.stringify(content)) //deep copy to avoid mutation
    for (const key in inter) {
        //first check whether the key exists on disabled content
        if (!(key in content)) {
            throw new Error(`Missing key in disabledContent: ${key}`)
        }

        if (typeof content[key] !== 'boolean') {
            throw new Error(`Key ${key} should have a boolean value`)
        }
        disabledContentCopy[key] = undefined //set to undefined to check for extra keys later
    }

    // Check for any extra keys in disabledContent that are not in DisabledQuestionsAndPages
    for (const key in disabledContentCopy) {
        if (disabledContentCopy[key] !== undefined) {
            throw new Error(`Extra key found in disabledContent: ${key}, make sure to update interface: ${inter.toString()} ${disabledContent.toString()}`)
        }
    }
}


//I want to make sure that the keys of the sturct either start with a "p#" or "c"



describe('linter test, keys should start with "p# or c', () => {
    test('dummy content keys start with "p#" or "c"', () => {
        expect(() => validateKeyNaming(dummyDisabledContent, 'dummy test content')).not.toThrow()
    })
    test('actual content keys start with "p#" or "c"', () => {
        expect(() => validateKeyNaming(disabledContent, 'json file')).not.toThrow()
    })
    test('interface content keys start with "p#" or "c"', () => {
        expect(() => validateKeyNaming(BLANK_DISABLED_CONTENT, 'interface')).not.toThrow()
    })
})


describe('actual DisabledContent valid', () => {
    test('valid content should not throw', () => {
        expect(() => validateDisabledContent(disabledContent, BLANK_DISABLED_CONTENT)).not.toThrow()
    })
})