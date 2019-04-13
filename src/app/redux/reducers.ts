import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { counterReducer } from './reducers/counter';
import { authReducer } from './reducers/auth';
import { addressReducer } from './reducers/address';
import { IStore } from './IStore';
import { IAuth } from 'models/auth';
import { IAddress } from 'models/address';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  counter: counterReducer,
  reduxAsyncConnect: reducer,
  address: addressReducer as Redux.Reducer<IAddress>,
  auth: authReducer as Redux.Reducer<IAuth>,
});

export default rootReducer;
