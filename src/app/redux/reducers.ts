import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { counterReducer } from './reducers/counter';
import { authReducer } from './reducers/auth';
import { IStore } from './IStore';
import { IAuth } from 'models/auth';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  counter: counterReducer,
  reduxAsyncConnect: reducer,
  auth: authReducer as Redux.Reducer<IAuth>,
});

export default rootReducer;
