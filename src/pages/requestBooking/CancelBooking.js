import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
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
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { CANCEL_BOOKING } from '../../graphql/Queries';
import useDroidDialog from '../../hooks/useDroidDialog';
import { useSnackbar } from 'notistack';
import { MAvatar } from '../../components/@material-extend';
import { FiberManualRecord } from '@mui/icons-material';
import createAvatar from '../../utils/createAvatar';
import { LoadingButton } from '@mui/lab';

function CancelBooking({ booking, earning }) {
  const { onClose } = useDroidDialog();

  const vehicle = booking.vehicleRented;

  const { enqueueSnackbar } = useSnackbar();
  const [loadingStatus, setLoadingStatus] = useState({ show: false, status: 'warning', message: 'message' });

  const [preview, setPreview] = useState(false);
  const [reason, setReason] = useState('');
  const [desc, setDesc] = useState('');

  const [cancelBooking, { loading }] = useMutation(CANCEL_BOOKING);

  const onCancelBooking = () => {
    cancelBooking({
      variables: { bookingID: booking.id, reason: reason, description: desc }
    }).then((res) => {
      enqueueSnackbar('Booking request was canceled Successfully', {
        variant: 'success'
      });
      onClose();
    });
  };

  const handleReasonChange = (e) => {
    setLoadingStatus({ show: false, status: 'warning', message: 'message' });
    setReason(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setLoadingStatus({ show: false, status: 'warning', message: 'message' });
    setDesc(e.target.value);
  };

  const onPreview = () => {
    if (reason === '') {
      setLoadingStatus({ show: true, status: 'error', message: 'Please select Reason for canceling' });
      return;
    }
    if (desc.length < 20) {
      setLoadingStatus({ show: true, status: 'error', message: 'Description must contain atleast 20 characters' });
      return;
    }

    setPreview(true);
  };

  const reasons = [
    'Guest is attempting to pay outside Vumah',
    'Different person showed up to collect the vehicle',
    'No response from the guest',
    'Technical issues',
    'Inappropriate behaviour',
    'Other(please explain in the description)'
  ];

  const getCancellationFee = () => {
    if (!booking.isAccepted) return 0;
    if (booking?.freeCancellation) {
      return 0;
    } else {
      if (booking?.isFixedPrice) {
        return booking?.cancellationPercentage;
      } else {
        return booking?.cancellationPercentage / 100;
      }
    }
  };

  const getServiceFee = () => {
    if (!booking.isAccepted) return 0;
    return earning?.fee;
  };

  const cancelView = (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack alignItems="center" spacing={1} sx={{ flexGrow: 1, width: '500px' }}>
          {loadingStatus.show && (
            <Alert severity={loadingStatus.status} sx={{ width: '100%' }}>
              {loadingStatus.message}
            </Alert>
          )}
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
              <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%', pb: 3 }}>
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
                      #{vehicle?.id}
                    </Typography>
                  </Typography>
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
                      Return
                    </Typography>
                    <Typography component="snap" variant="body2">
                      {moment(new Date(Number(booking?.endTime))).format('ddd MMM yyyy - hh:mm a')}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Select Reason</InputLabel>
              <Select id={'reason'} value={reason} label="Select Reason" onChange={handleReasonChange}>
                {reasons.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Please Describe situation"
              value={desc}
              onChange={handleDescriptionChange}
              fullWidth
              multiline
              rows={3}
            />
            <Stack alignItems="center" sx={{ width: '100%' }}>
              <Button
                variant="contained"
                size="large"
                style={{ marginTop: 24, marginBottom: 8 }}
                sx={{ borderRadius: '100px', color: '#fff', maxWidth: '300px' }}
                onClick={onPreview}
              >
                Preview Cancellation
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

  const refundPreview = (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack alignItems="center" spacing={1} sx={{ flexGrow: 1, width: '500px' }}>
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
                <Stack alignItems="center" direction="column" spacing={0.5} sx={{ pt: 1, width: '100%' }}>
                  <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%', pb: 3 }}>
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
                          #{vehicle?.id}
                        </Typography>
                      </Typography>
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
            <Stack justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
              <Typography component="snap" variant="subtitle1" sx={{ pb: 1 }}>
                Payment Info
              </Typography>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  Vehicle Cost{' '}
                </Typography>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  £{earning?.amount}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  Service Fee{' '}
                </Typography>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  -£{getServiceFee()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  Cancellation fee{' '}
                </Typography>
                <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                  -£
                  {getCancellationFee() > 1
                    ? getCancellationFee()
                    : (earning?.amount - getServiceFee()) * getCancellationFee()}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ width: '100%', py: 2, px: 1, bgcolor: 'grey.50012' }}
              >
                <Typography component="snap" variant="body1">
                  Total Refund:{' '}
                </Typography>
                <Typography component="snap" variant="body1">
                  £
                  {earning?.amount -
                    getServiceFee() -
                    (getCancellationFee() > 1
                      ? getCancellationFee()
                      : (earning?.amount - getServiceFee()) * getCancellationFee())}
                </Typography>
              </Stack>
            </Stack>
            <Stack alignItems="center" sx={{ width: '100%' }}>
              <LoadingButton
                loading={loading}
                variant="contained"
                size="large"
                style={{ marginTop: 24, marginBottom: 8 }}
                sx={{ borderRadius: '100px', color: '#fff', maxWidth: '300px' }}
                onClick={onCancelBooking}
              >
                Cancel Booking
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

  return <>{preview ? refundPreview : cancelView}</>;
}

export default CancelBooking;
