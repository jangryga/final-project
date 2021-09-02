import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Avatar } from '@material-ui/core';

import { styles } from './userStyles';

export const User = (props: { title: string }) => {
  const classes = styles();

  return (
    <div className={classes.user}>
      <div className={classes.userAvatar}>
        <Avatar />
        <div className={classes.online}>
          <FiberManualRecordIcon />
        </div>
      </div>
      <div style={{ marginLeft: 8, color: '#555', fontSize: '1rem' }}>
        {' '}
        {props.title}{' '}
      </div>
    </div>
  );
};
