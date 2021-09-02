import { Paper, Divider, Box } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Participant } from './Participant/Participant';
import { styles } from './styles';
import { useSelector } from 'react-redux';

import { Store } from '../../../state/reducer';

// const participants = [
//   {
//     identity: 'Marek',
//   },
//   {
//     identity: 'John',
//   },
//   {
//     identity: 'Anna',
//   },
//   {
//     identity: 'Kyle',
//   },
// ];

export default function Participants() {
  const classes = styles();
  const participants = useSelector((state: Store) => state.room.participants);

  return (
    <Paper elevation={3} className={classes.participants}>
      <Scrollbars autoHide autoHideDuration={200}>
        <Box className={classes.participantsHeader}>
          <p>Participants</p>
        </Box>
        <Divider />
        <div className={classes.participantsSubHeader}>
          <p>Active ({participants.length})</p>
        </div>

        {participants.map((participant, index) => {
          return (
            <Participant
              key={participant.identity}
              identity={participant.identity.slice(
                36,
                participant.identity.length
              )}
            />
          );
        })}
      </Scrollbars>
    </Paper>
  );
}
