import React from 'react';
import './SectionHeader.css';
import type { JSX } from "react/jsx-dev-runtime";
import SkipButton from './SkipButton';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';
import { pxToFluid } from '../utils/utils';

interface SectionHeaderProps {
    title: string;
    subheader: string;
    notice: string;
    progress_percent?: number;
    required?: boolean;
    canSkip?: boolean;
    onSkip?: () => void;
    skipLabel?: string;
    cannotSkipText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    progress_percent = 0,
    subheader,
    notice,
    required = false,
}: SectionHeaderProps): JSX.Element => {
    const ref: number = Number(aesthetics.button_scale_reference_width);
    const cssVars = {
        '--header-color': '#000000',
        '--required-color': String(aesthetics.asterisk_color),
        '--skip-note-color': '#666666',
        '--progress-dot-color': '#1e90ff',
        '--header-font': String(aesthetics.page_heading_font),
        '--header-font-size': pxToFluid(aesthetics.page_heading_font_size, ref),
        '--progress-percentage': `${progress_percent}%`,
        '--notice-font': String(aesthetics.notice_font),
        '--notice-font-size': pxToFluid(String(aesthetics.notice_font_size), ref),
        '--notice-icon-size': pxToFluid(String(aesthetics.notice_icon_size), ref),
        '--icon-notice': `url(${aesthetics.icon_notice})`,
        '--subheader-font-size': pxToFluid(aesthetics.info_font_size, ref),
        '--subheader-font': String(aesthetics.info_font),
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
                <span className="section-header__progress-bar" aria-hidden="true">
                    <span className="section-header__progress-fill" />
                </span>
            </div>
            <div className="section-divider" />
            <div className="section-header__info__wrapper">
                <div className="section-header__info__icon" aria-hidden="true" />
                <div className="section-header__info__text">
                    {notice}
                </div>
            </div>

            <div className="section-divider" />
            <div className="section-header__subheader">
                {subheader}
            </div>
        </div>
    );
};

export default SectionHeader;