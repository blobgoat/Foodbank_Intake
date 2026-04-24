export interface StandardTextTranslation {
    //components
    cStartButton: string;
    cBackButton: string;
    cNextButton: string;
    cSkipButton: string;
    cSubmitButton: string;
    cIntakeInfoHeader: string;

    //page 1
    p1WelcomeMessage: string;
    p1Notice: string;
    p1Preamble: string;
    //page 2
    p2Title: string;
    p2Notice: string;
    p2AccountHolderQuestionSubheading: string;
    p2Q1FirstName: string;
    p2Q2LastName: string;
    p2Q3DOB: string;
}

export interface MutableTextTranslation {
    //currently empty
    p1Placeholder: string;
}

export interface DisabledQuestionsAndPages {
    p1WelcomePage: boolean;
    //currently only one page, but this can be expanded as we add more pages and questions
}

