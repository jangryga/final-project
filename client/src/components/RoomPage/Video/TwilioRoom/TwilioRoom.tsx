import { Participant, Room } from 'twilio-video';
import { setParticipants } from '../../../../state/actions/roomActions';
import { store } from '../../../../state/store';
import { useEffect, useState } from 'react';
import TwilioParticipant from './Participant/TwilioParticipant';
import { styles } from './styles';
import { Box } from '@material-ui/core';

export default function TwilioRoom({ room }: { room: Room }) {
  const [state, setState] = useState<Participant[]>([]);
  const classes = styles();

  useEffect(() => {
    const tempRemoteParticipants = Array.from(room.participants.values());
    setState([...tempRemoteParticipants]);

    room.on('participantConnected', (participant) => {
      console.log(`Participant ${participant.identity} has joined the room`);
      addParticipantToStore(participant);
      setState([...state, participant]);
    });

    room.on('participantDisconnected', (participant) => {
      console.log(`Participant ${participant.identity} has left the room`);
      removeParticipantFromStore(participant);
      setState(state.filter((p) => p.identity !== participant.identity));
    });
    // eslint-disable-next-line
  }, []);

  state.forEach((participant) => {
    addParticipantToStore(participant);
  });

  return (
    // <Box className={classes.container}>
    <Box className={classes.participantsContainer}>
      <TwilioParticipant
        key={room.localParticipant.identity}
        localParticipant
        participant={room.localParticipant}
      />

      {state.map((participant: any) => {
        return (
          <TwilioParticipant
            key={participant.identity}
            participant={participant}
          />
        );
      })}
    </Box>
    // </Box>
  );
}

const removeParticipantFromStore = (participant: Participant) => {
  const participants = store
    .getState()
    .room.participants.filter((p) => p.identity !== participant.identity);
  store.dispatch(setParticipants(participants));
};

const addParticipantToStore = (participant: Participant) => {
  const participants = store.getState().room.participants;

  if (participants.find((p) => p.identity === participant.identity)) {
    return;
  } else {
    const newParticipants = [...participants];
    newParticipants.push({ identity: participant.identity });
    store.dispatch(setParticipants(newParticipants));
  }
};
