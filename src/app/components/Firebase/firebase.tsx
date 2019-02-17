import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAMXiyfOidrghBOihgMaUmIb_NYak6_QXs',
  authDomain: 'thinblock.firebaseapp.com',
  databaseURL: 'https://thinblock.firebaseio.com',
  projectId: 'thinblock',
  storageBucket: 'thinblock.appspot.com',
  messagingSenderId: '30823995012',
});

// export const ref = app.database().ref();
export const firebaseAuth = app;
