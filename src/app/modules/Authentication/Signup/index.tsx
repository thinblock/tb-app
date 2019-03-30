import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { SignUpForm } from './SignUpView';
import { firebaseAuth, PageHeader } from 'components';
import { push } from 'react-router-redux';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IProps extends ReactIntl.InjectedIntlProps {
  changeRoute: Redux.ActionCreator<Redux.Action>;
}

@connect(
  (state) => ({ auth: state.auth }),
  (dispatch) => ({
    changeRoute: (s) => dispatch(push(s)),
  }),
)
@CSSModules(style, {allowMultiple: true})
class SignUpContainer extends React.Component<IProps, {}> {
  public handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebaseAuth.auth().createUserWithEmailAndPassword(email.value, password.value);
      this.props.changeRoute('/');
    } catch (error) {
      alert(error);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <PageHeader heading={'THINBLOCK SIGNUP'} onCloseRedirect="/" />
        <div className="container" styleName="signup_container__wrap">
          <div className="row">
            <div className="col-lg-6">
              <SignUpForm history={history} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { SignUpContainer }
