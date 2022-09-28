import React, { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import useDroidDialog from '../../hooks/useDroidDialog';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { REQUEST_BOOKING_CHANGE } from '../../graphql/Queries';
import { MAvatar } from '../../components/@material-extend';
import { FiberManualRecord } from '@mui/icons-material';
import createAvatar from '../../utils/createAvatar';
import { LoadingButton } from '@mui/lab';
import { getTimeDiffDroid } from '../../utils/TimeCalc';
import { fCurrency } from '../../utils/formatNumber';

function ChangeBooking({ booking, earning }) {
  const { onClose } = useDroidDialog();

  const orignalStarTime = moment(new Date(Number(booking?.startTime))).format('M/DD/YYYY (hh:mm)');
  const orignalEndTime = moment(new Date(Number(booking?.endTime))).format('M/DD/YYYY (hh:mm)');

  const vehicle = booking.vehicleRented;

  const { enqueueSnackbar } = useSnackbar();
  const [loadingStatus, setLoadingStatus] = useState({ show: false, status: 'warning', message: 'message' });

  const [preview, setPreview] = useState(false);
  const [fromDate, setFromDate] = useState(moment(new Date(Number(booking?.startTime))).format('M/DD/YYYY (hh:mm)'));
  const [toDate, setToDate] = useState(moment(new Date(Number(booking?.endTime))).format('M/DD/YYYY (hh:mm)'));

  const intialDif = getTimeDiffDroid({
    fromDate: new Date(Number(booking?.startTime)),
    toDate: new Date(Number(booking?.endTime))
  });

  const newDif = getTimeDiffDroid({
    fromDate: moment(fromDate),
    toDate: moment(toDate)
  });

  const [changeBooking, { loading }] = useMutation(REQUEST_BOOKING_CHANGE);

  const onChangeBooking = () => {
    changeBooking({
      variables: {
        bookingID: booking.id,
        startTime: moment(fromDate).toDate().getTime(),
        endTime: moment(toDate).toDate().getTime(),
        amount: getNewValues().total,
        fee: getNewValues().fee
      }
    }).then((res) => {
      enqueueSnackbar('Booking Change request was sent Successfully', {
        variant: 'success'
      });
      onClose();
    });
  };

  const onPreview = () => {
    if (fromDate === orignalStarTime && toDate === orignalEndTime) {
      setLoadingStatus({ show: true, status: 'error', message: 'No change on the time range' });
      return;
    }
    setPreview(true);
  };

  function handleEvent(event, picker) {
    setLoadingStatus({ show: false, status: 'warning', message: 'message' });

    if (!picker.startDate) {
      enqueueSnackbar('the start date can not be past the date today', {
        variant: 'error'
      });
    }

    setFromDate(picker.startDate.format('M/DD/YYYY (hh:mm)'));
    setToDate(picker.endDate.format('M/DD/YYYY (hh:mm)'));
  }

  const getChipColor = (s) => {
    if (s === 'Requested') return 'warning';
    if (s === 'Accepted') return 'info';
    if (s === 'Ongoing') return 'info';
    if (s === 'Completed') return 'success';
    if (s === 'Declined') return 'error';
    if (s === 'Canceled') return 'error';

    return 'warning';
  };

  const getNewValues = () => {
    if (newDif.dif > intialDif.dif) {
      const distanceToNow = newDif.dif - intialDif.dif;

      const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

      const getLength = Math.floor((distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const getCalMinutes = Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60));

      const amount =
        getDays * vehicle?.dailyRates +
          getLength * vehicle?.hourlyRates +
          (getCalMinutes / 60) * vehicle?.hourlyRates || 0;

      return {
        amount: amount,
        fee: amount * 0.1,
        total: amount + amount * 0.1
      };
    } else {
      const distanceToNow = intialDif.dif - newDif.dif;

      const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

      const getLength = Math.floor((distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const getCalMinutes = Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60));

      const amount =
        getDays * vehicle?.dailyRates +
          getLength * vehicle?.hourlyRates +
          (getCalMinutes / 60) * vehicle?.hourlyRates || 0;

      return {
        amount: amount,
        fee: 0,
        total: -amount
      };
    }
  };

  const dateChange = (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack alignItems="center" spacing={1} sx={{ flexGrow: 1, width: '500px' }}>
          {loadingStatus.show && <Alert severity={loadingStatus.status}>{loadingStatus.message}</Alert>}
          <Paper
            sx={{
              py: 3,
              px: 1,
              mb: 3,
              minHeight: 120,
              width: '100%'
            }}
          >
            <Card sx={{ bgcolor: 'grey.50012', boxShadow: 'none', mb: 3 }}>
              <CardContent>
                <Stack alignItems="center" direction="column" spacing={2} sx={{ pt: 1, width: '100%' }}>
                  <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%' }}>
                    <MAvatar
                      src={booking.vehicleRented.images[0]?.url}
                      alt={booking.vehicleRented.make}
                      sx={{
                        width: 72,
                        height: 72,
                        border: 'solid 3px black',
                        borderColor: (theme) => theme.palette.primary.main
                      }}
                    >
                      {createAvatar(booking.vehicleRented.make).firstName}
                    </MAvatar>
                    <Stack alignItems="flex-start" justifyContent="space-between" spacing={0.5} sx={{ width: '100%' }}>
                      <Typography component="snap" variant="subtitle1" color="primary">
                        {vehicle.make} {vehicle.model}
                      </Typography>
                      <Typography component="snap" variant="body1">
                        Listing
                        <Typography component="snap" color="primary">
                          #343534
                        </Typography>
                      </Typography>
                    </Stack>
                  </Stack>
                  <Grid container sx={{ pb: 2 }}>
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
                          Return
                        </Typography>
                        <Typography component="snap" variant="body2">
                          {moment(new Date(Number(booking?.endTime))).format('ddd MMM yyyy - hh:mm a')}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
            <Typography component="snap" variant="subtitle1" sx={{ my: 1 }}>
              Booking Dates
            </Typography>
            <DateRangePicker
              initialSettings={{
                minDate: moment(),
                timePicker: true,
                timePickerIncrement: 15,
                startDate: fromDate,
                endDate: toDate
              }}
              alwaysShowCalendars={true}
              onEvent={handleEvent}
            >
              <div className="banner-search-field">
                <input type="text" name="daterange" value={`${fromDate} - ${toDate}`} onChange={() => {}} />
              </div>
            </DateRangePicker>
            <Stack alignItems="center" sx={{ width: '100%' }}>
              <Button
                variant="contained"
                size="large"
                style={{ marginTop: 24, marginBottom: 8 }}
                sx={{ borderRadius: '100px', color: '#fff', maxWidth: '300px' }}
                onClick={onPreview}
              >
                Preview booking Changes
              </Button>

              <Stack direction="row" justifyContent="center">
                <FiberManualRecord fontSize="small" color="primary" />
                <FiberManualRecord fontSize="small" />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );

  const changePreview = (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack alignItems="center" spacing={1} sx={{ flexGrow: 1, width: '500px' }}>
          <Paper
            sx={{
              py: 1,
              px: 1,
              minHeight: 120,
              width: '100%'
            }}
          >
            <Card sx={{ bgcolor: 'grey.50012', boxShadow: 'none', mb: 3 }}>
              <CardContent>
                <Stack alignItems="center" direction="column" spacing={2} sx={{ width: '100%' }}>
                  <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%' }}>
                    <MAvatar
                      src={booking.vehicleRented.images[0]?.url}
                      alt={booking.vehicleRented.make}
                      sx={{
                        width: 72,
                        height: 72,
                        border: 'solid 3px black',
                        borderColor: (theme) => theme.palette.primary.main
                      }}
                    >
                      {createAvatar(booking.vehicleRented.make).firstName}
                    </MAvatar>
                    <Stack alignItems="flex-start" justifyContent="space-between" spacing={0.5} sx={{ width: '100%' }}>
                      <Typography component="snap" variant="subtitle1" color="primary">
                        {vehicle.make} {vehicle.model}
                      </Typography>
                      <Typography component="snap" variant="body1">
                        Listing
                        <Typography component="snap" color="primary">
                          #343534
                        </Typography>
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography component="snap" variant="subtitle2">
                    New Booking Dates
                  </Typography>
                  <Grid container sx={{ pb: 1 }}>
                    <Grid item xs={12} sm={5}>
                      <Stack alignItems="flex-start" direction="column" spacing={0.5}>
                        <Typography component="snap" variant="subtitle2">
                          Check in
                        </Typography>
                        {/*<Typography component="snap" variant="body2">*/}
                        {/*  <strike>{moment(new Date(Number(booking?.startTime))).format('M/DD/YYYY (hh:mm)')}</strike>*/}
                        {/*</Typography>*/}
                        <Typography component="snap" variant="body2">
                          {fromDate}
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
                        {/*<Typography component="snap" variant="body2" sx={{}}>*/}
                        {/*  <strike>{moment(new Date(Number(booking?.endTime))).format('M/DD/YYYY (hh:mm)')}</strike>*/}
                        {/*</Typography>*/}
                        <Typography component="snap" variant="body2">
                          {toDate}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
            {newDif.dif > intialDif.dif ? (
              <Stack justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
                <Typography component="snap" variant="subtitle1" sx={{ pb: 1 }}>
                  Payment Info
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pt: 1 }}>
                  <Typography component="snap" variant="body1">
                    Total Paid before:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    £{earning?.amount - earning?.fee}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pt: 1 }}>
                  <Typography component="snap" variant="body1">
                    Total Amount Payable:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    +£{fCurrency(getNewValues().amount)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pb: 1 }}>
                  <Typography component="snap" variant="body1">
                    Total Fee Payable:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    +£{fCurrency(getNewValues().fee)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: '100%', py: 2, px: 1, bgcolor: 'grey.50012' }}
                >
                  <Typography component="snap" variant="body1">
                    Total Cost Difference:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    +£{fCurrency(getNewValues().total)}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
                <Typography component="snap" variant="subtitle1" sx={{ pb: 1 }}>
                  Payment Info
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pt: 1 }}>
                  <Typography component="snap" variant="body1">
                    Total Paid before:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    £{fCurrency(earning?.amount - earning?.fee)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pt: 1 }}>
                  <Typography component="snap" variant="body1">
                    Total Amount Payable:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    -£{fCurrency(getNewValues().amount)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pb: 1 }}>
                  <Typography component="snap" variant="body1">
                    Total Fee Payable:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    £{fCurrency(getNewValues().fee)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: '100%', py: 2, px: 1, bgcolor: 'grey.50012' }}
                >
                  <Typography component="snap" variant="body1">
                    Total Cost Difference:{' '}
                  </Typography>
                  <Typography component="snap" variant="body1">
                    -£{fCurrency(getNewValues().amount)}
                  </Typography>
                </Stack>
              </Stack>
            )}
            <Stack alignItems="center" sx={{ width: '100%' }}>
              <LoadingButton
                loading={loading}
                variant="contained"
                size="large"
                style={{ marginTop: 24, marginBottom: 8 }}
                sx={{ borderRadius: '100px', color: '#fff', maxWidth: '300px' }}
                onClick={onChangeBooking}
              >
                Submit Change Request
              </LoadingButton>
              <Stack direction="row" justifyContent="center">
                <FiberManualRecord fontSize="small" />
                <FiberManualRecord fontSize="small" color="primary" />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );

  return <>{preview ? changePreview : dateChange}</>;
}

export default ChangeBooking;
