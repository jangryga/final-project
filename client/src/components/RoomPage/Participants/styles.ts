import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() => ({
  participants: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 6,
    // backgroundColor: '#f0f2f5',
    // marginTop: ,
  },
  participantsHeader: {
    padding: 7,
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    color: '#9ca5ab',
    fontSize: '1.3rem',
    marginBottom: 6,
  },
  participantsSubHeader: {
    padding: 5,
    paddingLeft: 30,
    color: '#65676B',
    fontSize: '0.9rem',
  },
}));
