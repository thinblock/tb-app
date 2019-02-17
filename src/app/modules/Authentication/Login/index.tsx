import * as React from 'react';
import { SignInForm } from './SignInForm';
import { PageHeader as Header } from 'components';

const Login = ({ history }: { [key: string]: any }) => (
  <div>
    <Header heading={'SIGN IN'} />
    <SignInForm history={history} />
  </div>
);

export { Login };
