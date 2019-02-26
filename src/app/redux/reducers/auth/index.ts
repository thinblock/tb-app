import { IAuth, IAuthAction } from 'models/auth';
import { CALL_API } from 'redux-api-middleware';
import { firebaseAuth } from 'components';

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

/** Auth: Initial State */
const initialState: IAuth = {
  loading: false,
  error: false,
  errorMessage: '',
  isLoggedIn: false,
};

/** Reducer: AuthReducer */
export function authReducer(state = initialState, action?: IAuthAction): Partial<IAuth> {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_USER_FAILURE:
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: '',
      };

    default:
      return state;
  }
}

export function loginUser(email: string, password: string) {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    firebaseAuth.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({ type: LOGIN_USER_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: LOGIN_USER_FAILURE });
    });
  };
}

export function signupUser(data: any): Partial<IAuthAction> {
  return ({
    [CALL_API]: {
      method: 'POST',
      headers: {
        'NO-AUTH': true,
      },
      endpoint: '/auth/signup',
      body: JSON.stringify(data),
      types: [
        SIGNUP_USER_REQUEST,
        SIGNUP_USER_SUCCESS,
        SIGNUP_USER_FAILURE,
      ],
    },
  });
}
