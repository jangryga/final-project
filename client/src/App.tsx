import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import SignOut from './components/SignOut/SignOut';
import LoadingScreen from './components/ui/LoadingScreen';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { connectWithWebSocketUserFeed } from './utils/socketConnection/socketConnectionUserFeed';
import { connectWithWebSocketMedia } from './utils/socketConnection/socketConnectionMedia';
import { useSelector, useDispatch } from 'react-redux';
import { useRequest } from './utils/hooks/useRequest';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  setUserLoading,
  setUserLoaded,
  setUserLoggedIn,
} from './state/actions/authActions';
import { Store } from './state/reducer';
import { Paper } from '@material-ui/core';
import RoomPage from './components/RoomPage/RoomPage';

function App() {
  const isUserLoading: boolean = useSelector(
    (state: Store) => state.auth.isLoading
  );
  const isUserAuthenticated: boolean = useSelector(
    (state: Store) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  const { doRequest } = useRequest({
    url: '/api/users/currentuser',
    method: 'get',
    onSuccess: (res) => {
      if (res.currentUser) {
        dispatch(setUserLoggedIn({ ...res.currentUser }));
        dispatch(setUserLoaded());
      } else {
        // dispatch(setUserLoggedOut());
        dispatch(setUserLoaded());
      }
    },
  });

  useEffect(() => {
    dispatch(setUserLoading());
    connectWithWebSocketUserFeed('/api/user-feed');
    connectWithWebSocketMedia('/api/media');
    doRequest();
    // eslint-disable-next-line
  }, []);

  return (
    <Paper
      elevation={0}
      style={{
        width: '100%',
        height: '92vh',
        backgroundColor: '#fafafa',
      }}
    >
      <Router>
        <ToastContainer />
        {isUserLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Switch>
              <Route path='/register'>
                {isUserAuthenticated ? (
                  <Redirect push to='/dashboard' />
                ) : (
                  <Register />
                )}
              </Route>
              <Route path='/dashboard'>
                {!isUserAuthenticated ? (
                  <Redirect push to='/' />
                ) : (
                  <Dashboard />
                )}
              </Route>
              <Route path='/room'>
                <RoomPage />
              </Route>
              <Route path='/signout'>
                <SignOut />
              </Route>
              <Route path='/'>
                {isUserAuthenticated ? (
                  <Redirect push to='/dashboard' />
                ) : (
                  <SignIn />
                )}
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </Paper>
  );
}

export default App;
