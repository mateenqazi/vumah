import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import moment from 'moment';

function ViewBookingChange({ bookingChangeRequest }) {
  const booking = bookingChangeRequest.booking;
  const vehicle = booking.vehicleRented;

  const getChipColor = (s) => {
    if (s === 'Requested') return 'warning';
    if (s === 'Accepted') return 'info';
    if (s === 'Ongoing') return 'info';
    if (s === 'Completed') return 'success';
    if (s === 'Declined') return 'error';
    if (s === 'Canceled') return 'error';

    return 'warning';
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack alignItems="center" spacing={1} sx={{ flexGrow: 1, width: '450px' }}>
          <Paper
            sx={{
              py: 3,
              px: 1,
              mb: 3,
              minHeight: 120,
              bgcolor: 'grey.50012',
              width: '100%'
            }}
          >
            <Stack alignItems="center" direction="column" spacing={0.5} sx={{ pt: 1, width: '100%' }}>
              <Stack alignItems="flex-start" direction="row" spacing={0.5} sx={{ width: '100%', pb: 3 }}>
                <img src={vehicle.images[0]} style={{ width: '80px', borderRadius: '10px' }} alt="Vehicle" />
                <Stack
                  alignItems="flex-start"
                  justifyContent="space-between"
                  direction="row"
                  spacing={0.5}
                  sx={{ width: '100%' }}
                >
                  <Typography component="snap" variant="subtitle1">
                    {vehicle.make} {vehicle.model}
                  </Typography>
                  <Chip variant="outlined" label={`Status: ${booking.status}`} color={getChipColor(booking.status)} />
                </Stack>
              </Stack>
              <Typography component="snap" variant="subtitle2">
                New Booking Dates
              </Typography>
              <Grid container sx={{ pb: 3 }}>
                <Grid item xs={12} sm={5}>
                  <Stack alignItems="flex-start" direction="column" spacing={0.5}>
                    <Typography component="snap" variant="subtitle2">
                      Check in
                    </Typography>
                    <Typography component="snap" variant="body2">
                      {moment(Date(Number(bookingChangeRequest.startTime))).format('ddd MMM yyyy - hh:mm a')}
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
                      {moment(Date(Number(bookingChangeRequest.endTime))).format('ddd MMM yyyy - hh:mm a')}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Card>
              <CardHeader title="Calculated Booking Costs" />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <Typography component="snap" variant="body2">
                      Old Booking Cost
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography component="snap" variant="subtitle2">
                      £120
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography component="snap" variant="body2">
                      New Booking Cost
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography component="snap" variant="subtitle2">
                      £200
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography component="snap" variant="body2">
                      Total Cost difference
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography component="snap" variant="subtitle2">
                      +£80
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}

export default ViewBookingChange;
