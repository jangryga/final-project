import {
  Button,
  Box,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  FormGroup,
  FormControlLabel,
  Paper,
} from '@material-ui/core';
import VideoCallRoundedIcon from '@material-ui/icons/VideoCallRounded';
import { styles } from './styles';
import { useHistory } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setConnectOnlyWithAudio,
  setIsRoomHost,
  setRoomId,
} from '../../../../state/actions/roomActions';
import { Store } from '../../../../state/reducer';
import { v4 as uuidv4 } from 'uuid';
import { emitNewRoom } from '../../../../utils/socketConnection/socketConnectionMedia';
import { toast } from 'react-toastify';

export default function CreateRoomSection() {
  const [roomName, setRoomName] = useState('');
  const history = useHistory();
  const connectWithAudio: boolean = useSelector(
    (state: Store) => state.room.connectOnlyWithAudio
  );

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(connectWithAudio);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChecked = () => {
    setChecked(!checked);
    dispatch(setConnectOnlyWithAudio(!checked));
  };

  const handleCreateRoom = () => {
    const newId = uuidv4();
    if (roomName.length === 0) {
      toast.error('Room name required', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      handleClose();
      dispatch(setIsRoomHost(true));
      dispatch(setRoomId(newId));
      emitNewRoom(newId, roomName);
      setRoomName('');
      history.push('/room');
    }
  };

  const classes = styles();
  return (
    <>
      <Paper elevation={2} className={classes.createRoomCard}>
        <Box className={classes.createRoomTitle}>Available Rooms</Box>
        <Box className={classes.creatRoomButtonBox}>
          <Button className={classes.creatRoomButton}>
            <VideoCallRoundedIcon
              style={{ fill: 'red', marginLeft: 10, marginRight: 10 }}
            />
            <div
              style={{ color: '#65676B', marginRight: 10 }}
              onClick={handleClickOpen}
            >
              Crate room
            </div>
          </Button>
        </Box>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create your room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your room will be visible to all users. Audio recordings will be
            processed after the room is closed.
          </DialogContentText>
          <FormGroup>
            <TextField
              autoFocus
              required
              margin='dense'
              id='name'
              label='Room Name'
              type='text'
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setRoomName(e.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChecked}
                  name='checked'
                  color='primary'
                />
              }
              label='Connect only with audio'
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCreateRoom} color='primary'>
            Create Room
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
