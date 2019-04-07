import * as React from 'react';
import * as CSSModules from 'react-css-modules';
const { connect } = require('react-redux');
import { Input, InputTypes, Button, ButtonThemes } from 'components';
import { push } from 'react-router-redux';
import { signupUsingFirebase } from 'redux/reducers/auth';
import { IAuth } from 'models/auth';
import { toast } from 'react-toastify';
const style = require('./style.scss');

interface IInterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
  username?: string;
  authReducer?: IAuth;
  changeRoute?(r: string): any;
  signupUsingFirebase?(email: string, password: string): any;
}

interface IInterfaceState {
  email: string;
  error: any;
  passwordOne: string;
  passwordTwo: string;
  username: string;
}
@connect(
  (state) => ({ authReducer: state.auth }),
  (dispatch) => ({
    changeRoute: (s) => dispatch(push(s)),
    signupUsingFirebase: (e: string, p: string) => dispatch(signupUsingFirebase(e, p)),
  }),
)
@CSSModules(style, { allowMultiple: true })
export class SignUpForm extends React.Component<
IInterfaceProps,
IInterfaceState
> {
  private static INITIAL_STATE = {
    email: '',
    error: null,
    passwordOne: '',
    passwordTwo: '',
    username: '',
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: IInterfaceProps) {
    super(props);
    this.state = { ...SignUpForm.INITIAL_STATE };
  }

  public componentDidMount() {
    if (this.props.authReducer.isLoggedIn) {
      this.props.changeRoute(`/dashboard`);
    }
  }

  public componentDidUpdate(prevProps: IInterfaceProps) {
    if (!prevProps.authReducer.errorMessage && this.props.authReducer.errorMessage) {
      toast.error(this.props.authReducer.errorMessage);
    }
  }

  public onSubmit(event: any) {
    event.preventDefault();

    const { email, passwordOne } = this.state;

    this.props.signupUsingFirebase(email, passwordOne);
  }

  public render() {
    const { username, email, passwordOne, passwordTwo } = this.state;
    const { authReducer: { loading } } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div styleName="signup__form">
        <form onSubmit={(event) => this.onSubmit(event)}>
          <Input
            id="username"
            value={username}
            block={true}
            onChange={(event) => this.setStateWithEvent(event, 'username')}
            type={InputTypes.TEXT}
            placeholder="Full Name"
          />
          <Input
            id="email"
            value={email}
            block={true}
            onChange={(event) => this.setStateWithEvent(event, 'email')}
            type={InputTypes.TEXT}
            placeholder="Email Address"
          />
          <Input
            id="password_one"
            value={passwordOne}
            block={true}
            onChange={(event) => this.setStateWithEvent(event, 'passwordOne')}
            type={InputTypes.PASSWORD}
            placeholder="Password"
          />
          <Input
            id="password_two"
            value={passwordTwo}
            block={true}
            onChange={(event) => this.setStateWithEvent(event, 'passwordTwo')}
            type={InputTypes.PASSWORD}
            placeholder="Confirm Password"
          />
          <div styleName="login__btn-wrap">
            <Button
              onClick={(event) => this.onSubmit(event)}
              theme={ButtonThemes.PRIMARY}
              disabled={isInvalid}
              block={true}
              processing={loading}
            >
              Sign Up
            </Button>
            <br />
            <p>Already have an account?</p>
            <Button
              onClick={(event) => {
                event.preventDefault();
                this.props.changeRoute(`/auth/login`);
              }}
              theme={ButtonThemes.TERTIARY}
              block={true}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  }

  private setStateWithEvent(value: string, columnType: string) {
    this.setState(SignUpForm.propKey(columnType, value));
  }
}
