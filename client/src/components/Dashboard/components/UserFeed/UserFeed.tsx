import { Paper, Divider } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { User } from './components/User';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { Store } from '../../../../state/reducer';

export const UserFeed = () => {
  const classes = styles();
  const ownUserName = useSelector(
    (state: Store) => state.auth.user?.username
  ) as string;
  const activeUsers = useSelector(
    (state: Store) => state.userFeed.activeUsers
  ).filter((user) => user.username !== ownUserName);

  return (
    <Paper elevation={0} className={classes.contacts}>
      <Scrollbars autoHide autoHideDuration={200}>
        <div className={classes.contactsHeader}>
          <p style={{ color: '#65676B', fontSize: '1.5rem' }}>People</p>
        </div>
        <Divider />
        <div className={classes.contactsHeader}>
          <p style={{ color: '#65676B', fontSize: '1rem' }}>
            Online ({activeUsers.length})
          </p>
        </div>

        {activeUsers.map(({ username, id }) => (
          <User key={id} title={username} />
        ))}
      </Scrollbars>
    </Paper>
  );
};
