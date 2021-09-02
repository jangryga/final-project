export type User = {
  email?: string;
  iat?: number;
  id?: string;
  username?: string;
} | null;

export interface ActiveUser {
  username: string;
  socketId: string;
  id: string;
}

export interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  socket: string | null;
}

export interface UserFeedStore {
  activeUsers: ActiveUser[];
}

// import { Participant } from 'twilio-video';

interface Participant {
  identity: string;
}

export interface Message {
  messageCreatedByMe?: boolean;
  content: string;
  identity: string;
}

export interface RoomStore {
  isRoomHost: boolean;
  roomId: string | null;
  connectOnlyWithAudio: boolean;
  twilioAccessToken: string | null;
  showOverlay: boolean;
  participants: Participant[];
  messages: Message[];
}

interface Room {
  name: string;
  roomId: string;
}

export interface ActiveRoomsStore {
  activeRooms: Room[];
}
