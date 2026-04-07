import React from 'react';
import type { JSX } from 'react';
import { formatTranslations } from '../../../server/src/utils/utils';
import StartButton from '../components/StartButton';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import FoodbankLogo from '../../../modifiable_content/Images/FoodbankLogo.png';
import './Start.css';

const Start: React.FC = (): JSX.Element => {
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
        <div className="start-text">
          {formatTranslations(englishText.p1Notice)}
        </div>

        {/* Welcome message — "We Serve Everyone!" */}
        <div className="start-text">
          {formatTranslations(englishText.p1WelcomeMessage)}
        </div>

        {/* Preamble — "If you are struggling…" */}
        <div className="start-text">
          {formatTranslations(englishText.p1Preamble)}
        </div>

        {/* Start button */}
        <StartButton />
      </div>
    </div>
  );
};

export default Start;
