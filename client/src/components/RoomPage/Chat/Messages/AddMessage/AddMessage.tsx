import { Box, TextField } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { sendMessageUsingDataChannel } from '../../../../../utils/twilio/twilioUtils';

const styles = makeStyles(() => ({
  sendIcon: {
    fill: '#2684df',
  },
  inputBox: {
    padding: 10,
    marginBottom: 5,
    overflow: 'hidden',
  },
}));

export default function AddMessage() {
  const [message, setMessage] = useState('');
  const classes = styles();

  const sendMessage = () => {
    console.log(message);
    sendMessageUsingDataChannel(message, true);
    setMessage('');
  };

  const handleKeyPressed = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box className={classes.inputBox}>
      <TextField
        placeholder='Aa'
        fullWidth
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setMessage(e.target.value);
        }}
        variant='outlined'
        onKeyDown={handleKeyPressed}
        InputProps={{
          endAdornment: (
            <SendOutlinedIcon
              className={classes.sendIcon}
              onClick={sendMessage}
            />
          ),
        }}
      />
    </Box>
  );
}
