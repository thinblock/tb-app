import * as React from 'react';
import { loginUser } from 'redux/reducers/auth';
import { push } from 'react-router-redux';
import * as CSSModules from 'react-css-modules';
import { Button, Input, InputTypes, ButtonThemes } from 'components';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
  loginUser?(e: string, p: string): any;
  changeRoute?: Redux.ActionCreator<Redux.Action>;
}

interface InterfaceState {
  loading: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
  email: string;
  error: any;
  password: string;
}

@connect(
  (state) => ({ auth: state.auth }),
  (dispatch) => ({
    changeRoute: (s) => dispatch(push(s)),
    loginUser: (e: string, p: string) => dispatch(loginUser(e, p)),
  }),
)
@CSSModules(style, {allowMultiple: true})
export class SignInForm extends React.Component<
  InterfaceProps,
  InterfaceState
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

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignInForm.INITIAL_STATE };
  }

  public componentWillReceiveProps(nextProps: any)  {
    if (nextProps.auth.isLoggedIn) {
      this.props.changeRoute('/dashboard');
    }
    if (nextProps.auth.error) {
      this.setState(SignInForm.propKey('error', true));
    }
  }

  public onSubmit = (event: any) => {
    const { email, password } = this.state;
    this.props.loginUser(email, password);
    event.preventDefault();
  }

  public render() {
    const { email, password, error } = this.state;

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
            >
              Sign In
            </Button>

            {error && <p>Invalid Credentials</p>}          
          </div>
        </form>      
      </div>
    );
  }

  private setStateWithEvent(value: string, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, value));
  }
}
