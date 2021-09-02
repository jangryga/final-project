import { makeStyles } from '@material-ui/core/styles';

// const lightPrimary = '#f5f5f5';

export const styles = makeStyles((theme) => ({
  contacts: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#f0f2f5',
    marginTop: 5,
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  contactsHeader: {
    // marginLeft: 10,
    // display: 'flex',
    // alignItems: 'center',
    padding: 12,

    '& > .MuiSvgIcon-root': {
      marginLeft: 15,
      cursor: 'pointer',
    },
  },
}));
