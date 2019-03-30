import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { firebaseAuth, Input, InputTypes, Button, ButtonThemes } from 'components';
const style = require('./style.scss');

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
  username?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  passwordOne: string;
  passwordTwo: string;
  username: string;
}
@CSSModules(style, {allowMultiple: true})
export class SignUpForm extends React.Component<
  InterfaceProps,
  InterfaceState
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

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignUpForm.INITIAL_STATE };
  }

  public onSubmit(event: any) {
    event.preventDefault();

    const { email, passwordOne } = this.state;
    const { history } = this.props;

    firebaseAuth.auth().createUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState(() => ({ ...SignUpForm.INITIAL_STATE }));
        history.push('/');
      })
      .catch((error) => {
        this.setState(SignUpForm.propKey('error', error));
      });
  }

  public render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div styleName="signup__container">
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
            >
              Sign Up
            </Button>

            {error && <p>Invalid Credentials</p>}          
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }

  private setStateWithEvent(value: string, columnType: string) {
    this.setState(SignUpForm.propKey(columnType, value));
  }
}
