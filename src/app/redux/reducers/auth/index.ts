import { IAuth, IAuthAction } from 'models/auth';
import { firebaseAuth } from 'components';
import { Persistence, firebaseDb } from 'components/Firebase/firebase';

/** Action Types */
export const LOGIN_USER_REQUEST: string = 'auth/LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: string = 'auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE: string = 'auth/LOGIN_USER_FAILURE';

export const SIGNUP_USER_REQUEST: string = 'auth/SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS: string = 'auth/SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE: string = 'auth/SIGNUP_USER_FAILURE';

export const LOGOUT_USER: string = 'auth/LOGOUT_USER';

export const SOCIAL_LOGIN: string = 'auth/SOCIAL_LOGIN';

export const VERIFY_USER_PHONE_REQUEST: string = 'auth/VERIFY_USER_PHONE_REQUEST';
export const VERIFY_USER_PHONE_SUCCESS: string = 'auth/VERIFY_USER_PHONE_SUCCESS';
export const VERIFY_USER_PHONE_FAILURE: string = 'auth/VERIFY_USER_PHONE_FAILURE';

export const HYDRATE_STATE: string = 'auth/HYDRATE_STATE';

export const SEND_VERIFICATION_EMAIL_REQUEST: string = 'auth/SEND_VERIFICATION_EMAIL_REQUEST';
export const SEND_VERIFICATION_EMAIL_SUCCESS: string = 'auth/SEND_VERIFICATION_EMAIL_SUCCESS';
export const SEND_VERIFICATION_EMAIL_FAILURE: string = 'auth/SEND_VERIFICATION_EMAIL_FAILURE';

export const LOGOUT_USER_REQUEST: string = 'auth/LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: string = 'auth/LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE: string = 'auth/LOGOUT_USER_FAILURE';

/** Auth: Initial State */
const initialState: IAuth = {
  loading: false,
  error: false,
  user: null,
  bootstrapping: true,
  errorMessage: '',
  isLoggedIn: false,
};

/** Reducer: AuthReducer */
export function authReducer(state = initialState, action?: IAuthAction): Partial<IAuth> {
  switch (action.type) {
    case HYDRATE_STATE:
      return {
        ...state,
        bootstrapping: false,
        isLoggedIn: action.payload.user !== null,
        user: action.payload.user,
      };
    case LOGIN_USER_REQUEST:
    case SIGNUP_USER_REQUEST:
    case SEND_VERIFICATION_EMAIL_REQUEST:
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case SIGNUP_USER_SUCCESS:
    case SEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
      };
    case LOGIN_USER_FAILURE:
    case SIGNUP_USER_FAILURE:
    case SEND_VERIFICATION_EMAIL_FAILURE:
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.error,
      };

    default:
      return state;
  }
}

export function loginUser(email: string, password: string) {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    firebaseAuth.auth().setPersistence(Persistence.SESSION)
      .then(() => {
        firebaseAuth.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            dispatch({ type: LOGIN_USER_SUCCESS });
          })
          .catch((error) => {
            dispatch({ type: LOGIN_USER_FAILURE, payload: { error: error.message } });
          });
      })
      .catch((error) => {
        // Handle Errors here.
        dispatch({ type: LOGIN_USER_FAILURE, payload: { error: error.message } });
      });
  };
}

export function setUserObject(user: firebase.User) {
  return (dispatch) => {
    if (user) {
      dispatch({ type: HYDRATE_STATE, payload: { user } });
    } else {
      dispatch({ type: HYDRATE_STATE, payload: { user: null } });
    }
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER_REQUEST });
    firebaseAuth.auth().signOut()
      .then(() => {
        dispatch({ type: LOGOUT_USER_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_USER_FAILURE, payload: { error: error.message } });
      });
  };
}

export function signupUsingFirebase(email: string, password: string) {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER_REQUEST });
    firebaseAuth.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch({ type: SEND_VERIFICATION_EMAIL_REQUEST });
        const user = firebaseAuth.auth().currentUser;
        user.sendEmailVerification().then(() => {
          dispatch({ type: SEND_VERIFICATION_EMAIL_SUCCESS });
          firebaseDb.collection('users').doc(res.user.uid).set({
            email: res.user.email,
            uid: res.user.uid,
          }).then(() => {
            dispatch({ type: SIGNUP_USER_SUCCESS });
            // created user in collection
          }).catch((error) => {
            dispatch({ type: SIGNUP_USER_FAILURE, payload: { error: error.message } });
          });
        }).catch((error) => {
          // An error happened.
          dispatch({ type: SEND_VERIFICATION_EMAIL_FAILURE, payload: { error: error.message } });
        });
      })
      .catch((error) => {
        dispatch({ type: SIGNUP_USER_FAILURE, payload: { error: error.message } });
      });
  };
}
