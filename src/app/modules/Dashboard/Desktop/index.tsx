import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonThemes } from 'components';
import { IAuth } from 'models/auth';
import { logout } from 'redux/reducers/auth';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IDesktopDashboardProps {
  authReducer?: IAuth;
  logout?(): any;
  changeRoute(p: string): any;
}

const initialState = {
  active: false,
};

@connect(
  (state) => ({ authReducer: state.auth }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, { allowMultiple: true })
class DesktopDashboard extends React.Component<IDesktopDashboardProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public render() {
    const { authReducer } = this.props;
    return (
      <div>
        <Button
          theme={ButtonThemes.PRIMARY}
          onClick={() => {
            this.props.logout();
          }}>
          Logout
          </Button>
        <h1>
          <FormattedMessage id="dashboard.desktop.hello" /> {authReducer.user ? authReducer.user.email : ''}!
        </h1>
      </div>
    ) as React.ReactNode;
  }
}

export { DesktopDashboard };
