import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { CREATE_STAFF_MEMBER, DECLINE_BOOKING, DECLINE_BOOKING_CHANGE } from '../../graphql/Queries';
import useDroidDialog from '../../hooks/useDroidDialog';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';

function DeclineBookingChangeRequest({ bookingChangeRequest, booking }) {
  const { onClose } = useDroidDialog();

  const vehicle = booking.vehicleRented;

  const { enqueueSnackbar } = useSnackbar();
  const [reason, setReason] = useState('');
  const [loadingStatus, setLoadingStatus] = useState({ show: false, status: 'warning', message: 'message' });

  const [DeclineBookingChange, { loading }] = useMutation(DECLINE_BOOKING_CHANGE, {
    variables: { bookingChangeID: bookingChangeRequest.id, reason: reason }
  });

  const onReasonChange = (e) => {
    setLoadingStatus({ show: false, status: 'warning', message: 'message' });
    setReason(e.target.value);
  };

  const onDecline = () => {
    if (reason.length < 20) {
      setLoadingStatus({ show: true, status: 'error', message: 'Reason must contain atleast 20 characters' });
      return;
    }

    DeclineBookingChange().then((res) => {
      enqueueSnackbar('Booking change request was declined Successfully', {
        variant: 'success'
      });
      onClose();
    });
  };

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
    <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      <Stack alignItems="center" spacing={1} sx={{ flexGrow: 1, width: '450px' }}>
        {loadingStatus.show && <Alert severity={loadingStatus.status}>{loadingStatus.message}</Alert>}
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
              <img src={vehicle.images[0].url} style={{ width: '80px', borderRadius: '10px' }} alt="Vehicle" />
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
                <Chip variant="outlined" label={`status: ${booking.status}`} color={getChipColor(booking.status)} />
              </Stack>
            </Stack>
            <Typography component="snap" variant="subtitle1">
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

          <TextField label="Reason for Decline" value={reason} onChange={onReasonChange} fullWidth multiline rows={5} />
          <Stack alignItems="center" sx={{ width: '100%' }}>
            <LoadingButton
              loading={loading}
              variant="contained"
              size="large"
              style={{ marginTop: 24, marginBottom: 8 }}
              sx={{ borderRadius: '100px', color: '#fff', maxWidth: '300px' }}
              onClick={onDecline}
            >
              Decline Booking
            </LoadingButton>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export default DeclineBookingChangeRequest;
