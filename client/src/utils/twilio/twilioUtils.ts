import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../../state/store';
import { Constraints } from '../types';
import { Message } from '../../state/reducers/reducerTypes';
import {
  connect,
  LocalAudioTrack,
  LocalDataTrack,
  LocalVideoTrack,
} from 'twilio-video';
import { setMessages, setOverlay } from '../../state/actions/roomActions';

const audioConstraints: Constraints = {
  video: false,
  audio: true,
};

const videoConstraints: Constraints = {
  audio: true,
  video: {
    width: 640,
    height: 480,
  },
};

let dataChannel: LocalDataTrack | null = null;

export const getTokenFromTwilio = async (
  setAccessToken: Function,
  identity: string
) => {
  const randomId = uuidv4();

  console.log('identity: ', identity);

  const response = await axios.get(
    `https://twilio-serverless-2381-dev.twil.io/token-service?identity=${randomId}${identity}`
  );

  const data = response.data;
  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }
};

export const connectToRoom = async (
  accessToken: string,
  roomId: string = 'rest-room,',
  setRoom: Function
) => {
  const onlyWithAudio = store.getState().room.connectOnlyWithAudio;
  const constaints = onlyWithAudio ? audioConstraints : videoConstraints;

  navigator.mediaDevices
    .getUserMedia(constaints)
    .then(async (stream) => {
      let tracks;

      const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);
      const dataTrack = new LocalDataTrack();
      dataChannel = dataTrack;
      let videoTrack;

      if (!onlyWithAudio) {
        videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
        tracks = [audioTrack, videoTrack, dataTrack];
      } else {
        tracks = [audioTrack, dataTrack];
      }

      const room = await connect(accessToken, { name: roomId, tracks });

      setRoom(room);
      store.dispatch(setOverlay(false));
    })
    .catch((err) => {
      console.log('Error occured when trying to access local devices');
      console.error(err);
    });
};

export const sendMessageUsingDataChannel = (
  content: string,
  messageCreatedByMe: boolean = false
) => {
  const identity = store.getState().auth.user?.username as string;

  const ownMessage: Message = {
    identity,
    messageCreatedByMe,
    content,
  };

  addMessageToMessanger(ownMessage);

  const messageToSend = {
    identity,
    content,
  };
  if (dataChannel) {
    dataChannel.send(JSON.stringify(messageToSend));
  }
};

export const addMessageToMessanger = (message: Message) => {
  const messages = [...store.getState().room.messages];
  messages.push(message);
  store.dispatch(setMessages(messages));
};
