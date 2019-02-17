import * as React from 'react';
import { firebaseAuth } from 'components';
import { push } from 'react-router-redux';
const { connect } = require('react-redux');

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
  changeRoute?: Redux.ActionCreator<Redux.Action>;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}

@connect(
  (state) => ({ auth: state.auth }),
  (dispatch) => ({
    changeRoute: (s) => dispatch(push(s)),
  }),
)
export class SignInForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static INITIAL_STATE = {
    email: '',
    error: null,
    password: '',
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInForm.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    const { email, password } = this.state;

    firebaseAuth.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...SignInForm.INITIAL_STATE }));
        this.props.changeRoute('/dashboard');
      })
      .catch((error) => {
        this.setState(SignInForm.propKey('error', error));
      });

    event.preventDefault();
  }

  public render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <input
          value={email}
          onChange={(event) => this.setStateWithEvent(event, 'email')}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={(event) => this.setStateWithEvent(event, 'password')}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, (event.target as any).value));
  }
}
