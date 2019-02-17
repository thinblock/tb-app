import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
const { Router, browserHistory } = require('react-router');
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect } = require('redux-connect');
import { configureStore } from './app/redux/store';
import 'isomorphic-fetch';
import routes from './app/routes';
import { getBrowserLanguage, getLocaleMessages } from './app/locales';
import registerServiceWorker from './app/pwa/registerServiceWorker';
import Firebase, { FirebaseContext } from './app/components/Firebase';

const store = configureStore(
  browserHistory,
  window.__INITIAL_STATE__,
);
const history = syncHistoryWithStore(browserHistory, store);
const connectedCmp = (props) => <ReduxAsyncConnect {...props} />;

addLocaleData([...en]);

registerServiceWorker();

ReactDOM.hydrate(
  <FirebaseContext.Provider value={Firebase}>
    <IntlProvider locale={getBrowserLanguage()} messages={getLocaleMessages()}>
      <Provider store={store} key="provider">
        <Router
          history={history}
          render={connectedCmp}
        >
          {routes}
        </Router>
      </Provider>
    </IntlProvider>
  </FirebaseContext.Provider>,
  document.getElementById('app'),
);
