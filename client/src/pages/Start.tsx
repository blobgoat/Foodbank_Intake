import React from 'react';
import type { JSX } from 'react';
import { formatTranslations } from '../../../server/src/utils/utils';
import StartButton from '../components/StartButton';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import FoodbankLogo from '../../../modifiable_content/Images/FoodbankLogo.png';

const Start: React.FC = (): JSX.Element => {
  const textStyle: React.CSSProperties = {
    fontFamily: `${aesthetics.info_font}, sans-serif`,
    fontSize: aesthetics.info_font_size,
    color: `#${aesthetics.info_text_color}`,
    lineHeight: 1.6,
    textAlign: 'center',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      {/* Logo */}
      <img
        src={FoodbankLogo}
        alt={aesthetics.foodbank_name}
        style={{ maxWidth: '280px', width: '100%', height: 'auto' }}
      />

      {/* Notice — "Please note: …" */}
      <div style={textStyle}>
        {formatTranslations(englishText.p1Notice)}
      </div>

      {/* Welcome message — "We Serve Everyone!" */}
      <div style={textStyle}>
        {formatTranslations(englishText.p1WelcomeMessage)}
      </div>

      {/* Preamble — "If you are struggling…" */}
      <div style={textStyle}>
        {formatTranslations(englishText.p1Preamble)}
      </div>

      {/* Start button */}
      <StartButton />
    </div>
  );
};

export default Start;
