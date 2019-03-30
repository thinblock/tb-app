import firebase from 'firebase/app';
import 'firebase/auth';
// import { FIREBASE_API_KEY, FIREBASE_MS_ID } from '../../config';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBecInXBlQwoB2r9tW81mJQO757EhWeOiw',
  authDomain: 'thinblock-dev.firebaseapp.com',
  databaseURL: 'https://thinblock-dev.firebaseio.com',
  projectId: 'thinblock-dev',
  storageBucket: 'thinblock-dev.appspot.com',
  messagingSenderId: '525917467588',
});

export const Persistence = {
  SESSION: firebase.auth.Auth.Persistence.SESSION,
  LOCAL: firebase.auth.Auth.Persistence.LOCAL,
  NONE: firebase.auth.Auth.Persistence.NONE,
};

export const firebaseAuth = app;
