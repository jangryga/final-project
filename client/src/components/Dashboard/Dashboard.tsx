import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  Hidden,
  Switch,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BarChartIcon from '@material-ui/icons/BarChart';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
// New dashboard
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setConnectOnlyWithAudio } from '../../state/actions/roomActions';
import { Store } from '../../state/reducer';
import { newActiveUser } from '../../utils/socketConnection/socketConnectionUserFeed';
import ActiveRooms from './components/ActiveRooms/ActiveRooms';
import CreateRoomSection from './components/CreateRoomSection/CreateRoomSection';
import { UserFeed } from './components/UserFeed/UserFeed';
import { useStyles } from './styles';

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  // Get state from redux
  const connectWithAudio: boolean = useSelector(
    (state: Store) => state.room.connectOnlyWithAudio
  );
  const name: string = useSelector(
    (state: Store) => state.auth.user?.username
  ) as string;

  const [checked, setChecked] = useState(connectWithAudio);

  const handleChecked = () => {
    setChecked(!checked);
    dispatch(setConnectOnlyWithAudio(!checked));
  };

  useEffect(() => {
    newActiveUser(name);
    // eslint-disable-next-line
  }, []);

  const handleSignOutClicked = () => {
    history.push('/signout');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>
          <div>
            <ListSubheader inset>Navigation</ListSubheader>
            <ListItem button onClick={handleSignOutClicked}>
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary='Log Out' />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Box style={{ height: '65vh' }}>
                <CreateRoomSection />
                <Divider />
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        onChange={handleChecked}
                        name='checked'
                        color='primary'
                      />
                    }
                    labelPlacement='start'
                    label='Connect only with audio'
                  />
                </Box>
                <ActiveRooms />
              </Box>
            </Grid>
            <Grid container xs={12} md={4} lg={3}>
              <Hidden smDown>
                <UserFeed />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary='Notifications' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Account' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary='Analytics' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary='Documentation' />
    </ListItem>
  </div>
);
