import firebase from 'firebase';
// import { FIREBASE_API_KEY, FIREBASE_MS_ID } from '../../config';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAMXiyfOidrghBOihgMaUmIb_NYak6_QXs',
  authDomain: 'thinblock.firebaseapp.com',
  databaseURL: 'https://thinblock.firebaseio.com',
  projectId: 'thinblock',
  storageBucket: 'thinblock.appspot.com',
  messagingSenderId: '30823995012',
});

export const firebaseAuth = app;
