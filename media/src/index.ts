import express from 'express';
import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import { ActiveRoom } from './models/activeRooms';

const app = express();
app.set('trust proxy', true);

const broadcastEventTypes = {
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://media-mongo-srv:27017/media');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
  });

  const io = new Server(server, {
    path: '/api/media',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('New user connected to media server');
    console.log('Media socket', socket.id);
    socket.emit('connection', socket.id);

    socket.on('new-room', async (data: { roomId: string; name: string }) => {
      console.log('Saving new room to db');
      const activeRoom = await ActiveRoom.build({
        name: data.name,
        roomId: data.roomId,
      });
      await activeRoom.save();

      await ActiveRoom.find({}, (err, data) => {
        console.log('Awaiting db query');
        if (err) {
          console.error(err);
        } else {
          console.log('Room data: ', data);
          io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            rooms: data,
          });
        }
      });
    });

    socket.on('active-rooms', async () => {
      await ActiveRoom.find({}, (err, data) => {
        console.log('Awaiting db query');
        if (err) {
          console.error(err);
        } else {
          console.log('Room data: ', data);
          socket.emit('active-rooms', { rooms: data });
        }
      });
    });

    socket.on('destroy-room', async (data: { roomId: string }) => {
      console.log('Deleteing room');
      await ActiveRoom.deleteOne({ roomId: data.roomId });

      await ActiveRoom.find({}, (err, data) => {
        console.log('Awaiting db query');
        if (err) {
          console.error(err);
        } else {
          console.log('Room data: ', data);
          io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            rooms: data,
          });
        }
      });
    });
  });
};

start();
