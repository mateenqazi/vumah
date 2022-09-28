import React from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';
import { CANCEL_BOOKING } from '../../graphql/Queries';
import countries from '../../layouts/authGuard/countries';
import Scrollbar from '../../components/Scrollbar';
import useAuth from '../../hooks/useAuth';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTheme } from '@mui/material/styles';
import useDroidDialog from '../../hooks/useDroidDialog';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function StripePayments({ booking }) {
  const { onClose } = useDroidDialog();
  const { user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();

  const clientSecret = booking.booking.clientSecret;

  const cardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
        color: theme.palette.text.primary,
        iconColor: theme.palette.text.primary,
        '::placeholder': {
          color: `${theme.palette.text.primary}50`
        }
      },
      invalid: {
        color: theme.palette.error.main,
        iconColor: theme.palette.error.main
      },
      complete: {
        iconColor: theme.palette.success.main
      }
    },
    hidePostalCode: true
  };

  const NewCardSchema = Yup.object().shape({
    line1: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    postal_code: Yup.string().required('Postal Code is required')
  });

  const formik = useFormik({
    initialValues: {
      line1: user?.address || '',
      state: user?.state || '',
      city: user?.city || '',
      postal_code: user?.postalCode || ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      const billingDetails = {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        address: {
          ...values
        }
      };

      const cardElement = elements.getElement('card');

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setErrors(paymentMethodReq.error);
        setSubmitting(false);
        enqueueSnackbar('Payment was unsuccessful', { variant: 'error' });
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setErrors(error);
        setSubmitting(false);
        enqueueSnackbar('Payment was unsuccessful', { variant: 'error' });
      } else {
        setSubmitting(false);
        enqueueSnackbar('Payment was successful', { variant: 'success' });
        onClose();
        navigate(`/bookings/${booking.contact.id}/${booking.booking.id}`);
      }
    }
  });

  const { errors, isSubmitting, handleSubmit, getFieldProps } = formik;

  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    variables: {
      bookingID: booking.booking.id,
      reason: 'Unsuccessful payment',
      description: 'Booking canceled at time of payment'
    }
  });

  const onCancelBooking = () => {
    cancelBooking().then((res) => {
      enqueueSnackbar('Booking request was canceled Successfully', {
        variant: 'success'
      });
      onClose();
      navigate('/');
    });
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={2} sx={{ flexGrow: 1, width: '550px' }}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <Scrollbar sx={{ p: 2, height: '600px' }}>
                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 3,
                    px: 2,
                    minHeight: 200,
                    bgcolor: 'grey.50012'
                  }}
                >
                  <Stack spacing={3}>
                    <Stack sx={{ py: 2, px: 1, height: '40px', justifyContent: 'center' }}>
                      <CardElement options={cardElementOptions} />
                    </Stack>

                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <>
                        <TextField
                          fullWidth
                          autoComplete="address"
                          type="text"
                          label="Address"
                          {...getFieldProps('line1')}
                        />

                        <TextField fullWidth autoComplete="city" type="text" label="City" {...getFieldProps('city')} />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            autoComplete="zip"
                            type="text"
                            label="Zip Code"
                            {...getFieldProps('postal_code')}
                          />

                          <TextField
                            fullWidth
                            autoComplete="state"
                            type="text"
                            label="State"
                            {...getFieldProps('state')}
                          />
                        </Stack>
                      </>
                    </Stack>

                    <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                      <Button type="button" color="inherit" variant="outlined" onClick={onCancelBooking}>
                        Cancel Booking
                      </Button>
                      <Box sx={{ flexGrow: 1 }} />
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Confirm Payment
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </Paper>
              </Scrollbar>
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
}
