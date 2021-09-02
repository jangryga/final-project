import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() => ({
  roomPaper: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#f0f2f5',
  },
  roomMiddleSection: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  roomTitle: {
    height: '65px',
  },
  roomVideo: {
    // backgroundColor: 'red',
    height: 'calc(100% - 72px)',
    // zIndex: 99,
  },
  roomBottomMenu: {
    height: '72px',
  },
  roomChat: {
    width: '100%',
  },
  roomUsers: {
    width: '100%',
    overflow: 'hidden',
  },
}));
