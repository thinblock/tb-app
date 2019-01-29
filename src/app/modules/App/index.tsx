import { ToastContainer, ToastPosition } from 'react-toastify';
import { WithRouterProps } from 'react-router';
import { push } from 'react-router-redux';
import * as React from 'react';
import { Header } from 'components';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IProps extends WithRouterProps {
  changeRoute?(s: string): any;
}

@connect(
  (state) => ({ auth: state.auth }),
  (dispatch) => ({
    changeRoute: (s) => dispatch(push(s)),
  }),
)
class App extends React.Component<Partial<IProps>, any> {

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
        <Header />
        {this.props.children}
      </section>
    );
  }
}

export { App }
