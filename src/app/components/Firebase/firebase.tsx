import firebase from 'firebase';
import { FIREBASE_API_KEY, FIREBASE_MS_ID } from '../../config';

const app = firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: 'thinblock.firebaseapp.com',
  databaseURL: 'https://thinblock.firebaseio.com',
  projectId: 'thinblock',
  storageBucket: 'thinblock.appspot.com',
  messagingSenderId: FIREBASE_MS_ID,
});

export const firebaseAuth = app;
