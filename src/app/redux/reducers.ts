import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { counterReducer } from './reducers/counter';
import { IStore } from './IStore';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  counter: counterReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
