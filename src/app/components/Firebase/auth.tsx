import { firebaseAuth } from './firebase';

export const create = (email: string, pw: string) => {
  return firebaseAuth.auth().createUserWithEmailAndPassword(email, pw);
};

export const logout = () => {
  return firebaseAuth.auth().signOut();
};

export const login = (email: string, pw: string) => {
  return firebaseAuth.auth().signInWithEmailAndPassword(email, pw);
};

export const resetPassword = (email: string) => {
  return firebaseAuth.auth().sendPasswordResetEmail(email);
};
