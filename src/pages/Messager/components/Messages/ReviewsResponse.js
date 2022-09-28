import React from 'react';
import { Box, Button, Divider, Rating, Stack, TextField, Typography } from '@mui/material';
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

function ReviewsResponse({ user, isMe }) {
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
              <Typography component="snap" variant="body1" color="primary">
                Guest Feedback to you
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2">
                Guest Communication:{' '}
              </Typography>
              <Rating name="half-rating" defaultValue={4} precision={0.5} size="small" />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2">
                Vehicle Condition:{' '}
              </Typography>
              <Rating name="half-rating" defaultValue={5} precision={0.5} size="small" />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2">
                Overall Experience:{' '}
              </Typography>
              <Rating name="half-rating" defaultValue={4.5} precision={0.5} size="small" />
            </Stack>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Typography component="snap" variant="body2">
                Amazing Experience. Thw vehicle was of excellent quality and handled flawlessly
              </Typography>
            </Stack>
          </Stack>
        </ContentStyle>
        {isMe && <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />}
      </Box>
    </RootStyle>
  );
}

export default ReviewsResponse;
