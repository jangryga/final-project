import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '90px',
    marginBottom: '10px',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  name: {
    padding: '1.5rem',
    marginLeft: '2rem',
    fontSize: '1.3rem',
  },
  button: {
    height: '40px',
    padding: 10,
    backgroundColor: '#f0f2f5',
    borderRadius: 25,
    marginRight: '1rem',
    '&:hover': {
      backgroundColor: '#E6E8EA',
    },
  },
  buttonText: {
    color: '#65676B',
    marginRight: 15,
  },
  buttonIcon: {
    fill: 'red',
    marginLeft: 15,
    marginRight: 10,
  },
  buttonBox: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '2rem',
  },
}));
