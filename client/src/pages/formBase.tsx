// import type { JSX } from "react/jsx-dev-runtime";
import type React from "react";
import type { PageAPI } from "./pages";
import SectionHeader from "../components/sectionHeader";

const FormBase: React.FC<PageAPI> = (page: PageAPI): React.ReactElement => {
    // const cssVars = {
    //     '--header-name': page.headerName,
    //     '--loadBarPercentage': page.loadbarPercentage,
    //     '--info-text': page.infoText,
    // };
    return (
        <SectionHeader title={page.headerName} progress_percent={page.loadbarPercentage} subheader={page.subheader} notice={page.notice} required={true} />
    );

};

export default FormBase;