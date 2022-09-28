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

function BookingCancelMessage({ user, isMe }) {
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
              <Typography component="snap" variant="body2">
                I want to <b>cancel</b> booking for:
              </Typography>
              <Typography component="snap" variant="body2" color="primary">
                Mercedes Benz S-Class
              </Typography>
              <Typography component="snap" variant="body2">
                Listing#343534
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2">
                Check In:{' '}
              </Typography>
              <Stack alignItems="flex-end">
                <Typography component="snap" variant="body2">
                  1 Jan 2022
                </Typography>
                <Typography component="snap" variant="body2">
                  15:00
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2">
                Return:{' '}
              </Typography>
              <Stack alignItems="flex-end">
                <Typography component="snap" variant="body2">
                  4 Jan 2022
                </Typography>
                <Typography component="snap" variant="body2">
                  12:00
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack>
              <Typography component="snap" variant="body2">
                Change of plans
              </Typography>
              <Typography component="snap" variant="body2">
                Will not require the car for specified date.
              </Typography>
            </Stack>
            <Divider />
            <Stack spacing={1} justifyContent="flex-end">
              <Stack direction="row" justifyContent="space-between" sx={{ px: 1, py: 0.3 }}>
                <Typography component="snap" variant="body2">
                  Total paid:{' '}
                </Typography>
                <Stack alignItems="flex-end">
                  <Typography component="snap" variant="body2">
                    £ 270
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ px: 1, py: 0.3 }}>
                <Typography component="snap" variant="body2">
                  Cancellation fee:{' '}
                </Typography>
                <Stack alignItems="flex-end">
                  <Typography component="snap" variant="body2">
                    £ 70
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ bgcolor: 'vumah.selected', px: 1, py: 0.3 }}>
                <Typography component="snap" variant="body2">
                  Total Refund:{' '}
                </Typography>
                <Stack alignItems="flex-end">
                  <Typography component="snap" variant="body2">
                    £ 200
                  </Typography>
                </Stack>
              </Stack>
              <Stack alignItems="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: '100px', color: '#fff', px: 2, width: 'fit-content' }}
                >
                  View info
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </ContentStyle>
        {isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}
      </Box>
    </RootStyle>
  );
}

export default BookingCancelMessage;
