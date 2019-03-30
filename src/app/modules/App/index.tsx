import { ToastContainer, ToastPosition } from 'react-toastify';
import { WithRouterProps } from 'react-router';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import * as React from 'react';
import { IState } from 'interfaces/components';
import { firebaseAuth } from 'components';
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
class App extends React.Component<IProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  private unlisten: any;

  public componentDidMount() {
    this.unlisten = browserHistory.listen((location) => {
      if (location.pathname === '/') {
        if (this.props.authReducer.user) {
          this.props.changeRoute(`/dashboard`);
        } else {
          this.props.changeRoute(`/auth/login`);
        }
      }
    });

    firebaseAuth.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.props.setUserObject(authUser);
      } else {
        this.props.changeRoute(`/auth/login`);
      }
    });
  }

  public componentWillUnmount() {
      this.unlisten();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { authReducer } = this.props;
    if (authReducer.user && !prevProps.authReducer.user) {
      this.props.changeRoute(`/dashboard`);
    } else if (!authReducer.user && prevProps.authReducer.user) {
      this.props.changeRoute(`/auth/login`);
    }
  }

  public render() {
    return (
      <section className={style.AppContainer}>
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
        {this.props.children}
      </section>
    );
  }
}

export { App }
