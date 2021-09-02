import {
  SET_IS_ROOM_HOST,
  SET_ROOM_ID,
  SET_CONNECT_ONLY_WITH_AUDIO,
  SET_TWILIO_ACCESS_TOKEN,
  SET_LOADING_OVERLAY,
  SET_PARTICIPANTS,
  SET_MESSAGES,
} from './actionTypes';

interface Participant {
  identity: string;
}

interface Message {
  messageCreatedByMe?: boolean;
  content: string;
  identity: string;
}

export type ActionTypes =
  | { type: typeof SET_IS_ROOM_HOST; payload: boolean }
  | { type: typeof SET_ROOM_ID; payload: string }
  | { type: typeof SET_CONNECT_ONLY_WITH_AUDIO; payload: boolean }
  | { type: typeof SET_TWILIO_ACCESS_TOKEN; payload: string }
  | { type: typeof SET_LOADING_OVERLAY; payload: boolean }
  | { type: typeof SET_PARTICIPANTS; payload: Participant[] }
  | { type: typeof SET_MESSAGES; payload: Message[] };

export const setIsRoomHost = (isRoomHost: boolean): ActionTypes => ({
  type: SET_IS_ROOM_HOST,
  payload: isRoomHost,
});

export const setMessages = (messages: Message[]): ActionTypes => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setParticipants = (participants: Participant[]): ActionTypes => ({
  type: SET_PARTICIPANTS,
  payload: participants,
});

export const setOverlay = (showOverlay: boolean): ActionTypes => ({
  type: SET_LOADING_OVERLAY,
  payload: showOverlay,
});

export const setRoomId = (roomId: string): ActionTypes => ({
  type: SET_ROOM_ID,
  payload: roomId,
});

export const setTwilioAccessToken = (accessToken: string): ActionTypes => ({
  type: SET_TWILIO_ACCESS_TOKEN,
  payload: accessToken,
});

export const setConnectOnlyWithAudio = (
  connectOnlyWithAudio: boolean
): ActionTypes => ({
  type: SET_CONNECT_ONLY_WITH_AUDIO,
  payload: connectOnlyWithAudio,
});
