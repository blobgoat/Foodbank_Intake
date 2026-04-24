import type { PageAPI } from "./pages";
import { translationAPI } from "../../../modifiable_content/translationAPI";
import FormBase from "./formBase";
import type React from "react";
import disabledContent from "../../../modifiable_content/disabled_questions_and_pages.generated.json";
import englishText from "../../../modifiable_content/English/english_standard_text.generated.json";
import "./AccountHolder.css";

export const AccountHolderAPI: PageAPI = {
    headerName: translationAPI.getStandardTranslation().p2Title,
    loadbarPercentage: 5,
    infoText: translationAPI.getStandardTranslation().p2AccountHolderNotice,
    subheader: translationAPI.getStandardTranslation().p2AccountHolderQuestionSubheading,
    notice: translationAPI.getStandardTranslation().p2Notice,
};

const AccountHolder: React.FC = (): React.ReactElement => {
    return (
        <>
            <FormBase {...AccountHolderAPI} />
            <div className="account-holder-questions">
                {!disabledContent.p2Q1FirstName && (
                    <div className="form-question">
                        <label className="form-question__label" htmlFor="firstName">
                            {englishText.p2Q1FirstName}
                        </label>
                        <input
                            className="form-question__input"
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                        />
                    </div>
                )}
                {!disabledContent.p2Q2LastName && (
                    <div className="form-question">
                        <label className="form-question__label" htmlFor="lastName">
                            {englishText.p2Q2LastName}
                        </label>
                        <input
                            className="form-question__input"
                            id="lastName"
                            type="text"
                            autoComplete="family-name"
                        />
                    </div>
                )}
                {!disabledContent.p2Q3DOB && (
                    <div className="form-question">
                        <label className="form-question__label" htmlFor="dob">
                            {englishText.p2Q3DOB}
                        </label>
                        <input
                            className="form-question__input"
                            id="dob"
                            type="date"
                            autoComplete="bday"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default AccountHolder;
