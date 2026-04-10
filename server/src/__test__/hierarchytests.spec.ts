//This file will test to make sure that the structure of the modifiable_content is correct. Ensureing users/developers won't update
import { describe, test, expect } from 'vitest'
import { translationAPI } from '../../../modifiable_content/translationAPI'
import { BLANK_STANDARD_TEXT_TRANSLATION } from '../../generated/blankStandardTextTranslation';
import { BLANK_MUTABLE_TEXT_TRANSLATION } from '../../generated/blankMutableTextTranslation';
import { parse } from 'jsonc-parser';
import path from "path";
import fs from 'fs';
import { validateKeyNaming } from '../utils/testUtils';

const __dirname: string = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([a-z]:)/i, '$1'));
//test to see that a folder exists in modifiable content for each supported language
describe('Test that there is a folder with relevant files for each supported language', () => {


    translationAPI.supportedLanguages.forEach((language: string) => {
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
            const standardtranslationFilePath: string = path.join(__dirname, `../../../modifiable_content/${language}/${lowercaseLanguage}_standard_text.jsonc`);
            const content: unknown = parse(fs.readFileSync(standardtranslationFilePath, 'utf8'));
            validateKeyNaming(content, `modifiable_content/${language}/${lowercaseLanguage}_standard_text.jsonc standard translation file`);
        });

        //each folder has only 4 files
        test(`Folder for ${language} should only have the expected files`, () => {
            const expectedFiles = [`${lowercaseLanguage}_mutable_text.jsonc`, `${lowercaseLanguage}_standard_text.jsonc`, `${lowercaseLanguage}_mutable_text.generated.json`, `${lowercaseLanguage}_standard_text.generated.json`];
            const folderPath = path.join(__dirname, `../../../modifiable_content/${language}`);
            const actualFiles = fs.readdirSync(folderPath).filter((file: string) => fs.statSync(path.join(folderPath, file)).isFile());
            const extraFiles = actualFiles.filter((file: string) => !expectedFiles.includes(file));
            const missingFiles = expectedFiles.filter((file: string) => !actualFiles.includes(file));
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
            .filter((entry: fs.Dirent) => entry.isFile())
            .map((entry: fs.Dirent) => entry.name);

        const actualFolders = entries
            .filter((entry: fs.Dirent) => entry.isDirectory())
            .map((entry: fs.Dirent) => entry.name);

        const extraFiles = actualFiles.filter((file: string) => !expectedFiles.includes(file));
        const missingFiles = expectedFiles.filter((file: string) => !actualFiles.includes(file));

        const extraFolders = actualFolders.filter((folder: string) => !expectedFolders.includes(folder));
        const missingFolders = expectedFolders.filter((folder: string) => !actualFolders.includes(folder));
        expect(extraFiles, `Extra files found in modifiable content: ${extraFiles.join(', ')}`).toEqual([]);
        expect(extraFolders, `Extra folders found in modifiable content: ${extraFolders.join(', ')}`).toEqual([]);
        expect(missingFiles, `Missing files in modifiable content: ${missingFiles.join(', ')}`).toEqual([]);
        expect(missingFolders, `Missing folders in modifiable content: ${missingFolders.join(', ')}`).toEqual([]);
    });
});


describe('Test that the keys of the standard translation file is correct', () => {
    translationAPI.supportedLanguages.forEach((language: string) => {
        test(`Standard translation file for ${language} should have correct keys`, () => {
            //other test already checks that the file is parsable json, so we can just use it cause the test is already try catching it

            const standardtranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${language.toLocaleLowerCase()}_standard_text.jsonc`);
            const content: unknown = parse(fs.readFileSync(standardtranslationFilePath, 'utf8')); //just to make sure its valid json before we require it, otherwise the error messages will be very confusing
            const expectedKeys = Object.keys(BLANK_STANDARD_TEXT_TRANSLATION);
            if (typeof content !== 'object' || content === null) {
                throw new Error(`Content of ${language} standard translation is not a valid object`);
            }

            const actualKeys = Object.keys(content);
            const missingKeys = expectedKeys.filter((key: string) => !actualKeys.includes(key));
            const extraKeys = actualKeys.filter((key: string) => !expectedKeys.includes(key));
            expect(actualKeys.sort(), `Keys in ${language} standard translation are not matching. Missing: ${missingKeys.join(', ')} Extra: ${extraKeys.join(', ')}`).toEqual(expectedKeys.sort());
        });
    });
});

describe('Test that the keys of the mutable translation file is correct', () => {
    translationAPI.supportedLanguages.forEach((language: string) => {
        test(`Mutable translation file for ${language} should have correct keys`, () => {
            const mutabletranslationFilePath = path.join(__dirname, `../../../modifiable_content/${language}/${language.toLocaleLowerCase()}_mutable_text.jsonc`);
            const content: unknown = parse(fs.readFileSync(mutabletranslationFilePath, 'utf8'));
            if (typeof content !== 'object' || content === null) {
                throw new Error(`Content of ${language} mutable translation is not a valid object`);
            }
            const expectedKeys = Object.keys(BLANK_MUTABLE_TEXT_TRANSLATION);
            const actualKeys = Object.keys(content);
            const missingKeys = expectedKeys.filter((key: string) => !actualKeys.includes(key));
            const extraKeys = actualKeys.filter((key: string) => !expectedKeys.includes(key));
            expect(actualKeys.sort(), `Keys in ${language} mutable translation are not matching. Missing: ${missingKeys.join(', ')} Extra: ${extraKeys.join(', ')}`).toEqual(expectedKeys.sort());
        });
    });
});



