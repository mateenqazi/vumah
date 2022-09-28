import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Divider, Stack, Typography } from '@mui/material';
import useDroidDialog from '../../../hooks/useDroidDialog';
import useAuth from '../../../hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import { ACCEPT_BOOKING_CHANGE, BOOKING_REQUEST_CHANGE_EARNING } from '../../../graphql/Queries';
import { useSnackbar } from 'notistack';
import LoadingSection from '../../LoadingSection';
import { fCurrency } from '../../../utils/formatNumber';
import DeclineBookingChangeRequest from '../../../pages/requestBooking/DeclineBookingChangeRequest';
import { LoadingButton } from '@mui/lab';

export default function BookingChangeRequest({ message, booking }) {
  const { user } = useAuth();
  const { onOpen } = useDroidDialog();
  const { enqueueSnackbar } = useSnackbar();
  const vehicle = booking.vehicleRented;
  const isLender = booking?.lender?.id === user?.id;

  const [bookingChangeRequest, setBookingChangeRequest] = useState(false);

  useEffect(() => setBookingChangeRequest(message.bookingChangeRequest), [message, booking]);

  const [AcceptBookingChange, { loading }] = useMutation(ACCEPT_BOOKING_CHANGE, {
    variables: { bookingChangeID: bookingChangeRequest.id }
  });

  const {
    data: requestEarning,
    loading: loadingEarning,
    error: errorEarning
  } = useQuery(BOOKING_REQUEST_CHANGE_EARNING, { variables: { id: bookingChangeRequest?.id } });

  const onAccept = () => {
    AcceptBookingChange().then((res) => {
      enqueueSnackbar('Booking Change request was accepted Successfully', {
        variant: 'success'
      });
    });
  };

  const hostAmounts = () => {
    return (
      <>
        {loadingEarning ? (
          <LoadingSection />
        ) : (
          <>
            {errorEarning ? (
              <>error</>
            ) : (
              <>
                {requestEarning?.GetBookingChangeRequestEarning?.amount > 0 ? (
                  <>
                    <Stack spacing={1} justifyContent="flex-end">
                      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pt: 1 }}>
                        <Typography component="snap" variant="body2">
                          Total Amount Payable:{' '}
                        </Typography>
                        <Typography component="snap" variant="body2">
                          +£
                          {fCurrency(
                            Number(requestEarning?.GetBookingChangeRequestEarning?.amount) -
                              Number(requestEarning?.GetBookingChangeRequestEarning?.fee)
                          )}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pb: 1 }}>
                        <Typography component="snap" variant="body2">
                          Total Fee Payable:{' '}
                        </Typography>
                        <Typography component="snap" variant="body2">
                          -£{fCurrency(Number(requestEarning?.GetBookingChangeRequestEarning?.amount * 0.2))}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ bgcolor: 'vumah.selected', px: 1, py: 0.3, borderRadius: '4px' }}
                      >
                        <Typography component="snap" variant="body2">
                          Total Cost Difference:{' '}
                        </Typography>
                        <Typography component="snap" variant="body1">
                          +£
                          {fCurrency(
                            Number(requestEarning?.GetBookingChangeRequestEarning?.amount) -
                              Number(requestEarning?.GetBookingChangeRequestEarning?.fee) -
                              Number(requestEarning?.GetBookingChangeRequestEarning?.amount) * 0.2
                          )}
                        </Typography>
                      </Stack>
                      {hostActions()}
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack spacing={1} justifyContent="flex-end">
                      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pt: 1 }}>
                        <Typography component="snap" variant="body2">
                          Total Amount Payable:{' '}
                        </Typography>
                        <Typography component="snap" variant="body2">
                          -£
                          {fCurrency(
                            Number(requestEarning?.GetBookingChangeRequestEarning?.amount) -
                              Number(requestEarning?.GetBookingChangeRequestEarning?.fee)
                          )}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pb: 1 }}>
                        <Typography component="snap" variant="body2">
                          Total Fee Payable:{' '}
                        </Typography>
                        <Typography component="snap" variant="body2">
                          -£0
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ bgcolor: 'vumah.selected', px: 1, py: 0.3, borderRadius: '4px' }}
                      >
                        <Typography component="snap" variant="body2">
                          Total Cost Difference:{' '}
                        </Typography>
                        <Typography component="snap" variant="body1">
                          -£{fCurrency(Number(requestEarning?.GetBookingChangeRequestEarning?.amount))}
                        </Typography>
                      </Stack>
                      {hostActions()}
                    </Stack>
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    );
  };

  const hostActions = () => {
    if (bookingChangeRequest.isAccepted)
      return (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ bgcolor: 'vumah.selected', px: 1, py: 0.3, borderRadius: '4px' }}
        >
          <Typography component="snap" variant="body2">
            Status:{' '}
          </Typography>
          <Typography component="snap" variant="body2" color="primary">
            Request accepted
          </Typography>
        </Stack>
      );
    if (bookingChangeRequest.isDeclined)
      return (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ bgcolor: 'vumah.selected', px: 1, py: 0.3, borderRadius: '4px' }}
        >
          <Typography component="snap" variant="body2">
            Status:{' '}
          </Typography>
          <Typography component="snap" variant="body2" color="primary">
            Request declined
          </Typography>
        </Stack>
      );
    return (
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button
          onClick={() =>
            onOpen(
              'Decline Booking',
              <DeclineBookingChangeRequest bookingChangeRequest={bookingChangeRequest} booking={booking} />
            )
          }
          variant="contained"
          size="small"
          sx={{ borderRadius: '100px', bgcolor: '#161C24', color: '#fff', px: 2 }}
        >
          Decline Change
        </Button>

        <LoadingButton
          loading={loading}
          onClick={onAccept}
          variant="contained"
          size="small"
          sx={{ borderRadius: '100px', color: '#fff', px: 2 }}
        >
          Accept Change
        </LoadingButton>
      </Stack>
    );
  };

  return (
    <Stack spacing={2}>
      <Stack>
        <Typography component="snap" variant="body2">
          I want to <b>Change</b> booking for:{' '}
          <Typography component="snap" variant="body2" color="primary">
            {vehicle.make} {vehicle.model}
          </Typography>
        </Typography>
        <Typography component="snap" variant="body2">
          Listing id:{' '}
          <Typography component="snap" color="primary" variant="body2">
            #{vehicle?.id}
          </Typography>
        </Typography>
      </Stack>
      <Divider style={{ height: '0', width: '100%' }} />
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="snap" variant="body2">
            Check In:{' '}
          </Typography>
          <Stack alignItems="flex-end">
            <Typography component="snap" variant="body2">
              {moment(Date(bookingChangeRequest.oldStartTime)).format('DD MMM yyyy')}
            </Typography>
            <Typography component="snap" variant="body2">
              {moment(Date(bookingChangeRequest.oldStartTime)).format('hh:mm A')}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="snap" variant="body2">
            Return:{' '}
          </Typography>
          <Stack alignItems="flex-end">
            <Typography component="snap" variant="body2">
              {moment(Date(bookingChangeRequest.oldEndTime)).format('DD MMM yyyy')}
            </Typography>
            <Typography component="snap" variant="body2">
              {moment(Date(bookingChangeRequest.oldEndTime)).format('hh:mm A')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider style={{ height: '0', width: '100%' }} />
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="snap" variant="body2" color="primary">
            New Check In:{' '}
          </Typography>
          <Stack alignItems="flex-end">
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(bookingChangeRequest.startTime))).format('DD MMM yyyy')}
            </Typography>
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(bookingChangeRequest.startTime))).format('hh:mm A')}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="snap" variant="body2" color="primary">
            New Return:{' '}
          </Typography>
          <Stack alignItems="flex-end" justifyContent="center">
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(bookingChangeRequest.endTime))).format('DD MMM yyyy')}
            </Typography>
            <Typography component="snap" variant="body2">
              {moment(new Date(Number(bookingChangeRequest.endTime))).format('hh:mm A')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider style={{ height: '0', width: '100%' }} />
      {hostAmounts()}
    </Stack>
  );
}
