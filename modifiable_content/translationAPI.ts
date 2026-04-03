import englishMutableText from './English/english_mutable_text.generated.json';
import englishStandardText from './English/english_standard_text.generated.json';
import spanishMutableText from './Spanish/spanish_mutable_text.generated.json';
import spanishStandardText from './Spanish/spanish_standard_text.generated.json';

type SupportedLanguage = 'English' | 'Spanish';

const mutableTranslations: Record<SupportedLanguage, Record<string, string>> = {
    English: englishMutableText,
    Spanish: spanishMutableText,
};

const standardTranslations: Record<SupportedLanguage, Record<string, string>> = {
    English: englishStandardText,
    Spanish: spanishStandardText,
};

export const translationAPI: {
    supportedLanguages: readonly ['English', 'Spanish'];
    currentLanguage: SupportedLanguage;
    getMutableTranslation(): Record<string, string>;
    getStandardTranslation(): Record<string, string>;
    changeLanguage(newLanguage: SupportedLanguage): void;
} = {
    supportedLanguages: ['English', 'Spanish'] as const,
    currentLanguage: 'English',

    getMutableTranslation(): Record<string, string> {
        return mutableTranslations[this.currentLanguage];
    },

    getStandardTranslation(): Record<string, string> {
        return standardTranslations[this.currentLanguage];
    },

    changeLanguage(newLanguage: SupportedLanguage): void {
        if (!this.supportedLanguages.includes(newLanguage)) {
            throw new Error(`Unsupported language: ${newLanguage}`);
        }
        this.currentLanguage = newLanguage;
    },

} as const;
