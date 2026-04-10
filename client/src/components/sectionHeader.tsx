import React from 'react';
import './SectionHeader.css';
import type { JSX } from "react/jsx-dev-runtime";
import SkipButton from './SkipButton';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';

interface SectionHeaderProps {
    title: string;
    required?: boolean;
    canSkip?: boolean;
    onSkip?: () => void;
    skipLabel?: string;
    cannotSkipText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    required = false,
}: SectionHeaderProps): JSX.Element => {
    const cssVars = {
        '--header-color': '#000000',
        '--required-color': String(aesthetics.asterisk_color),
        '--skip-note-color': '#666666',
        '--progress-dot-color': '#1e90ff',
        '--header_font': String(aesthetics.page_heading_font),
        '--header_font_size': String(aesthetics.page_heading_font_size),
    } as React.CSSProperties;

    return (
        <div className="section-header" style={cssVars}>
            <div className="section-header__top">
                <span className="section-header__title-wrap">
                    <span className="section-header__title">
                        {formatTranslations(title)}
                    </span>
                    {required && <span className="section-header__required"> *</span>}
                </span>
                <SkipButton disabled={true} />



            </div>

            <div className="section-header__progress-row">
                <span className="section-header__progress-dot" aria-hidden="true" />
            </div>
        </div>
    );
};

export default SectionHeader;