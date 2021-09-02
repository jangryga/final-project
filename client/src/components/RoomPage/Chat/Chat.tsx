import { Paper, Box, Divider } from '@material-ui/core';
import { styles } from './styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Messages from './Messages/Messages';
import AddMessage from './Messages/AddMessage/AddMessage';

export default function Chat() {
  const classes = styles();
  return (
    <Paper elevation={0} className={classes.chatPaper}>
      <Scrollbars autoHide autoHideDuration={200}>
        <Box className={classes.titleBox}>
          <div className={classes.chatHeader}>Chat</div>
        </Box>
        <Divider />
        <Box className={classes.chatBox}>
          <Messages />
        </Box>
      </Scrollbars>
      <Box className={classes.newMessageBox}>
        <AddMessage />
      </Box>
    </Paper>
  );
}
