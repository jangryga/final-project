import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import { useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Room } from 'twilio-video';
import { LocalVideoTrack } from 'twilio-video';

const styles = makeStyles(() => ({
  container: {
    height: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#0f46a3',
    },
  },
}));
export default function ScreenSharingEnabled({ room }: { room: Room }) {
  const classes = styles();
  const [isScreenSharingActive, setIsScreenSharingActive] =
    useState<boolean>(false);
  const [screenShareTrack, setScreenShareTrack] =
    useState<LocalVideoTrack | null>(null);
  // const [screenShareStream, setScreenShareStream] = useState(null);

  const handleScreenSharingEnabling = () => {
    if (!isScreenSharingActive) {
      navigator.mediaDevices
        // @ts-ignore
        .getDisplayMedia()
        .then((stream: any) => {
          // setScreenShareStream(stream);
          setIsScreenSharingActive(true);
          // @ts-ignore
          const screenTrack = new LocalVideoTrack(stream.getVideoTracks()[0], {
            name: 'screen-share-track',
          });

          room.localParticipant.publishTrack(screenTrack);
          setScreenShareTrack(screenTrack);
          //event listener for chrome based web browsers popup
          stream.getVideoTracks()[0].onended = () => {
            room.localParticipant.unpublishTrack(screenTrack);
            setScreenShareTrack(null);
            setIsScreenSharingActive(false);
          };
        })
        .catch((err: any) => {
          console.error('Faile to share screen', err);
        });
    } else {
      screenShareTrack?.stop();
      room.localParticipant.unpublishTrack(screenShareTrack!);
      setScreenShareTrack(null);
      setIsScreenSharingActive(false);
    }
  };

  return (
    <Box className={classes.container} onClick={handleScreenSharingEnabling}>
      <ScreenShareIcon onClick={handleScreenSharingEnabling} />
    </Box>
  );
}
