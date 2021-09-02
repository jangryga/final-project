import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

const styles = makeStyles(() => ({
  overlayContainer: {
    width: '100%',
    height: '100vh',
    background: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
}));

export default function LoadingScreen() {
  const classes = styles();
  return (
    <Box className={classes.overlayContainer}>
      <CircularProgress size={70} />
    </Box>
  );
}
