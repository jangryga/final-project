import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { destroyRoom } from '../../../../utils/socketConnection/socketConnectionMedia';
import { useSelector } from 'react-redux';
import { Store } from '../../../../state/reducer';

const styles = makeStyles(() => ({
  container: {
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#0f46a3',
      color: 'red',
    },
  },
}));

export default function LeaveRoomButton({ room }: { room: any }) {
  const classes = styles();
  const roomId = useSelector((state: Store) => state.room.roomId) as string;
  const participants = useSelector((state: Store) => state.room.participants);

  const handleRoomDisconnection = () => {
    room.disconnect();
    if (participants.length === 0) {
      destroyRoom(roomId);
    }
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <Box className={classes.container} onClick={handleRoomDisconnection}>
      <ExitToAppIcon onClick={handleRoomDisconnection}>
        Leave Room
      </ExitToAppIcon>
    </Box>
  );
}
