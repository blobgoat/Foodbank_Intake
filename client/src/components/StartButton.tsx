import React from 'react';
import { useNavigate } from 'react-router-dom';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';
import { toPlainText, getBaseButtonVars, pxToFluid } from '../utils/utils';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './ButtonBase.css';
import './StartButton.css';

interface StartButtonProps {
  /** Path to navigate to when clicked. */
  to?: string;
  /** Custom click handler. If provided alongside `to`, this runs first. */
  onClick?: () => void;
  /** Override the default label. */
  label?: string;
  disabled?: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({
  to,
  onClick,
  label = englishText.cStartButton,
  disabled = false,
}: StartButtonProps) => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (disabled) return;
    if (onClick) onClick();
    if (to) navigate(to);
  };

  const ref = Number(aesthetics.button_scale_reference_width);
  const cssVars = {
    ...getBaseButtonVars(),
    '--button-font': aesthetics.dramatic_button_font,
    '--button-font-size': pxToFluid(aesthetics.button_font_size_start, ref),
    '--button-width': pxToFluid(aesthetics.button_width_start, ref),
    '--button-height': pxToFluid(aesthetics.button_height_start, ref),
    '--button-icon-size': pxToFluid(aesthetics.button_icon_size_start, ref),
    '--button-border-margin': aesthetics.button_border_margin,
  } as React.CSSProperties;

  return (
    <button
      className="btn-base start-button"
      style={cssVars}
      onClick={handleClick}
      disabled={disabled}
      aria-label={toPlainText(label)}
    >
      <span className="start-button__label">{formatTranslations(label)}</span>
      {aesthetics.button_icon_start && (
        <img
          className="btn-base__icon"
          src={aesthetics.button_icon_start}
          //alt text is not necessary for decorative icon
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default StartButton;
