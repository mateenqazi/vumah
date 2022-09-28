import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import MessageAvatar from '../chat/components/MessageAvatar';
import React from 'react';

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

export default function ChatMessageItem({ message, onOpenLightbox }) {
  const { user } = useAuth();

  const senderDetails = message.sender;

  const isMe = message.sender.id === user.id;
  const isImage = message.contentType === 'image';

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
            {isImage ? (
              <MessageImgStyle alt="attachment" src={message.body} onClick={() => onOpenLightbox(message.body)} />
            ) : (
              <Typography component="snap" variant="body2">
                {message.body}
              </Typography>
            )}
          </ContentStyle>
        </div>

        {isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}
      </Box>
    </RootStyle>
  );
}
