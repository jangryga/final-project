import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(() => ({
  createRoomCard: {
    width: '100%',
    height: '80px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#ffffff',
    marginTop: '1rem',
    marginBottom: '1rem',
    borderRadius: 10,
  },
  createRoomTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    color: '#65676B',
    fontSize: '1.7rem',
    marginLeft: '1rem',
  },
  creatRoomButtonBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  creatRoomButton: {
    padding: 10,
    backgroundColor: '#f0f2f5',
    borderRadius: 25,
    marginRight: '1rem',
    '&:hover': {
      backgroundColor: '#E6E8EA',
    },
  },
}));
