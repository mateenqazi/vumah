// material
import { Card, Container, Stack } from '@mui/material';
import MessageAvatar from './MessageAvatar';
import ConversationItem from './ConversationItem';
import { useTheme } from '@mui/material/styles';
import BookingRequestMessage from './Messages/BookingRequestMessage';
import BookingRequestReply from './Messages/BookingRequestReply';
import BookingChangeMessage from './Messages/BookingChangeMessage';
import BookingCancelMessage from './Messages/BookingCancelMessage';
import ReviewsForm from './Messages/ReviewsForm';
import ReviewsResponse from './Messages/ReviewsResponse';
import BookingBreakDown from './Messages/BookingBreakDown';

// ----------------------------------------------------------------------

export default function ChatComponents() {
  const user = { name: 'Kanye Allan', photoURL: '/static/mock-images/avatars/avatar_6.jpg' };
  const user1 = { name: 'Magazi Mark', photoURL: '/static/mock-images/avatars/avatar_2.jpg' };
  const user2 = { name: 'Mulungi Jordan', photoURL: '/static/mock-images/avatars/avatar_3.jpg' };
  const user3 = { name: 'Kando Bruce', photoURL: '/static/mock-images/avatars/avatar_4.jpg' };
  const theme = useTheme();
  return (
    <Container maxWidth={false}>
      <Card sx={{ display: 'flex', mt: 1, p: 5 }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <MessageAvatar
            user={user}
            sx={{
              width: '70px',
              height: '70px',
              border: 'solid 4px black',
              borderColor: theme.palette.primary.main
            }}
          />
          <ConversationItem isSelected={true} user={user} unRead={1} online={false} />
          <ConversationItem isSelected={false} user={user1} unRead={2} online={true} />
          <ConversationItem isSelected={false} user={user2} online={false} />
          <ConversationItem isSelected={false} user={user3} online={false} />
          <Stack spacing={2} sx={{ width: '100%', bgcolor: 'vumah.selected', p: 2 }}>
            <BookingRequestMessage user={user3} isMe={false} />
            <BookingRequestReply user={user} isMe={true} message={{ isAccept: true, message: 'Thank you' }} />
            <BookingRequestMessage user={user3} isMe={false} />
            <BookingRequestReply
              user={user}
              isMe={true}
              message={{ isAccept: false, message: 'The listing is already taken for the request days' }}
            />
            <BookingChangeMessage user={user3} isMe={false} />
            <BookingChangeMessage user={user} isMe={true} />
            <BookingCancelMessage user={user3} isMe={false} />
            <ReviewsForm user={user3} isMe={false} />
            <ReviewsForm user={user} isMe={true} />
            <ReviewsResponse user={user3} isMe={false} />
            <ReviewsResponse user={user} isMe={true} />
            <BookingBreakDown user={user} isMe={false} />
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
