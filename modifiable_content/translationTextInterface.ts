export interface StandardTextTranslation {
    //components
    BackButton: string;
    NextButton: string;
    SubmitButton: string;
    IntakeInfoHeader: string;

    //page 1
    WelcomeMessage: string;
    ClientInfoHeader: string;
    ClientInfoSubheader: string;
}

export interface MutableTextTranslation {
    //currently empty
    empty: string;
}

export interface DisabledQuestionsAndPages {
    p1WelcomePage: boolean;
    //currently only one page, but this can be expanded as we add more pages and questions
}

