import React from 'react';
import './SectionHeader.css';
import type { JSX } from "react/jsx-dev-runtime";
import SkipButton from './SkipButton';

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
    return (
        <div className="section-header">
            <div className="section-header__top">
                <div className="section-header__title-wrap">
                    <h2 className="section-header__title">
                        {title}
                        {required && <span className="section-header__required"> *</span>}
                    </h2>
                </div>

                <div className="section-header__skip-area">
                    <SkipButton disabled={true} />
                </div>
            </div>

            <div className="section-header__progress-row">
                <span className="section-header__progress-dot" aria-hidden="true" />
            </div>
        </div>
    );
};

export default SectionHeader;