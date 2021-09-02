import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '65px',
    backgroundColor: 'inherit',
    // backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  innerBox: {
    width: '60%',
    height: '100%',
    background: 'linear-gradient(50deg, #0052c9 10%, #0990da 100%)',
    borderRadius: '0% 0% 25px 25px',
    color: '#fefeff',
    fontWeight: 300,
    fontSize: '1.1rem',
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
    paddingTop: '18px',
    overflow: 'hidden',
    zIndex: 99,
  },
  innerBoxParagraph: {},
}));

export default function TopLabel({ roomId }: { roomId: string }) {
  const classes = styles();

  return (
    <Box className={classes.container}>
      <Box className={classes.innerBox}>
        <p className={classes.innerBoxParagraph}>ID: {roomId}</p>
      </Box>
    </Box>
  );
}
