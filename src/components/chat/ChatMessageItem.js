import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import BookingChangeRequest from './BookingMessages/BookingChangeRequest';
import BookingCancel from './BookingMessages/BookingCancel';
import BookingDeclined from './BookingMessages/BookingDeclined';
import BookingRequest from './BookingMessages/BookingRequest';
import BookingAccepted from './BookingMessages/BookingAccepted';
import BookingRequestDeclined from './BookingMessages/BookingRequestDeclined';
import BookingRequestAccepted from './BookingMessages/BookingRequestAccepted';
import MessageAvatar from './components/MessageAvatar';
import BookingBreakDown from './BookingMessages/BookingBreakDown';
import ReviewsResponse from './BookingMessages/ReviewsResponse';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 460,
  width: 380,
  padding: theme.spacing(2),
  marginTop: 0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral
}));

const MessageImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  cursor: 'pointer',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    height: 200,
    minWidth: 296
  }
}));

// ----------------------------------------------------------------------

ChatMessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  onOpenLightbox: PropTypes.func
};

export default function ChatMessageItem({ message: input, onOpenLightbox, booking, onAccept, onAcceptLoading }) {
  const { user } = useAuth();

  const [message, setMessage] = useState(input);

  useEffect(() => setMessage(message), [message, booking]);

  const senderDetails = message.sender;

  const isMe = message.sender.id === user.id;
  const isImage = message.contentType === 'image';

  const getMessageBody = () => {
    if (booking !== null && message.body === 'Booking Request') {
      return (
        <BookingRequest
          message={message}
          booking={booking}
          onAcceptLoading={onAcceptLoading}
          onAccept={onAccept}
          isAccepted
        />
      );
    }
    if (message.contentType === 'Accept Booking Request') return <BookingAccepted isAccept={true} isMe={isMe} />;
    if (message.contentType === 'Decline Booking Request')
      return <BookingAccepted message={booking.declineReason} isAccept={false} isMe={isMe} />;
    if (message.bookingChangeRequest !== null && message.body === 'Booking Change Request') {
      return <BookingChangeRequest message={message} booking={booking} />;
    }
    if (message.bookingReview !== null && message.contentType === 'Vehicle Review') {
      return <ReviewsResponse message={message} booking={booking} isMe={isMe} />;
    }
    if (message.breakDown !== null && message.contentType === 'Vehicle Break Down') {
      return <BookingBreakDown message={message} booking={booking} />;
    }
    if (message.contentType === 'Booking Canceled') return <BookingCancel message={message} booking={booking} />;
    return (
      <>
        {isImage ? (
          <MessageImgStyle alt="attachment" src={message.body} onClick={() => onOpenLightbox(message.body)} />
        ) : (
          <Typography component="snap" variant="body2">
            {message.body}
          </Typography>
        )}
      </>
    );
  };

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto'
          })
        }}
      >
        {!isMe && <MessageAvatar user={senderDetails} sx={{ width: 32, height: 32, m: 1 }} />}

        <div>
          <ContentStyle
            sx={{
              ...(isMe && { color: '#000', bgcolor: '#f49e58' }),
              ...(isImage && { p: 0 })
            }}
          >
            {getMessageBody()}
          </ContentStyle>
        </div>

        {isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}
      </Box>
    </RootStyle>
  );
}
