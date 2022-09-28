import React from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MessageAvatar from '../MessageAvatar';

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

// ----------------------------------------------------------------------

function BookingRequestReply({ user, isMe, message }) {
  const { isAccept, message: mes } = message;

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
        {!isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}

        <ContentStyle>
          <Stack spacing={2}>
            <Stack>
              <Typography component="snap" variant="body2" color="primary">
                I {isAccept ? 'accept' : 'decline'}
              </Typography>
            </Stack>
            <Divider />
            <Typography component="snap" variant="body2">
              {mes}
            </Typography>
          </Stack>
        </ContentStyle>
        {isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}
      </Box>
    </RootStyle>
  );
}

export default BookingRequestReply;
