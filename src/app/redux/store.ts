const appConfig = require('../../../config/main');
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import { apiInterceptor } from '../helpers/auth_middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { IStore } from './IStore';
import { createLogger } from 'redux-logger';

export function configureStore(history, initialState?: IStore): Redux.Store<IStore> {
  const middlewares: Redux.Middleware[] = [
    routerMiddleware(history),
    apiInterceptor,
    apiMiddleware,
    thunk,
    // apiInterceptor,
  ];

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== 'production' && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const composeEnhancers = (appConfig.env !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store: Redux.Store<IStore> = createStore<IStore>(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  ));

  if (appConfig.env === 'development' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      store.replaceReducer((require('./reducers')));
    });
  }

  return store;
}
