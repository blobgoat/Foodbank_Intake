import React from 'react';
import { useNavigate } from 'react-router-dom';
import { translationAPI } from '../../../modifiable_content/translationAPI';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './SubmitButton.css';

interface SubmitButtonProps {
  /** Path to navigate to after submission. */
  to?: string;
  /** Custom click handler. If provided alongside `to`, this runs first. */
  onClick?: () => void;
  /** Override the default label. */
  label?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  to,
  onClick,
  label = translationAPI.getStandardTranslation().cSubmitButton,
  disabled = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    if (to) navigate(to);
  };

  const cssVars = {
    '--button-color-static':   `#${aesthetics.button_color_static}`,
    '--button-color-hover':    `#${aesthetics.button_color_hover}`,
    '--button-color-active':   `#${aesthetics.button_color_active}`,
    '--button-color-disabled': `#${aesthetics.button_color_disabled}`,
    '--button-color-text':     `#${aesthetics.button_color_text}`,
    '--button-border-color':   `#${aesthetics.button_border_color}`,
    '--button-border-width':   aesthetics.button_border_width,
    '--button-radius':         aesthetics.corner_radius,
    '--button-font':           aesthetics.dramatic_button_font,
    '--button-font-size':      aesthetics.button_font_size_submit,
    '--button-width':          aesthetics.button_width_submit,
    '--button-height':         aesthetics.button_height_submit,
  } as React.CSSProperties;

  return (
    <button
      className="submit-button"
      style={cssVars}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
    >
      <span className="submit-button__label">{label}</span>
      {aesthetics.button_icon_submit && (
        <img
          className="submit-button__icon"
          src={aesthetics.button_icon_submit}
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default SubmitButton;
