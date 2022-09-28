import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function BookingBreakDown({ message, booking }) {
  const vehicle = booking.vehicleRented;

  const breakdown = message.breakDown;

  return (
    <Stack spacing={2}>
      <Stack>
        <Typography component="snap" variant="body2">
          The car has broken down
        </Typography>
        <Typography component="snap" variant="body2" color="primary.darker">
          {vehicle.make} {vehicle.model}
        </Typography>
        <Typography component="snap" variant="body2">
          Listing#{booking.id}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="snap" variant="body2">
          Reason:{' '}
        </Typography>
        <Typography component="snap" variant="body2" color="primary.darker">
          {breakdown.reason}
        </Typography>
      </Stack>
      <Typography component="snap" variant="body2">
        {breakdown.description}
      </Typography>
      <Divider />
      <Typography component="snap" variant="body2">
        Relevant images:{' '}
      </Typography>
      <Stack direction="row" justifyContent="flex-start" spacing={1}>
        {breakdown?.images?.map((image, index) => (
          <img src={image.url} key={index} alt="vumah" height={60} style={{ borderRadius: 5, overflow: 'hidden' }} />
        ))}
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
  );
}
