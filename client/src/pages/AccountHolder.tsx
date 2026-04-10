import type { PageAPI } from "./pages";
import { translationAPI } from "../../../modifiable_content/translationAPI";
import formBase from "./formBase";
import type React from "react";
import type { ReactNode } from "react";

export const AccountHolderAPI: PageAPI = {
    headerName: 'Account Holder',
    loadbarPercentage: 0,
    infoText: translationAPI.getStandardTranslation().p2AccountHolderNotice
};

const AccountHolder: React.FC = (): React.ReactNode | Promise<ReactNode> => {
    return formBase(AccountHolderAPI);
}

export default AccountHolder;