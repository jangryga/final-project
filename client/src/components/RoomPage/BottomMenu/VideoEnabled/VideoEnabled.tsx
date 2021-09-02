import LinkedCameraOutlinedIcon from '@material-ui/icons/LinkedCameraOutlined';
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Room } from 'twilio-video';

const styles = makeStyles(() => ({
  container: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#0f46a3',
    },
  },
}));

export default function VideoEnabled({ room }: { room: Room }) {
  const classes = styles();
  const [isLocalVideoTrackDisabled, setIsLocalVideoTrackDisabled] =
    useState(false);

  const handleCameraButtonPressed = () => {
    isLocalVideoTrackDisabled ? startVideo() : stopVideo();

    setIsLocalVideoTrackDisabled(!isLocalVideoTrackDisabled);
  };
  const startVideo = () => {
    room.localParticipant.videoTracks.forEach(
      (localVideoTrackPublication: any) => {
        localVideoTrackPublication.track.enable();
      }
    );
  };

  const stopVideo = () => {
    room.localParticipant.videoTracks.forEach(
      (localVideoTrackPublication: any) => {
        localVideoTrackPublication.track.disable();
      }
    );
  };

  return (
    <Box className={classes.container} onClick={handleCameraButtonPressed}>
      {isLocalVideoTrackDisabled ? (
        <VideocamOffOutlinedIcon onClick={handleCameraButtonPressed} />
      ) : (
        <LinkedCameraOutlinedIcon onClick={handleCameraButtonPressed} />
      )}
    </Box>
  );
}
