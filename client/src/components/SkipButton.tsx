import React from 'react';
import { useNavigate } from 'react-router-dom';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';
import { toPlainText } from '../utils/utils';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './SkipButton.css';

interface SkipButtonProps {
  /** Path to navigate to when clicked. */
  to?: string;
  /** Custom click handler. If provided alongside `to`, this runs first. */
  onClick?: () => void;
  /** Override the default label. */
  label?: string;
  disabled?: boolean;
}

const SkipButton: React.FC<SkipButtonProps> = ({
  to,
  onClick,
  label = `${englishText.cSkipButton} →`,
  disabled = false,
}: SkipButtonProps) => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (disabled) return;
    if (onClick) onClick();
    if (to) navigate(to);
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
    '--button-font-size': aesthetics.button_font_size_skip,
    '--button-width': aesthetics.button_width_skip,
    '--button-height': aesthetics.button_height_skip,
    '--button-icon-size': aesthetics.button_icon_size_skip,
  } as React.CSSProperties;

  return (
    <button
      className="skip-button"
      style={cssVars}
      onClick={handleClick}
      disabled={disabled}
      aria-label={toPlainText(label, aesthetics.foodbank_name)}
    >
      {formatTranslations(label)}
      {aesthetics.button_icon_skip && (
        <img
          className="skip-button__icon"
          src={aesthetics.button_icon_skip}
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default SkipButton;