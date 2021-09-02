import MicNoneIcon from '@material-ui/icons/MicNone';
import MicOffIcon from '@material-ui/icons/MicOff';
import { useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Room } from 'twilio-video';

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
    },
  },
}));

export default function MicEnabled({ room }: { room: Room }) {
  const classes = styles();
  const [isMuted, setIsMuted] = useState(false);

  const mute = () => {
    room.localParticipant.audioTracks.forEach(
      (localAudioTrackPublication: any) => {
        localAudioTrackPublication.track.disable();
      }
    );
  };
  const unMute = () => {
    room.localParticipant.audioTracks.forEach(
      (localAudioTrackPublication: any) => {
        localAudioTrackPublication.track.enable();
      }
    );
  };

  const handleMicButtonPressed = () => {
    isMuted ? unMute() : mute();
    setIsMuted(!isMuted);
  };
  return (
    <Box className={classes.container} onClick={handleMicButtonPressed}>
      {isMuted ? (
        <MicOffIcon onClick={handleMicButtonPressed} />
      ) : (
        <MicNoneIcon onClick={handleMicButtonPressed} />
      )}
    </Box>
  );
}
