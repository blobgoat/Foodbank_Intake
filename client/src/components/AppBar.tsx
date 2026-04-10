import React from 'react';
import { translationAPI } from '../../../modifiable_content/translationAPI';
import { formatTranslations } from '../../../server/src/utils/utils';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './AppBar.css';

const AppBar: React.FC = () => {
  const rawText = translationAPI.getStandardTranslation().cIntakeInfoHeader;

  const cssVars = {
    '--appbar-height': aesthetics.appbar_height,
    '--appbar-background': `${aesthetics.secondary_color}`,
    '--appbar-color': `#${aesthetics.info_text_color}`,
    '--appbar-font': aesthetics.form_heading_font,
    '--appbar-font-size': aesthetics.form_heading_font_size,
  } as React.CSSProperties;

  return (
    <header className="appbar" style={cssVars}>
      <span className="appbar__title">{formatTranslations(rawText)}</span>
    </header>
  );
};

export default AppBar;
