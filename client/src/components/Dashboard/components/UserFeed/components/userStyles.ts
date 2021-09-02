import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  user: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    margin: '8 0',
    cursor: 'pointer',
    borderRadius: 10,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#E6E8EA',
    },
  },
  userAvatar: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  online: {
    position: 'absolute',
    bottom: -3,
    right: 0,
    transition: 'all 0.5s ease',
    '& > .MuiSvgIcon-root': {
      borderRadius: 999,
      backgroundColor: '#f0f2f5',
      color: '#56c700',
      fontSize: 10,
    },
  },
}));
