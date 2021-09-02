import { Paper, Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setRoomId } from '../../../../../state/actions/roomActions';
import { useHistory } from 'react-router';

export default function ActiveRoom({
  roomId,
  roomName,
}: {
  roomId: string;
  roomName: string;
}) {
  const classes = styles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleJoinRoom = () => {
    dispatch(setRoomId(roomId));
    history.push('/room');
  };

  return (
    <Paper elevation={2} className={classes.container}>
      <Box className={classes.name}> {roomName}</Box>
      <Box className={classes.buttonBox}>
        <Button className={classes.button} onClick={handleJoinRoom}>
          <AddIcon className={classes.buttonIcon} />
          <Box className={classes.buttonText}>Join</Box>
        </Button>
      </Box>
    </Paper>
  );
}
