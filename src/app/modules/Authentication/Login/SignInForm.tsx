import * as React from 'react';
import { loginUser } from 'redux/reducers/auth';
import { push } from 'react-router-redux';
import * as CSSModules from 'react-css-modules';
import { Button, Input, InputTypes, ButtonThemes } from 'components';
import { IAuth } from 'models/auth';
import { toast } from 'react-toastify';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IInterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
  authReducer?: IAuth;
  loginUser?(e: string, p: string): any;
  changeRoute?: Redux.ActionCreator<Redux.Action>;
}

interface IInterfaceState {
  loading: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
  email: string;
  error: any;
  password: string;
}

@connect(
  (state) => ({ authReducer: state.auth }),
  (dispatch) => ({
    changeRoute: (s) => dispatch(push(s)),
    loginUser: (e: string, p: string) => dispatch(loginUser(e, p)),
  }),
)
@CSSModules(style, { allowMultiple: true })
export class SignInForm extends React.Component<
IInterfaceProps,
IInterfaceState
> {
  private static INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: false,
    errorMessage: '',
    isLoggedIn: false,
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: IInterfaceProps) {
    super(props);
    this.state = { ...SignInForm.INITIAL_STATE };
  }

  public componentDidMount() {
    if (this.props.authReducer.isLoggedIn) {
      this.props.changeRoute(`/dashboard`);
    }
  }

  public componentDidUpdate(prevProps: IInterfaceProps) {
    if (!prevProps.authReducer.isLoggedIn && this.props.authReducer.isLoggedIn) {
      // user logged in
      this.props.changeRoute(`/dashboard`);
    } else if (!prevProps.authReducer.errorMessage && this.props.authReducer.errorMessage) {
      toast.error(this.props.authReducer.errorMessage);
    }
  }

  public onSubmit = (event: any) => {
    const { email, password } = this.state;
    this.props.loginUser(email, password);
    event.preventDefault();
  }

  public render() {
    const { email, password } = this.state;
    const { authReducer: { loading } } = this.props;

    const isInvalid = password === '' || email === '';

    return (
      <div styleName="login__container">
        <form onSubmit={(event) => this.onSubmit(event)}>
          <Input
            placeholder={'Email'}
            type={InputTypes.TEXT}
            value={email}
            label={'Email'}
            id="email"
            block={true}
            onChange={(event) => this.setStateWithEvent(event, 'email')}
          />
          <Input
            id="password"
            label={'Password'}
            block={true}
            value={password}
            onChange={(event) => this.setStateWithEvent(event, 'password')}
            type={InputTypes.PASSWORD}
            placeholder="Password"
          />

          <div styleName="login__btn-wrap">
            <Button
              onClick={(event) => this.onSubmit(event)}
              theme={ButtonThemes.PRIMARY}
              disabled={isInvalid}
              block={true}
              processing={loading}
            >
              Sign In
            </Button>
            <br />
            <p>Dont have an account?</p>
            <Button
              onClick={(event) => {
                event.preventDefault();
                this.props.changeRoute(`/auth/signup`);
              }}
              theme={ButtonThemes.TERTIARY}
              block={true}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    );
  }

  private setStateWithEvent(value: string, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, value));
  }
}
