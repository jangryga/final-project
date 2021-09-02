import TwilioRoom from './TwilioRoom/TwilioRoom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../../state/reducer';
import { connectToRoom } from '../../../utils/twilio/twilioUtils';
import { styles } from './styles';
import { Box } from '@material-ui/core';
import TopLabel from '../TopLabel/TopLabel';

export default function Video({
  room,
  setRoom,
  roomId,
}: {
  room: any;
  setRoom: Function;
  roomId: any;
}) {
  const classes = styles();
  const twilioAccessToken = useSelector(
    (state: Store) => state.room.twilioAccessToken
  );

  useEffect(() => {
    if (twilioAccessToken) {
      connectToRoom(twilioAccessToken, roomId, setRoom);
    }
    // eslint-disable-next-line
  }, [twilioAccessToken]);

  return (
    <Box className={classes.container}>
      <TopLabel roomId={roomId ? roomId : 'not set'} />
      {room && <TwilioRoom room={room} />}
    </Box>
  );
}
