import React from 'react';
import { useNavigate } from 'react-router-dom';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';
import { toPlainText } from '../utils/utils';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './BackButton.css';

interface BackButtonProps {
  /** Path to navigate to. Defaults to the previous page in browser history. */
  to?: string;
  /** Custom click handler. If provided alongside `to`, this runs first. */
  onClick?: () => void;
  /** Override the default label. */
  label?: string;
  disabled?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  onClick,
  label = `← ${englishText.cBackButton}`,
  disabled = false,
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (disabled) return;
    if (onClick) onClick();
    if (to) navigate(to);
    else navigate(-1);
  };

  const cssVars = {
    '--button-color-static': `#${aesthetics.button_color_static}`,
    '--button-color-hover': `#${aesthetics.button_color_hover}`,
    '--button-color-active': `#${aesthetics.button_color_active}`,
    '--button-color-disabled': `#${aesthetics.button_color_disabled}`,
    '--button-color-text': `#${aesthetics.button_color_text}`,
    '--button-border-color': `#${aesthetics.button_border_color}`,
    '--button-border-width': aesthetics.button_border_width,
    '--button-radius': aesthetics.corner_radius,
    '--button-font': aesthetics.regular_button_font,
    '--button-font-size': aesthetics.button_font_size_back,
    '--button-width': aesthetics.button_width_back,
    '--button-height': aesthetics.button_height_back,
    '--button-icon-size': aesthetics.button_icon_size_back,
  } as React.CSSProperties;

  return (
    <button
      className="back-button"
      style={cssVars}
      onClick={handleClick}
      disabled={disabled}
      aria-label={toPlainText(label, aesthetics.foodbank_name)}
    >
      {aesthetics.button_icon_back && (
        <img
          className="back-button__icon"
          src={aesthetics.button_icon_back}
          alt=""
          aria-hidden="true"
        />
      )}
      {formatTranslations(label)}
    </button>
  );
};

export default BackButton;