/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Paper, Stack } from '@mui/material';
import VehicleView from './VehicleView';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_BOOKING, GET_VEHICLE_BY_ID, SIGNUP } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSelector } from '../../redux/store';
import { LoadingButton } from '@mui/lab';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import useDroidDialog from '../../hooks/useDroidDialog';
import moment from 'moment';
import { getCostsDroid } from '../../utils/TimeCalc';
import useAuth from '../../hooks/useAuth';

export default function RequestBooking() {
  const { id } = useParams();
  const { user } = useAuth();
  const [serviceFee] = useState(0.2);

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const dateRange = useSelector((state) => state.VehicleBookingTime);

  const { enqueueSnackbar } = useSnackbar();

  const bookVehicle = (vehicle) => {
    if (vehicle?.user?.id === user?.id) {
      enqueueSnackbar('Please you can not rent your own vehicle', {
        variant: 'error'
      });
      return false;
    } else {
      if (vehicle?.vehicleType === 'MOTORCYCLE') {
        if (
          user?.licenseType === vehicle?.licenseType ||
          user?.licenseType === 'A2' ||
          (user?.licenseType === 'A1' && user?.licenseType !== 'A2')
        ) {
          return true;
        } else {
          enqueueSnackbar(`Please you are required to be with an ${vehicle?.licenseType} license`, {
            variant: 'error'
          });
          return false;
        }
      } else {
        return true;
      }
    }
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('Payment is required')
  });

  const formik = useFormik({
    initialValues: {
      payment: '',
      amount: 0,
      vehicleID: id,
      startTime: dateRange.fromDate,
      endTime: dateRange.toDate
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        if (bookVehicle())
          await CreateBooking({
            variables: {
              bookingRequest: {
                startTime: dateRange?.fromDate.toDate().getTime(),
                endTime: dateRange?.toDate.toDate().getTime(),
                payment: values?.payment,
                vehicleID: values?.vehicleID,
                amount:
                  getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) +
                  getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) * serviceFee,
                fee: getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) * serviceFee,
                date: moment().toDate().getTime(),
                cardId: values?.card?.id,
                isPaypal: Boolean(values?.payment === 'paypal')
              }
            }
          })
            .then((res) => {
              // navigate(`/bookings/`);
              const booking = res?.data?.CreateBooking;
              enqueueSnackbar('Booking was created successful', {
                variant: 'success'
              });
              setSubmitting(false);
              console.log('here 1');
              if (Boolean(values?.payment === 'paypal')) {
                console.log('here 2');
                window.location.replace(booking?.booking?.paypalLink);
              } else {
                return window.location.assign(`/bookings/${booking?.contact?.id}/${booking?.booking?.id}`);
              }
            })
            .catch((error) => {
              setErrors({ afterSubmit: error.message });
              setSubmitting(false);
            });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  const [vehicle, setVehicle] = useState({});

  const [getVehicle, { loading }] = useLazyQuery(GET_VEHICLE_BY_ID, {
    variables: { id: id }
  });

  const [CreateBooking] = useMutation(CREATE_BOOKING);

  useEffect(() => {
    if (id !== undefined) {
      getVehicle()
        .then((res) => {
          setVehicle(res.data.VehicleById);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const d = {
    startTime: 1661288400000,
    endTime: 1662152400000,
    payment: 'credit_card',
    vehicleID: '2',
    amount: 672,
    fee: 112,
    date: 1661232231655,
    cardId: 'pm_1LWF06KD8DXRtfuXYUpLOCmF',
    isPaypal: false
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box sx={{ py: 5 }}>
              <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row' }}
                spacing={1}
                sx={{ px: 2, justifyContent: 'center' }}
              >
                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pb: 3,
                    px: 2,
                    minHeight: 200
                  }}
                >
                  <Stack direction="column" spacing={1} sx={{ px: 2, textAlign: 'center', maxWidth: '900px' }}>
                    <CheckoutPaymentMethods formik={formik} />
                    <CheckoutBillingInfo />
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ px: 2, pt: 3, textAlign: 'start', alignItems: 'center', maxWidth: '900px' }}
                    >
                      <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                      <label className="mb-0 pointer text-dark-white">
                        I accept the{' '}
                        <Link className="link-text pointer" to="/tos" target="_blank">
                          terms and conditions
                        </Link>{' '}
                        of the platform
                      </label>
                    </Stack>
                    <Stack direction="column" spacing={1} sx={{ px: 2, textAlign: 'start', maxWidth: '900px' }}>
                      <LoadingButton
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        disabled={!checked || getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) === 0}
                        sx={{ mr: 1, borderRadius: '100px', maxWidth: '250px', color: 'white' }}
                      >
                        Request to book
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </Paper>
                <Paper sx={{ display: 'flex', justifyContent: 'center', pb: 3, px: 0, minHeight: 200 }}>
                  <VehicleView vehicle={vehicle} serviceFee={serviceFee} />
                </Paper>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      )}
    </>
  );
}
