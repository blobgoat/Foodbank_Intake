//This file will test to make sure that the structure of the modifiable_content is correct. Ensureing users/developers won't update
import { describe, test, expect } from 'vitest'
import { translationAPI } from '../../../modifiable_content/translationAPI'
import { BLANK_STANDARD_TEXT_TRANSLATION } from '../../generated/blankStandardTextTranslation';
import { BLANK_MUTABLE_TEXT_TRANSLATION } from '../../generated/blankMutableTextTranslation';
import { parse } from 'jsonc-parser';
import path from "path";
import fs from 'fs';
import { validateKeyNaming } from '../utils/testUtils';

//test to see that a folder exists in modifiable content for each supported language
describe('Test that there is a folder with relevant files for each supported language', () => {


    translationAPI.supportedLanguages.forEach((language) => {
        const lowercaseLanguage = language.toLocaleLowerCase();
        test(`Folder for ${language} should exist`, () => {
            const folderPath = path.join(__dirname, `../../../modifiable_content/${language}`);
            expect(fs.existsSync(folderPath)).toBe(true);
        });
        test(`modifiable content should have a mutable translation file for ${language} .jsonc`, () => {
            const mutabletranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${lowercaseLanguage}_mutable_text.jsonc`);
            expect(() => {
                parse(fs.readFileSync(mutabletranslationFilePath, 'utf8'));

            }).not.toThrow();
        });
        test(`modifiable content should have a mutable translation file for ${language} generated.json`, () => {
            const mutabletranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${lowercaseLanguage}_mutable_text.generated.json`);
            expect(() => {
                parse(fs.readFileSync(mutabletranslationFilePath, 'utf8'));

            }).not.toThrow();
        });
        test(`modifiable content should have a standard translation file for ${language} generated.json`, () => {
            const standardtranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${lowercaseLanguage}_standard_text.generated.json`);
            expect(() => {
                parse(fs.readFileSync(standardtranslationFilePath, 'utf8'));
            }).not.toThrow();
        });

        test(`valid keys in standard translation file for ${language} jsonc`, () => {
            const standardtranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${lowercaseLanguage}_standard_text.jsonc`);
            const content = parse(fs.readFileSync(standardtranslationFilePath, 'utf8'));
            validateKeyNaming(content, `modifiable_content/${language}/${lowercaseLanguage}_standard_text.jsonc standard translation file`);
        });

        //each folder has only 4 files
        test(`Folder for ${language} should only have the expected files`, () => {
            const expectedFiles = [`${lowercaseLanguage}_mutable_text.jsonc`, `${lowercaseLanguage}_standard_text.jsonc`, `${lowercaseLanguage}_mutable_text.generated.json`, `${lowercaseLanguage}_standard_text.generated.json`];
            const folderPath = path.join(__dirname, `../../../modifiable_content/${language}`);
            const actualFiles = fs.readdirSync(folderPath).filter(file => fs.statSync(path.join(folderPath, file)).isFile());
            const extraFiles = actualFiles.filter(file => !expectedFiles.includes(file));
            const missingFiles = expectedFiles.filter(file => !actualFiles.includes(file));
            expect(extraFiles, `Extra files found in ${language} folder: ${extraFiles.join(', ')}`).toEqual([]);
            expect(missingFiles, `Missing files in ${language} folder: ${missingFiles.join(', ')}`).toEqual([]);
        });

    });
    //I want to test and see that in modified content, if I hit ls in the terminal, I should only see these folders, plus the language ones
    test('modifiable content should only have the language folders and the expected json/ts files, these are hard coded in test files', () => {
        const expectedFiles = ['disabled_questions_and_pages.jsonc', 'foodbank_aesthetics.jsonc', 'foodbank_aesthetics.generated.json', 'disabled_questions_and_pages.generated.json', 'translationAPI.ts', 'translationTextInterface.ts', 'README.md'];
        const expectedFolders = [...translationAPI.supportedLanguages, 'Images'];


        const entries = fs.readdirSync(path.join(__dirname, '../../../modifiable_content'), { withFileTypes: true });
        const actualFiles = entries
            .filter(entry => entry.isFile())
            .map(entry => entry.name);

        const actualFolders = entries
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name);

        const extraFiles = actualFiles.filter(file => !expectedFiles.includes(file));
        const missingFiles = expectedFiles.filter(file => !actualFiles.includes(file));

        const extraFolders = actualFolders.filter(folder => !expectedFolders.includes(folder));
        const missingFolders = expectedFolders.filter(folder => !actualFolders.includes(folder));
        expect(extraFiles, `Extra files found in modifiable content: ${extraFiles.join(', ')}`).toEqual([]);
        expect(extraFolders, `Extra folders found in modifiable content: ${extraFolders.join(', ')}`).toEqual([]);
        expect(missingFiles, `Missing files in modifiable content: ${missingFiles.join(', ')}`).toEqual([]);
        expect(missingFolders, `Missing folders in modifiable content: ${missingFolders.join(', ')}`).toEqual([]);
    });
});


describe('Test that the keys of the standard translation file is correct', () => {
    translationAPI.supportedLanguages.forEach((language) => {
        test(`Standard translation file for ${language} should have correct keys`, () => {
            //other test already checks that the file is parsable json, so we can just use it cause the test is already try catching it

            const standardtranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${language.toLocaleLowerCase()}_standard_text.jsonc`);
            const content = parse(fs.readFileSync(standardtranslationFilePath, 'utf8')); //just to make sure its valid json before we require it, otherwise the error messages will be very confusing
            const expectedKeys = Object.keys(BLANK_STANDARD_TEXT_TRANSLATION);
            const actualKeys = Object.keys(content);
            const missingKeys = expectedKeys.filter(key => !actualKeys.includes(key));
            const extraKeys = actualKeys.filter(key => !expectedKeys.includes(key));
            if (missingKeys.length > 0 || extraKeys.length > 0) {
                console.error(`Missing keys in ${language} standard translation: ${missingKeys.join(', ')}`);
                console.error(`Extra keys in ${language} standard translation: ${extraKeys.join(', ')}`);
            }
            expect(actualKeys.sort(), `Keys in ${language} standard translation are not matching`).toEqual(expectedKeys.sort());
        });
    });
});

describe('Test that the keys of the mutable translation file is correct', () => {
    translationAPI.supportedLanguages.forEach((language) => {
        test(`Mutable translation file for ${language} should have correct keys`, () => {
            const mutabletranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${language.toLocaleLowerCase()}_mutable_text.jsonc`);
            const content = parse(fs.readFileSync(mutabletranslationFilePath, 'utf8'));
            const expectedKeys = Object.keys(BLANK_MUTABLE_TEXT_TRANSLATION);
            const actualKeys = Object.keys(content);
            const missingKeys = expectedKeys.filter(key => !actualKeys.includes(key));
            const extraKeys = actualKeys.filter(key => !expectedKeys.includes(key));
            if (missingKeys.length > 0 || extraKeys.length > 0) {
                console.error(`Missing keys in ${language} mutable translation: ${missingKeys.join(', ')}`);
                console.error(`Extra keys in ${language} mutable translation: ${extraKeys.join(', ')}`);
            }
            expect(actualKeys.sort(), `Keys in ${language} mutable translation are not matching`).toEqual(expectedKeys.sort());
        });
    });
});



