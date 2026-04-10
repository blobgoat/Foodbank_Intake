import React from 'react';
import { useNavigate } from 'react-router-dom';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';
import { toPlainText, getBaseButtonVars, pxToFluid } from '../utils/utils';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './ButtonBase.css';
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
  label = englishText.cSubmitButton,
  disabled = false,
}: SubmitButtonProps) => {
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
    '--button-font-size': pxToFluid(aesthetics.button_font_size_submit, ref),
    '--button-width': pxToFluid(aesthetics.button_width_submit, ref),
    '--button-height': pxToFluid(aesthetics.button_height_submit, ref),
    '--button-icon-size': pxToFluid(aesthetics.button_icon_size_submit, ref),
  } as React.CSSProperties;

  return (
    <button
      className="btn-base submit-button"
      style={cssVars}
      onClick={handleClick}
      disabled={disabled}
      aria-label={toPlainText(label, aesthetics.foodbank_name)}
    >
      <span className="submit-button__label">{formatTranslations(label)}</span>
      {aesthetics.button_icon_submit && (
        <img
          className="btn-base__icon"
          src={aesthetics.button_icon_submit}
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default SubmitButton;
