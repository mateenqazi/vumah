import React from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MessageAvatar from '../MessageAvatar';
import car from '../../../../assets/img/Mercedes-car.jpg';

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

export default function BookingBreakDown({ user, isMe }) {
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
                The car has broken down
              </Typography>
              <Typography component="snap" variant="body2" color="primary">
                Mercedes Benz S-Class
              </Typography>
              <Typography component="snap" variant="body2">
                Listing#343534
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2">
                Reason:{' '}
              </Typography>
              <Typography component="snap" variant="body2" color="primary">
                Cut-off/engine won't start{' '}
              </Typography>
            </Stack>
            <Typography component="snap" variant="body2">
              Lamem ipsim doloe sit a met, comenyt asipis cling.{' '}
            </Typography>
            <Divider />
            <Typography component="snap" variant="body2">
              Relevant images:{' '}
            </Typography>
            <Stack direction="row" justifyContent="flex-start" spacing={1}>
              <img src={car} alt="vumah" height={60} style={{ borderRadius: 5, overflow: 'hidden' }} />
              <img src={car} alt="vumah" height={60} style={{ borderRadius: 5, overflow: 'hidden' }} />
              <img src={car} alt="vumah" height={60} style={{ borderRadius: 5, overflow: 'hidden' }} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ bgcolor: 'vumah.selected', px: 1, py: 0.3 }}>
              <Typography component="snap" variant="body2">
                Status:{' '}
              </Typography>
              <Typography component="snap" variant="body2" color="primary">
                Breakdown verified
              </Typography>
            </Stack>
          </Stack>
        </ContentStyle>
        {isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}
      </Box>
    </RootStyle>
  );
}
