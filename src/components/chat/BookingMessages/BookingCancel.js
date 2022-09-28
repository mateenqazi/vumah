import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import DeclineBooking from '../../../pages/requestBooking/DeclineBooking';
import useDroidDialog from '../../../hooks/useDroidDialog';
import Mercedes from '../../../assets/img/Mercedes-car.jpg';
import ViewBooking from '../../../pages/requestBooking/ViewBooking';
import { Visibility } from '@mui/icons-material';

function BookingCancel({ message, booking }) {
  const [vehicle, setVehicle] = useState({});
  const [cancelBooking, setCancelBooking] = useState({});

  useEffect(() => {
    try {
      setCancelBooking(message.cancelBooking);
      setVehicle(message.cancelBooking.booking.vehicleRented);
    } catch (e) {}
  }, [message]);

  return (
    <>
      <Stack spacing={2}>
        <Stack>
          <Typography component="snap" variant="body2">
            I want to <b>cancel</b> booking for:
          </Typography>
          <Typography component="snap" variant="body2" color="primary">
            {vehicle.make} {vehicle.model}
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
            {cancelBooking.reason}
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
        </Stack>
      </Stack>
    </>
  );
}

export default BookingCancel;
