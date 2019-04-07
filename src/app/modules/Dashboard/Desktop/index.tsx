import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { IAuth } from 'models/auth';
import { logout } from 'redux/reducers/auth';
import { PageNav } from 'components/Navbar';
import { Footer } from 'components/Footer';
import { Container } from 'react-bootstrap';
import { Section } from 'components';
import { AddWallet, MonitoredWallets } from 'modules/Wallets';
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
      <div styleName="dashboard__wrap">
        <PageNav
          email={authReducer.user ? authReducer.user.email : ''}
          logoutAction={this.props.logout}
        />
        <Container>
          <div styleName="dashboard__content">
            <Section>
              <AddWallet />
            </Section>
            <Section>
              <MonitoredWallets />
            </Section>
          </div>
        </Container>
        <Footer />
      </div>
    ) as React.ReactNode;
  }
}

export { DesktopDashboard };
