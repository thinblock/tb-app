import { ToastContainer, ToastPosition } from 'react-toastify';
import { WithRouterProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import * as React from 'react';
import { IState } from 'interfaces/components';
import { firebaseAuth, Spinner } from 'components';
import { IAuth } from 'models/auth';
import { setUserObject } from 'redux/reducers/auth';
import { withRouterDecorator } from 'helpers';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IProps extends WithRouterProps {
  history: any;
  authReducer?: IAuth;
  setUserObject?(user: firebase.User): any;
  changeRoute?(s: string): any;
  roles: {
    [index: string]: string[];
  };
}

const initialState = {
  authUser: null,
};

@withRouterDecorator()
@connect(
  (state) => ({ authReducer: state.auth }),
  (dispatch) => ({
    setUserObject: (user: firebase.User) => dispatch(setUserObject(user)),
    changeRoute: (s) => dispatch(push(s)),
  }),
)
@CSSModules(style, { allowMultiple: true })
class App extends React.Component<IProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public componentDidMount() {
    firebaseAuth.auth().onAuthStateChanged((authUser) => {
      this.props.setUserObject(authUser);
    });
  }

  public componentDidUpdate(prevProps: IProps) {
    const { authReducer, location } = this.props;

    // check auth state
    if (location.pathname === '/') {
      if (authReducer.user) {
        if (!authReducer.user.emailVerified) {
          this.props.changeRoute(`/unverified`);
        } else {
          this.props.changeRoute(`/dashboard`);
        }
      } else {
        this.props.changeRoute(`/auth/login`);
      }
    } else {
      if (!authReducer.bootstrapping && authReducer.user && !prevProps.authReducer.user) {
        if (!authReducer.user.emailVerified) {
          this.props.changeRoute(`/unverified`);
        } else {
          this.props.changeRoute(`/dashboard`);
        }
      } else if (!authReducer.user && prevProps.authReducer.user) {
        this.props.changeRoute(`/auth/login`);
      }
    }
  }

  public render() {
    const { authReducer } = this.props;

    return (
      <section styleName="app">
        <ToastContainer
          position={ToastPosition.TOP_CENTER}
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          draggable={true}
          pauseOnHover={true}
        />
        {/* <Helmet {...appConfig.app} {...appConfig.app.head}/> */}
        {
          authReducer.bootstrapping ? (
            <Spinner />
          ) : (
            <React.Fragment>
              {this.props.children}
            </React.Fragment>
          )
        }
      </section>
    );
  }
}

export { App }
