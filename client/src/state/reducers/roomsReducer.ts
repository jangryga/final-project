import { ActionTypes } from '../actions/roomsActions';
import { ActiveRoomsStore } from './reducerTypes';

import { SET_ACTIVE_ROOMS } from '../actions/actionTypes';

const initState = {
  activeRooms: [],
};

export const activeRoomsReducer = (
  state: ActiveRoomsStore = initState,
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_ACTIVE_ROOMS:
      return {
        ...state,
        activeRooms: action.payload,
      };
    default:
      return state;
  }
};
