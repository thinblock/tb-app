import * as React from 'react';
import * as CSSModules from 'react-css-modules';

const style = require('./style.scss');

export const Footer: React.SFC<{}> = CSSModules(() => (
  <div styleName="footer">
    <p>Copyright 2019 Thinblock</p>
    <p>hello@thinblock.io</p>
  </div>
), style);
