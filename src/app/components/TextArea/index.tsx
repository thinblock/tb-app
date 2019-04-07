import * as React from 'react';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');

interface ITextAreaProps {
  onChange(val: string, event: React.ChangeEvent): any;
  id: string;
  name?: string;
  placeholder?: string;
  block?: boolean;
  errorMessage?: string;
  autoGrow?: boolean;
  lineHeight?: number;
  cols?: number;
  rows?: number;
  value?: number | string;
}

const TextArea = CSSModules(({ autoGrow, lineHeight, errorMessage, onChange, block, ...rest }) => {
    let className = `textarea `;
    if (block) {
      className += 'textarea--block';
    }
    if (autoGrow) {
      className += ' textarea--grow';
    }

    return (
      <div styleName="textarea-wrap">
        <textarea
          styleName={className} {...rest}
          onChange={(e) => {
            if (autoGrow) {
              e.target.rows = (e.target.scrollHeight / lineHeight);
            }
            onChange(e.target.value, e);
          }}
        />
        {
          errorMessage && (
          <p styleName={`textarea__error-message`}>
            {errorMessage}
          </p>
          )
        }
      </div>
    );
  },
  style,
  { allowMultiple: true },
) as React.SFC<ITextAreaProps>;

export { TextArea };
