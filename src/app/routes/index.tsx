import * as React from 'react';
import { Route } from 'react-router';
import { App, Dashboard } from 'modules';

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path="/dashboard" component={Dashboard} />
    </Route>
  </Route>
);
