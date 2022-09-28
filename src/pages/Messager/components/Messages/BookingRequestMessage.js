import React from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MessageAvatar from '../MessageAvatar';
import DeclineBooking from '../../../requestBooking/DeclineBooking';

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

function BookingRequestMessage({ user, isMe }) {
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
              <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                I want to book
              </Typography>
              <Typography component="snap" variant="body2" color="primary">
                Mercedes Benz S-Class
              </Typography>
              <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                Listing#343534
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                Check In:{' '}
              </Typography>
              <Stack alignItems="flex-end">
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  1 Jan 2022
                </Typography>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  15:00
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                Return:{' '}
              </Typography>
              <Stack alignItems="flex-end">
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  4 Jan 2022
                </Typography>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  12:00
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="contained" size="small" sx={{ borderRadius: '100px', bgcolor: '#161C24', px: 2 }}>
                Decline
              </Button>
              <Button variant="contained" size="small" sx={{ borderRadius: '100px', color: '#fff', px: 2 }}>
                Accept
              </Button>
            </Stack>
          </Stack>
        </ContentStyle>
        {isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}
      </Box>
    </RootStyle>
  );
}

export default BookingRequestMessage;
