import React from 'react';
import { useNavigate } from 'react-router-dom';
import englishText from '../../../modifiable_content/English/english_standard_text.generated.json';
import { formatTranslations } from '../../../server/src/utils/utils';
import { toPlainText, getBaseButtonVars, pxToFluid } from '../utils/utils';
import aesthetics from '../../../modifiable_content/foodbank_aesthetics.generated.json';
import './ButtonBase.css';
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

  const ref: number = Number(aesthetics.button_scale_reference_width);
  const cssVars = {
    ...getBaseButtonVars(),
    '--button-font': aesthetics.regular_button_font,
    '--button-font-size': pxToFluid(aesthetics.button_font_size_back, ref),
    '--button-width': pxToFluid(aesthetics.button_width_back, ref),
    '--button-height': pxToFluid(aesthetics.button_height_back, ref),
    '--button-icon-size': pxToFluid(aesthetics.button_icon_size_back, ref),
  } as React.CSSProperties;

  return (
    <button
      className="btn-base back-button"
      style={cssVars}
      onClick={handleClick}
      disabled={disabled}
      aria-label={toPlainText(label, aesthetics.foodbank_name)}
    >
      {aesthetics.button_icon_back && (
        <img
          className="btn-base__icon"
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
