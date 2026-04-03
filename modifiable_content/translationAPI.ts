export const translationAPI: {
    supportedLanguages: readonly ['English', 'Spanish'];
    currentLanguage: 'English' | 'Spanish';
    getMutableTranslation(): Record<string, string>;
    getStandardTranslation(): Record<string, string>;
    changeLanguage(newLanguage: 'English' | 'Spanish'): void;
} = {
    supportedLanguages: ['English', 'Spanish'] as const,
    currentLanguage: 'English',

    getMutableTranslation(): Record<string, string> {
        const fileReadingLanguage = this.currentLanguage.toLowerCase();
        try {
            const mutableTranslation = require(`./${fileReadingLanguage}/${fileReadingLanguage}_mutable_text.ts`);
            return mutableTranslation;
        } catch (error) {
            console.error(`Error loading mutable translation for language ${fileReadingLanguage}:`, error);
            throw new Error(`Could not load mutable translation for language ${fileReadingLanguage}`);
        }
    },

    getStandardTranslation(): Record<string, string> {
        const fileReadingLanguage = this.currentLanguage.toLowerCase();
        try {
            const standardTranslation = require(`./${fileReadingLanguage}/${fileReadingLanguage}_standard_text.ts`);
            return standardTranslation;
        } catch (error) {
            console.error(`Error loading standard translation for language ${fileReadingLanguage}:`, error);
            throw new Error(`Could not load standard translation for language ${fileReadingLanguage}`);
        }
    },

    changeLanguage(newLanguage: typeof translationAPI.supportedLanguages[number]): void {
        if (!this.supportedLanguages.includes(newLanguage)) {
            throw new Error(`Unsupported language: ${newLanguage}`);
        }
        this.currentLanguage = newLanguage;
    },

} as const;
