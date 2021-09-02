import {
  SET_USER_LOGGED_IN,
  SET_USER_LOGGED_OUT,
  SET_USER_LOADING,
  SET_USER_LOADED,
  SET_USER_SOCKET,
} from './actionTypes';

interface UserData {
  id?: string;
  email: string;
  username: string;
  iat?: number;
}

export type ActionTypes =
  | { type: typeof SET_USER_LOADED }
  | { type: typeof SET_USER_LOADING }
  | { type: typeof SET_USER_LOGGED_IN; payload: UserData }
  | { type: typeof SET_USER_LOGGED_OUT }
  | { type: typeof SET_USER_SOCKET; payload: string };

export const setUserLoading = (): ActionTypes => ({ type: SET_USER_LOADING });

export const setUserLoaded = (): ActionTypes => ({ type: SET_USER_LOADED });

export const setUserSocket = (socket: string): ActionTypes => ({
  type: SET_USER_SOCKET,
  payload: socket,
});

export const setUserLoggedIn = (userData: UserData): ActionTypes => ({
  type: SET_USER_LOGGED_IN,
  payload: userData,
});

export const setUserLoggedOut = (): ActionTypes => ({
  type: SET_USER_LOGGED_OUT,
});
