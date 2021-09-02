import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';

const styles = makeStyles(() => ({
  overlayContainer: {
    width: '100%',
    height: '100vh',
    background: 'rgba(0, 82, 201, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  loader: {},
}));

export default function Overlay() {
  const classes = styles();
  return (
    <Box className={classes.overlayContainer}>
      <CircularProgress size={70} />
    </Box>
  );
}
