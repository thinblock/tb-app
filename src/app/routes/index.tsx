import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { App, Dashboard, Login, SignUpContainer, Unverified } from 'modules';

const NotFound = () => <h1>404 - Not Found</h1>;

const roles = {
  '/': ['any'],
  '/dashboard': ['user'],
  '/auth/login': ['any'],
  '/auth/signup': ['any'],
};

const AppComp = (props) => <App {...props} roles={roles} />;

export default (
  <Route>
    <Route path="/" component={AppComp}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={SignUpContainer} />
      <Route path="/unverified" component={Unverified} />
    </Route>
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Route>
);
