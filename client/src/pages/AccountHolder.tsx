import type { PageAPI } from "./pages";
import { translationAPI } from "../../../modifiable_content/translationAPI";
import formBase from "./formBase";
import AccountHolderQuestions from "./AccountHolderQuestions";
import type React from "react";
import type { ReactNode } from "react";

export const AccountHolderAPI: PageAPI = {
    headerName: translationAPI.getStandardTranslation().p2Title,
    loadbarPercentage: 5,
    infoText: translationAPI.getStandardTranslation().p2AccountHolderNotice,
    subheader: translationAPI.getStandardTranslation().p2AccountHolderQuestionSubheading,
    notice: translationAPI.getStandardTranslation().p2Notice,
};

const AccountHolder: React.FC = (): React.ReactNode | Promise<ReactNode> => {
    return (
        <>
            {formBase(AccountHolderAPI)}
            <AccountHolderQuestions />
        </>
    );
}

export default AccountHolder;