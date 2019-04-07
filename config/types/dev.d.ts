/**
 * Type declarations for global development variables
 */
import * as React from 'react';
declare global {
  interface Window {
    // A hack for the Redux DevTools Chrome extension.
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <F extends Function>(f: F) => F;
    __INITIAL_STATE__?: any;
  }
}

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

declare module 'react' {
  interface HTMLAttributes<T> {
    styleName?: string;
  }
  interface SVGAttributes<T> {
      styleName?: string;
  }
}
