import { SET_ACTIVE_ROOMS } from './actionTypes';

interface Room {
  name: string;
  roomId: string;
}
export type ActionTypes = {
  type: typeof SET_ACTIVE_ROOMS;
  payload: Room[];
};

export const setActiveRooms = (activeRooms: Room[]): ActionTypes => {
  return {
    type: SET_ACTIVE_ROOMS,
    payload: activeRooms,
  };
};
