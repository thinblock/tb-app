import * as React from 'react';
import { SignUpForm } from './SignUpView';
import { firebaseAuth } from 'components';
import { push } from 'react-router-redux';
const { connect } = require('react-redux');

interface IProps extends ReactIntl.InjectedIntlProps {
  changeRoute: Redux.ActionCreator<Redux.Action>;
}

@connect(
  (state) => ({ auth: state.auth }),
  (dispatch) => ({
    changeRoute: (s) => dispatch(push(s)),
  }),
)
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
    return <SignUpForm />;
  }
}

export { SignUpContainer }
