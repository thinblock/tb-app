import { ICounter } from 'models/counter';
import { IAuth } from 'models/auth';

export interface IStore {
  counter: ICounter;
  auth: IAuth;
};
