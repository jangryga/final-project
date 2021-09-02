import { io, Socket } from 'socket.io-client';
import { store } from '../../state/store';
import * as authActions from '../../state/actions/authActions';
import * as userFeedActions from '../../state/actions/userFeedActions';

let socket: Socket;
interface ActiveUser {
  username: string;
  socketId: string;
  id: string;
}

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

export const connectWithWebSocketUserFeed = (path: string) => {
  socket = io('test.dev', { path: path });
  // socket = io('test.dev', { path: '/api/user-feed' });

  socket.on('connection', () => {
    console.log('connected with wss server');
    console.log(socket.id);

    store.dispatch(authActions.setUserSocket(socket.id));
  });

  socket.on('broadcast', (data: any) => {
    console.log('received a broadcast');
    handleBroadcastEvents(data);
  });
};

export const newActiveUser = (username: string) => {
  socket.emit('new-active-user', {
    username: username,
  });
};

const handleBroadcastEvents = (data: any) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      let activeUsers: ActiveUser[] = data.activeUsers;
      activeUsers = activeUsers.filter(
        (activeUser: ActiveUser) => activeUser.socketId !== socket.id
      );
      store.dispatch(userFeedActions.setActiveUsers(activeUsers));
      break;
    default:
      break;
  }
};
