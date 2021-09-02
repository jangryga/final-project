import { Box } from '@material-ui/core';
import Message from './Message/Message';
import { useSelector } from 'react-redux';
import { Store } from '../../../../state/reducer';

export default function Messages() {
  const messages = useSelector((state: Store) => state.room.messages);
  return (
    <Box>
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity;
        return (
          <Message
            key={index}
            content={message.content}
            author={message.identity}
            sameAuthor={sameAuthor}
            messageCreatedByMe={message.messageCreatedByMe}
          />
        );
      })}
    </Box>
  );
}
