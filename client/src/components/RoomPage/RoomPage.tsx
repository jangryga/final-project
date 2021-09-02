import { Paper, Grid, Hidden, Box } from '@material-ui/core';
import { styles } from './styles';
import Participants from './Participants/Participants';
import Chat from './Chat/Chat';
import { Store } from '../../state/reducer';
import BottomMenu from './BottomMenu/BottomMenu';
import { useState, useEffect } from 'react';
import Video from './Video/Video';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenFromTwilio } from '../../utils/twilio/twilioUtils';
import { setTwilioAccessToken } from '../../state/actions/roomActions';
import Overlay from './Overlay/Overlay';
import { Room } from 'twilio-video';
import { useHistory } from 'react-router';

import './RoomPage.css';

export default function RoomPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const identity = useSelector(
    (state: Store) => state.auth.user?.username
  ) as string;
  const [room, setRoom] = useState(null);
  const classes = styles();
  const roomId = useSelector((state: Store) => state.room.roomId);
  const setTwillioAccessTokenAction = (token: string) => {
    dispatch(setTwilioAccessToken(token));
  };
  const showOverlay = useSelector((state: Store) => state.room.showOverlay);

  useEffect(() => {
    if (!identity || !roomId) {
      history.push('/');
    }
    getTokenFromTwilio(setTwillioAccessTokenAction, identity);
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.roomPaper}>
      {showOverlay && <Overlay />}
      <Grid container>
        <Hidden smDown>
          <Grid item container md={3}>
            <Box className={classes.roomUsers}>
              <Participants />
            </Box>
          </Grid>
        </Hidden>
        <Grid item container md={6} sm={12}>
          <Box className={classes.roomMiddleSection}>
            {/* <div className={classes.roomTitle}>
            </div> */}
            <Box className={classes.roomVideo}>
              <Video room={room} setRoom={setRoom} roomId={roomId} />
            </Box>
            <Box className={classes.roomBottomMenu}>
              <BottomMenu room={room as unknown as Room} />
            </Box>
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item container md={3}>
            <Box className={classes.roomChat}>
              <Chat />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
}
