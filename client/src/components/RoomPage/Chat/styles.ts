import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() => ({
  chatPaper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: 'inherit',
    paddingLeft: 6,
    paddingRight: 6,
  },
  titleBox: {
    height: '50x',
    width: '100%',
  },
  chatBox: {
    height: '83%',
    width: '100%',
  },
  newMessageBox: {
    height: '80px',
    width: '100%',
  },
  chatHeader: {
    padding: 7,
    paddingLeft: 23,
    display: 'flex',
    justifyContent: 'flex-start',
    color: '#9ca5ab',
    fontSize: '1.3rem',
    // marginBottom: 6,
    margin: 6,
  },
}));
