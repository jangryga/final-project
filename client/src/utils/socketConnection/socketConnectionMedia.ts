import { io, Socket } from 'socket.io-client';
import { setActiveRooms } from '../../state/actions/roomsActions';
import { store } from '../../state/store';

let socket: Socket;

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

export const connectWithWebSocketMedia = (path: string) => {
  socket = io('mydeployed.com', { path: path });

  socket.on('connection', () => {
    console.log('connected with wss server');
    console.log(socket.id);
  });

  socket.on('active-rooms', (data: any) => {
    store.dispatch(setActiveRooms(data.rooms));
  });

  socket.on('broadcast', (data: any) => {
    console.log('received a broadcast');
    handleBroadcastEvents(data);
  });
};

export const emitNewRoom = (roomId: string, name: string) => {
  socket.emit('new-room', {
    roomId: roomId,
    name: name,
  });
};

export const destroyRoom = (roomId: string) => {
  socket.emit('destroy-room', {
    roomId: roomId,
  });
};

export const getRooms = () => {
  socket.emit('active-rooms');
};

const handleBroadcastEvents = (data: any) => {
  switch (data.event) {
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      console.log(data);
      store.dispatch(setActiveRooms(data.rooms));
      break;
    default:
      break;
  }
};
