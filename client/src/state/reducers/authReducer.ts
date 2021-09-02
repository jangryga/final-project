import { ActionTypes } from '../actions/authActions';
import {
  SET_USER_LOADED,
  SET_USER_LOADING,
  SET_USER_LOGGED_IN,
  SET_USER_LOGGED_OUT,
  SET_USER_SOCKET,
} from '../actions/actionTypes';
import { AuthStore } from './reducerTypes';

const initState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  socket: null,
};

export const authReducer = (
  state: AuthStore = initState,
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_USER_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case SET_USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case SET_USER_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};
