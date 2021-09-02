import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() => ({
  messageBox: {
    padding: 2,
    marginBottom: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  messageContentLeft: {
    backgroundColor: '#e5edf9',
    color: '#555',
    padding: 9,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
  messageContentRight: {
    padding: 9,
    borderRadius: 20,
    background: 'linear-gradient(150deg, #0052c9 10%, #0990da 100%)',
    color: '#fefeff',
    fontWeight: 300,
    paddingLeft: 20,
    paddingRight: 20,
  },
  messageLeftAlign: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  messageRightAlign: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  messageAuthorRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '1.1rem',
    padding: 4,
  },
  messageAuthorLeft: {
    fontSize: '1.1rem',
    padding: 4,
  },
}));
