import * as React from 'react';
import * as CSSModules from 'react-css-modules';
const {connect} = require('react-redux');
import { PageHeader as Header, Button, ButtonThemes } from 'components';
import { logout } from 'redux/reducers/auth';
const style = require('./style.scss');

const UnverifiedScreen = ({ logout }: { [key: string]: any }) => (
  <React.Fragment>
    <Header heading={'VERIFICATION REQUIRED'} onCloseRedirect="/" />
    <div className="container" styleName="container__wrap">
      <div className="row">
        <div className="col-lg-6">
          <p>Please verify your account. A confirmation email has been sent to your email address.</p>
          <p>Once verified, please refresh this page or login again.</p>
          <br />
          <Button
            theme={ButtonThemes.TERTIARY}
            onClick={() => {
              logout();
          }}>
            Back to login
          </Button>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export const Unverified = connect(
  null,
  (dispatch) => ({ logout: () => dispatch(logout()) }),
)(CSSModules(UnverifiedScreen, style)) as React.SFC<{}>;
