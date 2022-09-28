import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, Typography, Stack, Grid, Divider, CardHeader, CardContent } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
import CarouselVehicles from '../Favorites/CarouselVehicles';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { GET_USER_BOOKING_BY_ID } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import { useParams } from 'react-router-dom';

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

function BookingConfirmation() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_USER_BOOKING_BY_ID, { variables: { id: id } });

  const currentBalance = 1200;
  const discountAmount = 200;
  const sentAmount = 100;
  const totalAmount = currentBalance + sentAmount - discountAmount;

  if (loading) return <LoadingScreen />;

  if (error) return <>no booking found</>;
  return (
    <>
      <Grid container spacing={3} sx={{ py: 5, px: 2 }}>
        <Grid item xs={12} md={6} lg={8}>
          <Stack spacing={2} sx={{ p: 3 }}>
            <Typography component="snap" variant="h3">
              Your booking request has been sent!
              <br />
              <Typography component="snap" variant="h3" sx={{ color: 'text.secondary' }}>
                {' '}
                (
                {moment
                  .duration(moment(data?.BookingById?.endTime).diff(moment(data?.BookingById?.startTime)))
                  .asDays()
                  .toFixed(0)}{' '}
                days &{' '}
                {moment
                  .duration(moment(data?.BookingById?.endTime).diff(moment(data?.BookingById?.startTime)))
                  .asHours() % 24}{' '}
                hours)
              </Typography>
            </Typography>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={5}>
                    <Stack alignItems="flex-start" direction="column" spacing={0.5}>
                      <Typography component="snap" variant="subtitle2">
                        Check in
                      </Typography>
                      <Typography component="snap" variant="body2">
                        {moment(data?.BookingById?.startTime).format('ddd MMM yyyy - hh:mm a')}
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
                        {moment(data?.BookingById?.endTime).format('ddd MMM yyyy - hh:mm a')}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Typography component="snap" variant="body1">
              Once your booking request has been confirmed we will send you an email and notify you in your bookings tab
            </Typography>
            <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
              Message Host
            </Typography>
            <Typography component="snap" variant="body1">
              Have a question before your booking starts? Please message the host directly regarding your queries
            </Typography>
            <Button variant="contained" sx={{ maxWidth: '150px', borderRadius: '100px' }}>
              Message Host
            </Button>
            <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
              Cancellation Policy
            </Typography>
            {!data?.BookingById?.vehicleRented?.freeCancellation ? (
              <Typography component="snap" variant="body1">
                {data?.BookingById?.vehicleRented?.cancellationDescription}
              </Typography>
            ) : (
              <Typography component="snap" variant="body1">
                *When booking a vehicle on the Vumah platform we allow free cancellations up to 24hrs before the trip
                start to allow flexibility for our guests.
                <br />
                If the guest chooses to cancel for any reason within the 24 hours period of the trip start, the guest
                will be subject to a late cancellation fee and will be refunded the remainder that is on hold.
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 0 }}>
            <CarouselVehicles images={data?.BookingById?.vehicleRented?.images} />
            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography component="snap" variant="h3">
                {data?.BookingById?.vehicleRented?.make} {data?.BookingById?.vehicleRented?.model}
              </Typography>

              <RowStyle>
                <Typography component="snap" variant="body1" sx={{ color: 'text.secondary' }}>
                  Booking ID
                </Typography>
                <Typography component="snap" variant="body1">
                  {data?.BookingById?.id}
                </Typography>
              </RowStyle>

              <RowStyle>
                <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                  Booking Cost
                </Typography>
                <Typography component="snap" variant="body2">
                  {fCurrency(currentBalance)}
                </Typography>
              </RowStyle>

              <RowStyle>
                <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                  Service Fee
                </Typography>
                <Typography component="snap" variant="body2">
                  {fCurrency(sentAmount)}
                </Typography>
              </RowStyle>

              <RowStyle>
                <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                  Coupon Discount
                </Typography>
                <Typography component="snap" variant="body2">
                  - {fCurrency(discountAmount)}
                </Typography>
              </RowStyle>

              <RowStyle>
                <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                  Total Amount
                </Typography>
                <Typography component="snap" variant="subtitle1">
                  {fCurrency(totalAmount)}
                </Typography>
              </RowStyle>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default BookingConfirmation;
