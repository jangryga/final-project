import { Box } from '@material-ui/core';
import { styles } from './styles';

export default function Message(props: {
  author: string;
  content: string;
  sameAuthor: boolean;
  messageCreatedByMe: any;
}) {
  const classes = styles();
  const authorText = props.messageCreatedByMe ? 'You' : props.author;

  return props.messageCreatedByMe ? (
    <Box className={classes.messageRightAlign}>
      <Box className={classes.messageBox}>
        {!props.sameAuthor && (
          <Box className={classes.messageAuthorRight}>{authorText}</Box>
        )}
        <Box className={classes.messageContentRight}>{props.content}</Box>
      </Box>
    </Box>
  ) : (
    <Box className={classes.messageLeftAlign}>
      <Box className={classes.messageBox}>
        {!props.sameAuthor && (
          <Box className={classes.messageAuthorLeft}>{authorText}</Box>
        )}
        <Box className={classes.messageContentLeft}>{props.content}</Box>
      </Box>
    </Box>
  );
}
