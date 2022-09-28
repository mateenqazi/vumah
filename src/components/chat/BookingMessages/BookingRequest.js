import React from 'react';
import moment from 'moment';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import DeclineBooking from '../../../pages/requestBooking/DeclineBooking';
import useDroidDialog from '../../../hooks/useDroidDialog';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { ACCEPT_BOOKING, ACCEPT_BOOKING_CHANGE } from '../../../graphql/Queries';
import { MIconButton } from '../../@material-extend';
import { Close, Visibility } from '@mui/icons-material';
import useAuth from '../../../hooks/useAuth';
import ViewBookingChange from '../../../pages/requestBooking/ViewBookingChange';
import ViewBooking from '../../../pages/requestBooking/ViewBooking';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

function BookingRequest({ message, booking, onAccept, onAcceptLoading, isAccepted }) {
  const { onOpen } = useDroidDialog();
  const { user } = useAuth();
  const isMe = message.sender.id === user.id;

  const vehicle = booking.vehicleRented;

  const getBookingActions = () => {
    if (booking.isAccepted)
      return (
        <Typography component="snap" variant="body2">
          Booking was accepted
        </Typography>
      );
    if (booking.isDeclined)
      return (
        <Typography component="snap" variant="body2">
          Booking was declined
        </Typography>
      );

    if (booking.isCancelled)
      return (
        <Typography component="snap" variant="body2">
          Booking was cancelled
        </Typography>
      );

    if (isMe) {
      return (
        <Typography component="snap" variant="body2">
          Booking request was sent
        </Typography>
      );
    } else {
      return (
        <>
          <Button
            onClick={() => onOpen('Decline Booking', <DeclineBooking booking={booking} />)}
            variant="contained"
            size="small"
            sx={{ borderRadius: '100px', bgcolor: '#161C24', px: 2 }}
          >
            Decline
          </Button>
          <LoadingButton
            loading={onAcceptLoading}
            onClick={() => onAccept(booking?.id)}
            variant="contained"
            size="small"
            sx={{ borderRadius: '100px', color: '#fff', px: 2 }}
          >
            Accept
          </LoadingButton>
        </>
      );
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack>
          <Typography component="snap" variant="body2">
            I want to book
          </Typography>
          <Typography component="snap" variant="body2" color={isMe ? 'primary.darker' : 'primary.main'}>
            {vehicle.make} {vehicle.model}
          </Typography>
          <Typography component="snap" variant="body2">
            Listing#{booking?.id}
          </Typography>
        </Stack>
        <Divider style={{ height: 0 }} />
        <Stack direction="row" justifyContent="space-between">
          <Typography component="snap" variant="body2">
            Check In:{' '}
          </Typography>
          <Stack alignItems="flex-end">
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(booking?.startTime))).format('DD MMM yyyy')}
            </Typography>
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(booking?.startTime))).format('hh:mm a')}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="snap" variant="body2">
            Return:{' '}
          </Typography>
          <Stack alignItems="flex-end">
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(booking?.endTime))).format('DD MMM yyyy')}
            </Typography>
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(booking?.endTime))).format('hh:mm a')}
            </Typography>
          </Stack>
        </Stack>
        <Divider style={{ height: 0 }} />
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          {getBookingActions()}
        </Stack>
      </Stack>
    </>
  );
}

export default BookingRequest;
