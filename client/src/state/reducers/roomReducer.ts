import { ActionTypes } from '../actions/roomActions';
import { RoomStore } from './reducerTypes';

import {
  SET_IS_ROOM_HOST,
  SET_ROOM_ID,
  SET_CONNECT_ONLY_WITH_AUDIO,
  SET_TWILIO_ACCESS_TOKEN,
  SET_LOADING_OVERLAY,
  SET_PARTICIPANTS,
  SET_MESSAGES,
} from '../actions/actionTypes';

const initState = {
  isRoomHost: false,
  roomId: null,
  connectOnlyWithAudio: false,
  twilioAccessToken: null,
  showOverlay: true,
  participants: [],
  messages: [],
};

export const roomReducer = (
  state: RoomStore = initState,
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.payload,
      };
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    case SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.payload,
      };
    case SET_TWILIO_ACCESS_TOKEN:
      return {
        ...state,
        twilioAccessToken: action.payload,
      };
    case SET_LOADING_OVERLAY:
      return {
        ...state,
        showOverlay: action.payload,
      };
    case SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};
