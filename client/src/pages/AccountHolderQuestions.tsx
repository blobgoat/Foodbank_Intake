import React, { useState } from 'react';
import './AccountHolderQuestions.css';
import './formBase.css';
import './reusableUI.css';
import { translationAPI } from '../../../modifiable_content/translationAPI';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import { pxToFluid } from '../utils/utils';

const AccountHolderQuestions: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    const translations = translationAPI.getStandardTranslation();
    const ref = Number(aesthetics.button_scale_reference_width);

    const cssVars = {
        '--question-font': String(aesthetics.info_font),
        '--question-font-size': pxToFluid(String(aesthetics.questions_font_size), ref),
        '--question-text-color': `#${aesthetics.question_text_color}`,
        '--textbox-fill': `#${aesthetics.textbox_fill}`,
    } as React.CSSProperties;

    return (
        <div className="card-containerForQuestions" style={cssVars}>
            <div className="questions">
                {/* Q1: First Name */}
                <div className="questions__group">
                    <label className="questions__label" htmlFor="ah-first-name" role="heading">
                        {translations.p2Q1FirstName}
                    </label>
                    <input
                        id="ah-first-name"
                        className="questions__input"
                        type="text"
                        value={firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        autoComplete="given-name"
                        placeholder={translations.p2Q1FirstNamePlaceholder}
                    />
                </div>

                {/* Q2: Last Name */}
                <div className="questions__group">
                    <label className="questions__label" htmlFor="ah-last-name" role="heading">
                        {translations.p2Q2LastName}
                    </label>
                    <input
                        id="ah-last-name"
                        className="questions__input"
                        type="text"
                        value={lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                        autoComplete="family-name"
                        placeholder={translations.p2Q2LastNamePlaceholder}
                    />
                </div>

                {/* Q3: Date of Birth */}
                <div className="questions__group">
                    <label className="questions__label" htmlFor="ah-dob" role="heading">
                        {translations.p2Q3DOB}
                    </label>
                    <input
                        id="ah-dob"
                        className="questions__input"
                        type="date"
                        value={dob ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
                        autoComplete="bday"
                        placeholder={translations.p2Q3DOBPlaceholder}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountHolderQuestions;
