import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Divider, Drawer, Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
// components
import { MAvatar, MHidden } from '../@material-extend';
import useDroidDialog from '../../hooks/useDroidDialog';
import ChangeBooking from '../../pages/requestBooking/ChangeBooking';
import ReportBreakdown from '../../pages/requestBooking/ReportBreakdown';
import CancelBooking from '../../pages/requestBooking/CancelBooking';
import useAuth from '../../hooks/useAuth';
import DeclineBooking from '../../pages/requestBooking/DeclineBooking';
import createAvatar from '../../utils/createAvatar';
import { useMutation, useSubscription } from '@apollo/client';
import { BOOKING_ACTIVITIES_SUBSCRIPTION, END_TRIP, START_TRIP } from '../../graphql/Queries';
import { LoadingButton, TimelineConnector, TimelineContent, TimelineDot, TimelineSeparator } from '@mui/lab';
import moment from 'moment';
import ChatRoomScrollbar from '../ChatRoomScrollbar';
import { useSnackbar } from 'notistack';
import { getTimeDiff, getTimeDiffDroid } from '../../utils/TimeCalc';
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 320;

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
  right: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(1),
  boxShadow: theme.customShadows.z8,
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.divider}`,
  borderRight: 0,
  borderRadius: `12px 0 0 12px`,
  transition: theme.transitions.create('all'),
  '&:hover': {
    backgroundColor: theme.palette.background.neutral
  }
}));

// ----------------------------------------------------------------------

export default function ChatRoom({ booking, onAccept, onAcceptLoading, isAccepted, earning }) {
  const { onOpen } = useDroidDialog();
  const theme = useTheme();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const { loading } = useSubscription(BOOKING_ACTIVITIES_SUBSCRIPTION, {
    variables: { id: booking?.id },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setData(data?.GetBookingActivities);
    }
  });

  const [checkIn, { loading: checkInLoading }] = useMutation(START_TRIP, { variables: { bookingID: booking.id } });
  const [checkOut, { loading: checkOutLoading }] = useMutation(END_TRIP, { variables: { bookingID: booking.id } });

  const [openSidebar, setOpenSidebar] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const timeToGo = getTimeDiff(new Date(Number(booking?.startTime)), Date());

  const onCheckIn = () => {
    checkIn().then((res) => {
      enqueueSnackbar('Booking checked in Successfully', {
        variant: 'success'
      });
    });
  };

  const onCheckOut = () => {
    checkOut().then((res) => {
      enqueueSnackbar('Booking checked out Successfully', {
        variant: 'success'
      });
    });
  };

  useEffect(() => {
    if (isMobile) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isMobile]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const getBookingsActions = () => {
    const isLender = booking.lender.id === user.id;

    if (isLender) {
      if (booking.isAccepted || isAccepted)
        return (
          <Stack spacing={1}>
            <Typography
              component="snap"
              variant="body2"
              sx={{ color: 'text.primary', width: '100%', textAlign: 'left' }}
            >
              Booking request was accepted
            </Typography>
          </Stack>
        );
      if (booking.isDeclined)
        return (
          <>
            <Typography
              component="snap"
              variant="body2"
              sx={{ color: 'text.primary', width: '100%', textAlign: 'left' }}
            >
              Booking request was declined
            </Typography>
          </>
        );
      if (booking.isCancelled)
        return (
          <>
            <Typography
              component="snap"
              variant="body2"
              sx={{ color: 'text.primary', width: '100%', textAlign: 'left' }}
            >
              Booking request was cancelled
            </Typography>
          </>
        );

      return (
        <>
          <Divider orientation="horizontal" flexItem style={{ height: '0', width: '100%' }} />
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            spacing={0.5}
            sx={{ width: '100%' }}
          >
            <Button
              size="small"
              variant="outlined"
              sx={{ borderRadius: '100px', px: 2 }}
              onClick={() => onOpen('Decline Booking', <DeclineBooking booking={booking} />)}
            >
              Decline
            </Button>
            <LoadingButton
              loading={onAcceptLoading}
              size="small"
              variant="contained"
              sx={{ borderRadius: '100px', color: '#fff', px: 2 }}
              onClick={() => onAccept(booking?.id)}
            >
              Accept
            </LoadingButton>
          </Stack>
        </>
      );
    } else {
      if (booking.isDeclined)
        return (
          <>
            <Typography
              component="snap"
              variant="body2"
              sx={{ color: 'text.primary', width: '100%', textAlign: 'left' }}
            >
              Booking request was declined
            </Typography>
          </>
        );
      if (booking.isCancelled)
        return (
          <>
            <Typography
              component="snap"
              variant="body2"
              sx={{ color: 'text.primary', width: '100%', textAlign: 'left' }}
            >
              Booking request was canceled
            </Typography>
          </>
        );
      if (booking.isAccepted)
        return (
          <>
            {booking.isCheckInComplete !== true && (
              <>
                <Divider orientation="horizontal" flexItem style={{ height: '0', width: '100%' }} />
                <Stack
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  spacing={0.5}
                  sx={{ width: '100%' }}
                >
                  <Button
                    // disabled={timeToGo.dif < 1800000}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: '100px', px: 2 }}
                    onClick={() => onOpen('Cancel Booking', <CancelBooking booking={booking} earning={earning} />)}
                  >
                    Cancel
                  </Button>
                  <Button
                    // disabled={timeToGo.dif < 1800000}
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: '100px', color: '#fff', px: 2 }}
                    onClick={() => onOpen('Change Booking', <ChangeBooking booking={booking} earning={earning} />)}
                  >
                    Change
                  </Button>
                </Stack>
                <Divider orientation="horizontal" flexItem style={{ height: '0', width: '100%' }} />
                <Stack
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  spacing={0.5}
                  sx={{ width: '100%' }}
                >
                  <LoadingButton
                    // disabled={timeToGo.dif > 1800000}
                    loading={checkInLoading}
                    size="medium"
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: '100px', px: 2 }}
                    onClick={onCheckIn}
                  >
                    Check In
                  </LoadingButton>
                </Stack>
              </>
            )}
            {booking.isCheckInComplete === true && booking.isCheckOutComplete !== true && (
              <>
                <Divider orientation="horizontal" flexItem style={{ height: '0', width: '100%' }} />
                <Stack
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  spacing={0.5}
                  sx={{ width: '100%' }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: '100px', px: 1, whiteSpace: 'nowrap' }}
                    onClick={() => onOpen('Report Breakdown', <ReportBreakdown booking={booking} />)}
                  >
                    Report breakdown
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: '100px', px: 1, whiteSpace: 'nowrap' }}
                    onClick={() => onOpen('Request Extra Time', <ChangeBooking booking={booking} earning={earning} />)}
                  >
                    Request Extra time
                  </Button>
                </Stack>
                <Divider orientation="horizontal" flexItem style={{ height: '0', width: '100%' }} />
                <Stack
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  spacing={0.5}
                  sx={{ width: '100%' }}
                >
                  <LoadingButton
                    loading={checkOutLoading}
                    size="medium"
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: '100px', px: 2 }}
                    onClick={onCheckOut}
                  >
                    Check Out
                  </LoadingButton>
                </Stack>
              </>
            )}
          </>
        );
      return (
        <>
          <Button
            // disabled={timeToGo.dif < 1800000}
            fullWidth
            variant="contained"
            size="small"
            sx={{ borderRadius: '100px', px: 2 }}
            onClick={() => onOpen('Cancel Booking', <CancelBooking booking={booking} earning={earning} />)}
          >
            Cancel
          </Button>
        </>
      );
    }
  };

  const calc = () => {
    if (booking?.lender?.id === user?.id) {
      return {
        amount: earning?.amount - earning?.fee,
        fee: (earning?.amount - earning?.fee) * 0.1,
        total: earning?.amount - earning?.fee - (earning?.amount - earning?.fee) * 0.1
      };
    } else {
      return {
        amount: earning?.amount - earning?.fee,
        fee: earning?.fee,
        total: earning?.amount
      };
    }
  };

  const dateRange = {
    fromDate: new Date(Number(booking?.startTime)),
    toDate: new Date(Number(booking?.endTime))
  };
  // const timeToEnd = getTimeDiff(new Date(Number(booking?.endTime), Date()));

  const bookingDetailsView = (
    <>
      <Stack alignItems="center" direction="column" spacing={1} sx={{ width: '100%', p: 1 }}>
        <Stack alignItems="center" spacing={1} sx={{ width: '100%' }}>
          <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%', px: 1 }}>
            <MAvatar
              src={booking.vehicleRented.images[0]?.url}
              alt={booking.vehicleRented.make}
              sx={{
                width: 52,
                height: 52
              }}
            >
              {createAvatar(booking.vehicleRented.make).firstName}
            </MAvatar>
            <Stack alignItems="flex-start" justifyContent="space-between" spacing={0.5} sx={{ width: '100%' }}>
              <Typography
                component="snap"
                variant="subtitle1"
                color="primary"
                className="cpointer"
                onClick={() => {
                  navigate(`/vehicle/${booking.vehicleRented.id}`);
                }}
              >
                {booking.vehicleRented.make} {booking.vehicleRented.model}
              </Typography>
              <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                Booking Id:{' '}
                <Typography component="snap" color="primary">
                  #{booking.id}
                </Typography>
              </Typography>
              <Stack direction="row" justifyContent="flex-start">
                <Typography component="snap" variant="caption">
                  Starts in: {timeToGo.days} : {timeToGo.hours} : {timeToGo.minutes} : {timeToGo.seconds}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Grid container spacing={1} sx={{ width: '100%' }}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Divider orientation="horizontal" flexItem style={{ height: '0', width: '100%' }} />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Stack
                  alignItems="flex-start"
                  justifyContent="space-between"
                  direction="row"
                  spacing={2}
                  sx={{ pt: 1 }}
                >
                  <Stack alignItems="flex-start" spacing={1}>
                    <Typography component="snap" variant="subtitle1" sx={{ color: 'text.primary' }}>
                      Check in
                    </Typography>
                    <Stack alignItems="flex-start">
                      <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                        {moment(new Date(Number(booking?.startTime))).format('DD MMM yyyy')}
                      </Typography>
                      <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                        {moment(new Date(Number(booking?.startTime))).format('hh:mm a')}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack alignItems="flex-end" direction="column" spacing={1}>
                    <Typography component="snap" variant="subtitle1" sx={{ color: 'text.primary' }}>
                      Return
                    </Typography>
                    <Stack alignItems="flex-end">
                      <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                        {moment(new Date(Number(booking?.endTime))).format('DD MMM yyyy')}
                      </Typography>
                      <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                        {moment(new Date(Number(booking?.endTime))).format('hh:mm a')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="flex-start" sx={{ pb: 2 }}>
                  <Typography component="snap" variant="caption">
                    {getTimeDiffDroid(dateRange).days} days & {getTimeDiffDroid(dateRange).hours} hours &{' '}
                    {getTimeDiffDroid(dateRange).minutes} minutes
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Divider orientation="horizontal" flexItem style={{ height: '0', width: '100%' }} />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
              <Stack justifyContent="space-between" sx={{ width: '100%' }} spacing={0.5}>
                <Typography component="snap" variant="subtitle1" sx={{ pb: 0.5, color: 'text.primary' }}>
                  Payment Info
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                    Vehicle Cost{' '}
                  </Typography>
                  <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                    £{fCurrency(calc()?.amount)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                    Service Fee{' '}
                  </Typography>
                  <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                    {booking?.lender?.id === user?.id ? '-' : '+'}£{fCurrency(calc()?.fee)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Stack alignItems="center" justifyContent="center" spacing={0.5} sx={{ width: '100%', p: 1 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
              <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                Total
              </Typography>
              <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                £{fCurrency(calc()?.total)}
              </Typography>
            </Stack>
            {getBookingsActions()}
          </Stack>
          <Stack alignItems="flex-start" justifyContent="flex-start" sx={{ p: 1, pt: 2, width: '100%' }}>
            <Typography component="snap" variant="h5" sx={{ mt: 2 }}>
              Activity Feeds
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="flex-start" justifyContent="flex-start" spacing={0.5} sx={{ width: '100%', height: '100%' }}>
          <ChatRoomScrollbar sx={{ width: '100%', height: 'calc(100vh - 600px)', minHeight: '200px', p: 1 }}>
            {!loading && data && (
              <Stack alignItems="flex-start" justifyContent="flex-start" spacing={0.5} sx={{ width: '100%', p: 1 }}>
                {data?.map((item, index) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      position: 'relative',
                      minHeight: '70px',
                      p: 1
                    }}
                  >
                    <TimelineSeparator>
                      <TimelineDot />
                      {index === data?.length ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack
                        alignItems="flex-start"
                        justifyContent="space-between"
                        spacing={0.5}
                        sx={{ minWidth: '100%' }}
                      >
                        <Typography component="snap" variant="body1" color="primary">
                          {item.name}
                        </Typography>
                        <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                          {moment(item.date).format('DD MMM yyyy hh:mm a')}
                        </Typography>
                      </Stack>
                    </TimelineContent>
                  </Box>
                ))}
              </Stack>
            )}
          </ChatRoomScrollbar>
        </Stack>
      </Stack>
    </>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <ToggleButtonStyle
        onClick={handleToggleSidebar}
        sx={{
          ...(openSidebar && !isMobile && { right: DRAWER_WIDTH })
        }}
      >
        <Icon width={16} height={16} icon={openSidebar ? arrowIosForwardFill : arrowIosBackFill} />
      </ToggleButtonStyle>

      <MHidden width="lgUp">
        <Drawer
          anchor="right"
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH
            }
          }}
        >
          <Stack spacing={2} sx={{ pt: 4 }}>
            {bookingDetailsView}
          </Stack>
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open={openSidebar}
          anchor="right"
          variant="persistent"
          sx={{
            height: 1,
            width: DRAWER_WIDTH,
            transition: theme.transitions.create('width'),
            ...(!openSidebar && { width: '0px' }),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: DRAWER_WIDTH
            }
          }}
        >
          <Stack spacing={2} sx={{ pt: 4 }}>
            {bookingDetailsView}
          </Stack>
        </Drawer>
      </MHidden>
    </Box>
  );
}
