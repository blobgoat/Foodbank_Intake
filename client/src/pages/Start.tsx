import React from 'react';
import type { JSX } from 'react';
import { formatTranslations } from '../../../server/src/utils/utils';
import StartButton from '../components/StartButton';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import FoodbankLogo from '../../../modifiable_content/Images/FoodbankLogo.png';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './Start.css';
import './reusableUI.css';

const Start: React.FC = (): JSX.Element => {
  const cssVars = {
    '--info-font': aesthetics.info_font,
    '--info-font-size': aesthetics.info_font_size,
    '--info-font-large-size': String(aesthetics.info_font_large_size),
    '--info-text-color': `#${aesthetics.info_text_color}`,
  } as React.CSSProperties
  return (
    <div className="start-container">
      {/* Logo card */}
      <div className="card-container">
        <img
          src={FoodbankLogo}
          alt="Lynwood Foodbank"
          className="start-logo"
        />
      </div>

      {/* Text + button card */}
      <div className="card-containerForText">
        {/* Notice — "Please note: …" */}
        <div className="start-text" style={cssVars}>
          {formatTranslations(englishText.p1Notice)}
        </div>

        {/* Welcome message — "We Serve Everyone!" */}
        <div className="start-textlarge" style={cssVars}>
          {formatTranslations(englishText.p1WelcomeMessage)}
        </div>

        {/* Preamble — "If you are struggling…" */}
        <div className="start-text" style={cssVars}>
          {formatTranslations(englishText.p1Preamble)}
        </div>

        {/* Start button */}
        <StartButton />
      </div>
    </div>
  );
};

export default Start;
