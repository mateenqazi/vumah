import React from 'react';

import { Divider, Stack, Typography } from '@mui/material';

function BookingAccepted({ isAccept, isMe }) {
  return (
    <>
      <Stack spacing={2}>
        <Stack>
          <Typography component="snap" variant="body2" color={isMe && 'primary.darker'}>
            {isAccept ? 'Booking Request accepted' : 'Booking Request declined'}
          </Typography>
        </Stack>
        {/*<Divider style={{ height: 0 }} />*/}
        {/* <Typography component="snap" variant="body2">{message}</Typography>*/}
      </Stack>
    </>
  );
}

export default BookingAccepted;
