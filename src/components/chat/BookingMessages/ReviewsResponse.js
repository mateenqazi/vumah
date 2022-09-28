import React from 'react';
import { Divider, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

function ReviewsResponse({ message, booking, isMe }) {
  const review = message.bookingReview;
  const isLender = booking.lender.id === message.sender.id;

  return (
    <Stack spacing={2}>
      <Stack>
        <Typography component="snap" variant="body1" color={isMe ? 'primary.darker' : 'primary.main'}>
          Booking feedback
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography component="snap" variant="body2">
          {isLender ? 'Guest' : 'Host'} Communication?{' '}
        </Typography>
        <Rating name="half-rating" defaultValue={review.communicationRating} precision={0.5} size="small" readOnly />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="snap" variant="body2">
          Vehicle {isLender ? 'Condition' : 'Quality'}?{' '}
        </Typography>
        <Rating name="half-rating" defaultValue={review.vehicleRating} precision={0.5} size="small" readOnly />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="snap" variant="body2">
          Overall Experience:{' '}
        </Typography>
        <Rating name="half-rating" defaultValue={review.experienceRating} precision={0.5} size="small" readOnly />
      </Stack>
      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <Typography component="snap" variant="body2">
          {review.comment}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ReviewsResponse;
