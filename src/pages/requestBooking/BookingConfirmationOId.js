import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, Typography, Stack, Grid, Divider, CardHeader, CardContent } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
import CarouselVehicles from '../Favorites/CarouselVehicles';
import moment from 'moment';

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

function BookingConfirmation({ booking }) {
  const currentBalance = 1200;
  const discountAmount = 200;
  const sentAmount = 100;
  const totalAmount = currentBalance + sentAmount - discountAmount;

  const images = [
    {
      id: '20',
      url: 'https://vumah-store.s3.us-east-2.amazonaws.com/9797258.jpg',
      __typename: 'Image'
    },
    {
      id: '21',
      url: 'https://vumah-store.s3.us-east-2.amazonaws.com/8786425.jpg',
      __typename: 'Image'
    },
    {
      id: '23',
      url: 'https://vumah-store.s3.us-east-2.amazonaws.com/6062690.jpg',
      __typename: 'Image'
    }
  ];

  return (
    <>
      <Grid container spacing={3} sx={{ py: 5, px: 2 }}>
        <Grid item xs={12} md={6} lg={8}>
          <Stack spacing={2} sx={{ p: 3 }}>
            <Typography component="snap" variant="h3">
              Booking Created:
              <Typography component="snap" variant="h3" sx={{ color: 'text.secondary' }}>
                {' '}
                (4 days & 3 hours)
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
                        {moment().format('ddd MMM yyyy - hh:mm a')}
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
                        {moment().format('ddd MMM yyyy - hh:mm a')}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Typography component="snap" variant="body1">
              *You won't be charged util the booking is confirmed
            </Typography>
            <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
              Message Host
            </Typography>
            <Typography component="snap" variant="body1">
              Incase of any question on the booking, its best you message the host
            </Typography>
            <Button variant="contained" sx={{ maxWidth: '150px', borderRadius: '100px' }}>
              Message Host
            </Button>
            <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
              Cancellation Policy
            </Typography>
            <Typography component="snap" variant="body1">
              *When booking a vehicle on the Vumah platform we allow free cancellations up to 24hrs before the trip
              start to allow flexibility for our guests.
              <br />
              If the guest chooses to cancel for any reason within the 24 hours period of the trip start, the guest will
              be subject to a late cancellation fee and will be refunded the remainder that is on hold.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 0 }}>
            <CarouselVehicles images={images} />
            <Stack spacing={2} sx={{ p: 3 }}>
              <Typography component="snap" variant="h3">
                Make - (M4533KL)
              </Typography>

              <RowStyle>
                <Typography component="snap" variant="body1" sx={{ color: 'text.secondary' }}>
                  Boooking ID
                </Typography>
                <Typography component="snap" variant="body1">
                  VUM26546734LT
                </Typography>
              </RowStyle>

              <RowStyle>
                <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                  Vehicle Cost
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

              <Stack direction="row" spacing={1.5}>
                <Button fullWidth variant="contained" size="large" sx={{ borderRadius: '100px' }}>
                  Continue to Bookings
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default BookingConfirmation;
