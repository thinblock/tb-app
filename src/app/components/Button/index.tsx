import * as React from 'react';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');

export enum ButtonThemes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SECONDARY_ACTION = 'secondary_action',
}

export enum ButtonSizes {
  SM = 'sm',
  LG = 'lg',
}

interface IButtonProps {
  theme?: ButtonThemes;
  size?: ButtonSizes;
  width?: number;
  fontSize?: number;
  center?: boolean;
  round?: boolean;
  block?: boolean;
  processing?: boolean;
  disabled?: boolean;
  onClick(): any;
};

const Button: React.SFC<IButtonProps> = CSSModules(({
  children, block, width, processing = false, center = false,
  size = ButtonSizes.LG, theme = ButtonThemes.PRIMARY, onClick,
  disabled = false, round = false, fontSize,
}) => {
  let className = `button button__${size} button--${theme}`;
  const styleObj: any = {};

  if (width) {
    styleObj.width = `${width}px`;
  }

  if (fontSize) {
    styleObj.fontSize = `${fontSize}px`;
  }

  if (center) {
    className += ' button--center';
  }

  if (disabled || processing) {
    className += ' button--disabled';
  }

  if (block) {
    className += ' button--block';
  }

  if (round) {
    className += ' button--round';
  }

  return (
    <button
      disabled={disabled || processing} style={styleObj}
      onClick={(e) => !(processing || disabled) && onClick(e)} styleName={className}
    >
      {processing ? <span>Processing..</span> : children}
    </button>
  );
}, style, { allowMultiple: true });

export { Button };
