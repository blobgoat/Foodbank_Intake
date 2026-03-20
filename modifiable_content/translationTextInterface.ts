export type StandardTextTranslation = {
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

export type MutableTextTranslation = {
    //currently empty
}

export type DisabledQuestionsAndPages = {
    welcoming_page: boolean;
    //currently only one page, but this can be expanded as we add more pages and questions
}

