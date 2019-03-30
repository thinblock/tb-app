import * as React from 'react';
import * as CSSModules from 'react-css-modules';

const style = require('./style.scss');

export const Spinner = CSSModules(({}) => ( <div styleName={'spinner'} /> ), style);
