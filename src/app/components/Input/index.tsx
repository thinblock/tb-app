import * as React from 'react';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
}

export enum InputThemes {
  PRIMARY = 'primary',
}

export enum InputSizes {
  LG = 'lg',
  MD = 'md',
}

interface IInputProps {
  onChange(val: string, event: Event): any;
  type?: InputTypes;
  id: string;
  theme?: InputThemes;
  size?: InputSizes;
  mask?: any[];
  transparentBg?: boolean;
  label?: string;
  autoFocus?: boolean;
  block?: boolean;
  min?: number;
  max?: number;
  name?: string;
  disableAutoFocusedScroll?: boolean;
  inputRef?(s: any): any;
  length?: number;
  placeholder?: string;
  errorMessage?: string;
  value?: number | string;
}

const changeFunc = (onChange) => (e) => onChange(e.target.value, e);

const Input: React.SFC<IInputProps> = CSSModules((comProps: IInputProps) => {
  const {
    type = InputTypes.TEXT, errorMessage = '', inputRef,
    theme, size, label, transparentBg = false, disableAutoFocusedScroll = true,
    onChange, block = false, mask, length, ...rest  // tslint:disable-line
  } = comProps;
  let className = `input `;

  if (theme) {
    className += ` input--${theme}`;
  }

  if (size) {
    className += ` input--${size}`;
  }

  if (block) {
    className += ' input--block';
  }

  if (transparentBg) {
    className += ' input--transparent';
  }

  const props: any = {
    onChange: changeFunc(onChange),
    styleName: className,
    ...rest,
  };

  if (inputRef) {
    props.ref = inputRef;
  }

  return (
    <input type={type} {...props} />
  );
},
  style,
  { allowMultiple: true },
);

export {
  Input,
};
