import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { userFeedReducer } from './reducers/userFeedReducer';
import { roomReducer } from './reducers/roomReducer';
import { activeRoomsReducer } from './reducers/roomsReducer';

import {
  AuthStore,
  RoomStore,
  UserFeedStore,
  ActiveRoomsStore,
} from './reducers/reducerTypes';

export type Store = {
  auth: AuthStore;
  userFeed: UserFeedStore;
  room: RoomStore;
  activeRooms: ActiveRoomsStore;
};

export default combineReducers({
  auth: authReducer,
  userFeed: userFeedReducer,
  room: roomReducer,
  activeRooms: activeRoomsReducer,
});
