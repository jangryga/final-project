import { SET_ACTIVE_USERS } from './actionTypes';

interface ActiveUser {
  username: string;
  socketId: string;
  id: string;
}

export type ActionTypes = {
  type: typeof SET_ACTIVE_USERS;
  payload: ActiveUser[];
};

export const setActiveUsers = (activeUsers: ActiveUser[]): ActionTypes => {
  return {
    type: SET_ACTIVE_USERS,
    payload: activeUsers,
  };
};
