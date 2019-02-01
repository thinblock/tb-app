import * as React from 'react';
import { Route } from 'react-router';
import { App, Dashboard } from 'modules';

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth" component={ConnectSocial} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/forgot" component={ForgotPassword} /> 
    </Route>
  </Route>
);
