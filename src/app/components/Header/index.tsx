import * as React from 'react';
import { Link } from 'react-router';
import * as CssModule from 'react-css-modules';

const style = require('./style.scss');

export const Header = CssModule(() => (
  <nav styleName="Nav">
    <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
  </nav>
), style);
