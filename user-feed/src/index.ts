import express from 'express';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import { ActiveUser } from './models/active-users';
import { broadcastEventTypes } from './utils/types';

const app = express();
app.set('trust proxy', true);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://user-feed-mongo-srv:27017/user-feed', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
  });

  const io = new Server(server, {
    path: '/api/user-feed',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('new user connected');
    console.log(socket.id);
    socket.emit('connection', socket.id);

    socket.on('new-active-user', async (data: { username: string }) => {
      if (data.username) {
        console.log('Saving new user to db');
        try {
          const activeUser = await ActiveUser.build({
            username: data.username,
            socketId: socket.id,
          });
          await activeUser.save();
        } catch (err) {
          console.log('User already exists');
        }
      } else {
        console.log('Missing user data');
      }

      await ActiveUser.find({}, (err, data) => {
        console.log('Awaiting users query');
        if (err) {
          console.error(err);
        } else {
          console.log('data:', data);
          io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: data,
          });
        }
      });
    });

    socket.on('disconnect', async () => {
      console.log('User disconnected');
      await ActiveUser.deleteOne({ socketId: socket.id });
      await ActiveUser.find({}, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: data,
          });
        }
      });
    });
  });
};

start();
