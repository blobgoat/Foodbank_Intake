import React from 'react';
import { useNavigate } from 'react-router-dom';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';
import { toPlainText, getBaseButtonVars, pxToFluid } from '../utils/utils';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './ButtonBase.css';
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

  const ref = Number(aesthetics.button_scale_reference_width);
  const cssVars = {
    ...getBaseButtonVars(),
    '--button-font': aesthetics.regular_button_font,
    '--button-font-size': pxToFluid(aesthetics.button_font_size_skip, ref),
    '--button-width': pxToFluid(aesthetics.button_width_skip, ref),
    '--button-height': pxToFluid(aesthetics.button_height_skip, ref),
    '--button-icon-size': pxToFluid(aesthetics.button_icon_size_skip, ref),
    '--button-radius': aesthetics.corner_radius,
    '--button-color-text': `#${aesthetics.button_color_text}`,
  } as React.CSSProperties;

  return (
    <button
      className="btn-base skip-button"
      style={cssVars}
      onClick={handleClick}
      disabled={disabled}
      aria-label={toPlainText(label, aesthetics.foodbank_name)}
    >
      {formatTranslations(label)}
      {aesthetics.button_icon_skip && (
        <img
          className="btn-base__icon"
          src={aesthetics.button_icon_skip}
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default SkipButton;
