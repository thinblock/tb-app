import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { Icon, IconTypes } from 'components/Icon';
import { push } from 'react-router-redux';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IPageHeaderProps {
  onCloseRedirect?: string;
  noBorders?: boolean;
  heading?: string;
  subheading?: string;
  leftActionColor?: string;
  leftActionIconSize?: number;
  hideRightAction?: boolean;
  onCloseClick?(): any;
  changeRoute?(s: string): any;
}

const renderPage = (props: IPageHeaderProps) => {
  const {
    changeRoute, onCloseRedirect, onCloseClick,
    heading, subheading, leftActionIconSize,
  } = props;

  const style = {
    fontSize: '30px',
  };

  return (
    <div styleName="header">
      <div styleName="header__actions">
        {onCloseClick && (
          <span styleName="header__close">
            <Icon
              size={leftActionIconSize}
              style={style}
              onClick={
                () => {
                  if (onCloseClick) {
                    onCloseClick();
                  } else {
                    changeRoute(onCloseRedirect);
                  }
                }
              }
              type={IconTypes.ARROW_LEFT_WHITE}
            />
          </span>
        )}
        {
          (heading || subheading) && (
            <div styleName="header__headings-wrap">
              <p>{heading}</p>
              {
                subheading &&
                <p>{subheading}</p>
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

const Header: React.SFC<IPageHeaderProps> = (props) => {
  return renderPage(props);
};

export const PageHeader = connect(
  null,
  (dispatch) => ({
    changeRoute: (r) => dispatch(push(r)),
  }),
)(CSSModules(Header, style, { allowMultiple: true })) as React.SFC<IPageHeaderProps>;
