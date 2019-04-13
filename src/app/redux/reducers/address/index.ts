
import { IAddress, IAddressAction } from 'models/address';
import { firebaseDb } from 'components/Firebase/firebase';
import { PAGINATION_LIMIT } from 'config';

/** Action Types */
export const GET_ADDRESSES_REQUEST: string = 'address/GET_ADDRESSES_REQUEST';
export const GET_ADDRESSES_SUCCESS: string = 'address/GET_ADDRESSES_SUCCESS';
export const GET_ADDRESSES_FAILURE: string = 'address/GET_ADDRESSES_FAILURE';

export const CREATE_ADDRESS_REQUEST: string = 'address/CREATE_ADDRESS_REQUEST';
export const CREATE_ADDRESS_SUCCESS: string = 'address/CREATE_ADDRESS_SUCCESS';
export const CREATE_ADDRESS_FAILURE: string = 'address/CREATE_ADDRESS_FAILURE';

/** Auth: Initial State */
const initialState: IAddress = {
  loading: false,
  error: false,
  errorMessage: '',
  address: '',
  addresses: [],
  lastVisible: null,
};

/** Reducer: AddressReducer */
export function addressReducer(state = initialState, action?: IAddressAction): Partial<IAddress> {
  switch (action.type) {
    case GET_ADDRESSES_REQUEST:
    case CREATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        addresses: action.payload.data,
        lastVisible: action.payload.data[action.payload.data.length - 1],
      };
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload.data,
      };
    case GET_ADDRESSES_FAILURE:
    case CREATE_ADDRESS_FAILURE:
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

export function createAddress(address: string) {
  return (dispatch) => {
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    firebaseDb.collection('addresses').add({
      address, created_at: Date.now().toString(),
    })
      .then((docRef) => {
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: { data: docRef } });
      })
      .catch((error) => {
        dispatch({ type: CREATE_ADDRESS_FAILURE, payload: { error } });
      });
  };
}

export function getAllAddresses(paginated?: boolean) {
  return (dispatch, getState) => {
    dispatch({ type: GET_ADDRESSES_REQUEST });
    firebaseDb.collection('addresses')
      .orderBy('created_at', 'desc')
      .startAfter(paginated ? getState().address.lastVisible : {})
      .limit(paginated ? PAGINATION_LIMIT : 10000)
      .get()
      .then((querySnapshot) => {
        dispatch({ type: GET_ADDRESSES_SUCCESS, payload: { data: querySnapshot.docs.map((doc) => doc.data()) } });
      })
      .catch((error) => {
        dispatch({ type: GET_ADDRESSES_FAILURE, payload: { error } });
      });
  };
}
