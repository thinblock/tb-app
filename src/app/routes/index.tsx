import * as React from 'react';
import { Route } from 'react-router';
import { App, Dashboard, Login, SignUpContainer } from 'modules';

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={SignUpContainer} />
    </Route>
  </Route>
);
