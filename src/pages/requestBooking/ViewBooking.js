import React from 'react';
import { Button, Card, CardContent, CardHeader, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import DeclineBooking from './DeclineBooking';
import CancelBooking from './CancelBooking';
import ChangeBooking from './ChangeBooking';
import useDroidDialog from '../../hooks/useDroidDialog';
import { useTheme } from '@mui/material/styles';
import useAuth from '../../hooks/useAuth';

function ViewBooking({ booking, getMessages }) {
  const { onOpen } = useDroidDialog();

  const { user } = useAuth();

  const getChipColor = (s) => {
    if (s === 'Requested') return 'warning';
    if (s === 'Accepted') return 'info';
    if (s === 'Ongoing') return 'info';
    if (s === 'Completed') return 'success';
    if (s === 'Declined') return 'error';
    if (s === 'Canceled') return 'error';

    return 'warning';
  };

  const getBookingsActions = (booking) => {
    const isLender = booking.lender.id === user.id;
    if (isLender) {
      if (booking.isAccepted)
        return (
          <Typography component="snap" variant="body2">
            Booking request was accepted
          </Typography>
        );
      if (booking.isDeclined)
        return (
          <Typography component="snap" variant="body2">
            Booking request was declined
          </Typography>
        );

      return (
        <>
          <Button
            size="large"
            variant="outlined"
            sx={{ borderRadius: '100px' }}
            onClick={() => onOpen('Decline Booking', <DeclineBooking booking={booking} getMessages={getMessages} />)}
          >
            Decline Request
          </Button>
          <Button size="large" variant="contained" sx={{ borderRadius: '100px', color: '#fff' }} onClick={onAccept}>
            Accept Request
          </Button>
        </>
      );
    } else {
      if (booking.isAccepted) {
        return (
          <>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              sx={{ borderRadius: '100px' }}
              onClick={() => onOpen('Cancel Booking', <CancelBooking booking={booking} earning={earning} />)}
            >
              Cancel Booking
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ borderRadius: '100px', color: '#fff' }}
              onClick={() => onOpen('Change Booking details', <ChangeBooking booking={booking} earning={earning} />)}
            >
              Change Booking
            </Button>
          </>
        );
      }
      if (booking.isDeclined)
        return (
          <Typography component="snap" variant="body1">
            Booking request was declined
          </Typography>
        );

      return (
        <Typography component="snap" variant="body1">
          Booking Change request was sent
        </Typography>
      );
    }
  };

  return (
    <>
      <Stack alignItems="center" direction="column" spacing={0.5} sx={{ p: 3 }}>
        <Stack alignItems="center" direction="column" spacing={0.5} sx={{ pt: 1, width: '100%' }}>
          <Stack alignItems="flex-start" direction="row" spacing={0.5} sx={{ width: '100%', pb: 3 }}>
            <img
              src={booking.vehicleRented.images[0].url}
              style={{ width: '80px', borderRadius: '10px' }}
              alt="Vehicle"
            />
            <Stack
              alignItems="flex-start"
              justifyContent="space-between"
              direction="row"
              spacing={0.5}
              sx={{ width: '100%' }}
            >
              <Typography
                sx={{
                  maxWidth: '200px',
                  mx: 0.5,
                  fontWeight: '700',
                  lineHeight: '1.5',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {booking.vehicleRented.make} {booking.vehicleRented.model}
              </Typography>
              <Chip variant="outlined" label={`Status: ${booking.status}`} color={getChipColor(booking.status)} />
            </Stack>
          </Stack>
          <Grid container sx={{ pb: 3 }}>
            <Grid item xs={12} sm={5}>
              <Stack alignItems="flex-start" direction="column" spacing={0.5}>
                <Typography component="snap" variant="subtitle2">
                  Check in
                </Typography>
                <Typography component="snap" variant="body2">
                  {moment(new Date(Number(booking?.startTime))).format('ddd MMM yyyy - hh:mm a')}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Divider orientation="vertical" flexItem style={{ height: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Stack alignItems="flex-start" direction="column" spacing={0.5}>
                <Typography component="snap" variant="subtitle2">
                  Check out
                </Typography>
                <Typography component="snap" variant="body2">
                  {moment(new Date(Number(booking?.endTime))).format('ddd MMM yyyy - hh:mm a')}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Card>
            <CardHeader title="Booking Costs" />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <Typography component="snap" variant="body2">
                    Vehicle Cost
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="snap" variant="subtitle2">
                    £120
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography component="snap" variant="body2">
                    Service Cost
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="snap" variant="subtitle2">
                    £20
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography component="snap" variant="body2">
                    Total Cost
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="snap" variant="subtitle2">
                    £140
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            spacing={0.5}
            sx={{ width: '100%', pt: 3 }}
          >
            {getBookingsActions(booking)}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default ViewBooking;
