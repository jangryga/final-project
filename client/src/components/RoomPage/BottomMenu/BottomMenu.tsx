import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LeaveRoomButton from './LeaveRoomButton/LeaveRoomButton';
import MicEnabled from './MicEnabled/MicEnabled';
import ScreenSharingEnabled from './ScreenSharingEnabled/ScreenSharingEnabled';
import VideoEnabled from './VideoEnabled/VideoEnabled';
import { useSelector } from 'react-redux';
import { Store } from '../../../state/reducer';
import { Room } from 'twilio-video';

const styles = makeStyles(() => ({
  menuContainer: {
    height: '100%',
    background: 'linear-gradient(50deg, #0052c9 10%, #0990da 100%)',
    borderRadius: '25px 25px 0% 0%',
    color: '#fefeff',
    fontWeight: 300,
    display: 'flex',
    justifyContent: 'center',

    padding: 2,
  },
}));

export default function BottomMenu({ room }: { room: Room }) {
  const classes = styles();
  const connectOnlyWithAudio = useSelector(
    (state: Store) => state.room.connectOnlyWithAudio
  );

  return (
    <Box className={classes.menuContainer}>
      <MicEnabled room={room} />
      {!connectOnlyWithAudio && <VideoEnabled room={room} />}
      <ScreenSharingEnabled room={room} />
      <LeaveRoomButton room={room} />
    </Box>
  );
}
