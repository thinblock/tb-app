import * as React from 'react';

interface IIconProps {
  type: IconTypes;
  size?: number;
  imageIcon?: boolean;
  style?: any;
  onClick?(e: React.MouseEvent<HTMLSpanElement>): any;
};

export enum IconTypes {
  ARROW_LEFT_WHITE = 'ion-ios-arrow-thin-left',
}

const Icon: React.SFC<IIconProps> = ({ type, imageIcon = false, size, style, ...rest }) => {
  const styleObj: any = {...style};
  imageIcon = type.indexOf('.') >= 0; // Check automatically :smirk: if its icon or image

  if (size) {
    styleObj.fontSize = size;
  }

  return (
    !imageIcon ?
      <span className={type} {...rest} style={styleObj} /> :
      <img src={`./icons/${type}`} alt="icon" style={styleObj} />
  );
};

export { Icon };
