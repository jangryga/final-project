import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DuoIcon from '@material-ui/icons/Duo';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react';
import { styles } from './navbarStyles';
import { useHistory } from 'react-router-dom';

export default function Navbar(props: { isUserAuthenticated: boolean }) {
  const history = useHistory();
  const classes = styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleHomeIconClicked = () => {
    history.push('/');
  };

  const handleSignOutClicked = () => {
    handleMenuClose();
    history.push('/signout');
  };

  const handleCreateAccountClicked = () => {
    handleMenuClose();
    history.push('/register');
  };

  const handleLogInClicked = () => {
    handleMenuClose();
    history.push('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {props.isUserAuthenticated ? (
        <div>
          <MenuItem onClick={handleMenuClose}>My Calls</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
          <MenuItem onClick={handleSignOutClicked}>Sign Out</MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleCreateAccountClicked}>
            Create Account
          </MenuItem>
          <MenuItem onClick={handleLogInClicked}>Log in</MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label='show 11 new notifications'
          color='inherit'
          disabled
        >
          {/* <Badge badgeContent={null} color='secondary'> */}
          <NotificationsIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton color='inherit' onClick={handleHomeIconClicked}>
            <DuoIcon style={{ fontSize: 40 }} />
          </IconButton>
          <Typography className={classes.title} variant='h4' noWrap>
            calibri
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label='show 17 new notifications'
              disableRipple
              disableFocusRipple
            >
              {/* <Badge badgeContent={17} color='secondary'> */}
              <NotificationsIcon style={{ fontSize: 30 }} />
              {/* </Badge> */}
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle style={{ fontSize: 30 }} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon style={{ fontSize: 30 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
