import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import ActiveRoom from './ActiveRoom/ActiveRoom';
import { getRooms } from '../../../../utils/socketConnection/socketConnectionMedia';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../../../state/reducer';
import { Scrollbars } from 'react-custom-scrollbars-2';

const styles = makeStyles(() => ({
  roomsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
}));

export default function ActiveRooms() {
  const classes = styles();
  const rooms = useSelector((state: Store) => state.activeRooms.activeRooms);

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <Paper elevation={0} className={classes.roomsContainer}>
      <Scrollbars autoHide>
        {rooms.map((room) => {
          return (
            <ActiveRoom
              key={room.roomId}
              roomId={room.roomId}
              roomName={room.name}
            />
          );
        })}
      </Scrollbars>
    </Paper>
  );
}
