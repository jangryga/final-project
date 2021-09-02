import { ActionTypes } from '../actions/userFeedActions';

import { SET_ACTIVE_USERS } from '../actions/actionTypes';
import { UserFeedStore } from './reducerTypes';

const initState: UserFeedStore = {
  activeUsers: [],
};

export const userFeedReducer = (
  state: UserFeedStore = initState,
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_ACTIVE_USERS:
      return {
        activeUsers: action.payload,
      };
    default:
      return state;
  }
};
