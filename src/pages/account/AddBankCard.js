import React from 'react';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT_CARD } from '../../graphql/Queries';
import countries from '../../layouts/authGuard/countries';
import Scrollbar from '../../components/Scrollbar';
import { motion } from 'framer-motion';
import { varBounceIn } from '../../components/animate';
import Visa from '../../assets/svg/payments/visa';
import Amex from '../../assets/svg/payments/american_express';
import Paypal from '../../assets/svg/payments/paypal';
import MasterCard from '../../assets/svg/payments/mastercard';
import useAuth from '../../hooks/useAuth';

function UpdatePasswordModal({ fetchCards }) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required('Name is required'),
    cardNumber: Yup.string().required('Card number is required'),
    cardExpired: Yup.string().required('Card expired is required'),
    cardCvv: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cardExpired: '',
      cardCvv: '',
      cardType: ''
      // billingAddress: {
      //   id: '',
      //   address: user.address,
      //   address2: user.address2,
      //   city: user.city,
      //   country: user.country,
      //   postalCode: user.postalCode
      // }
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await CreateCard();
      resetForm();
      setSubmitting(false);
      fetchCards();
      enqueueSnackbar('Add card success', { variant: 'success' });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setValues } = formik;

  const onChangeCardNumber = (e) => {
    setValues({
      ...values,
      cardNumber: e.target.value,
      cardType: getCardType()
    });
  };

  const getCardType = () => {
    if (values.cardNumber.startsWith('4')) return 'Visa';
    if (values.cardNumber.startsWith('5')) return 'Mastercard ';
    if (values.cardNumber.startsWith('3')) return 'American Express';

    return '';
  };

  const getCardTypeImage = () => {
    if (values.cardNumber.startsWith('4')) return <Visa sx={{ height: 30, m: 0.2 }} />;
    if (values.cardNumber.startsWith('5')) return <MasterCard sx={{ height: 30, m: 0.2 }} />;
    if (values.cardNumber.startsWith('3')) return <Amex sx={{ height: 30, m: 0.2 }} />;

    return '';
  };

  const [CreateCard] = useMutation(CREATE_PAYMENT_CARD, {
    variables: { paymentCard: values }
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={2} sx={{ flexGrow: 1, width: '550px' }}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <Scrollbar sx={{ p: 2, height: !checked ? '600px' : '400px' }}>
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
                    <Stack direction="rows" spacing={2}>
                      <Typography>{getCardType()}</Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <motion.div variants={varBounceIn}>{getCardTypeImage()}</motion.div>
                    </Stack>

                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Name on card"
                        {...getFieldProps('cardName')}
                        error={Boolean(touched.cardName && errors.cardName)}
                        helperText={touched.cardName && errors.cardName}
                      />

                      <TextField
                        fullWidth
                        label="Card number"
                        value={values.cardNumber}
                        onChange={onChangeCardNumber}
                        error={Boolean(touched.cardNumber && errors.cardNumber)}
                        helperText={touched.cardNumber && errors.cardNumber}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Expiration date"
                        placeholder="MM/YY"
                        {...getFieldProps('cardExpired')}
                        error={Boolean(touched.cardExpired && errors.cardExpired)}
                        helperText={touched.cardExpired && errors.cardExpired}
                      />

                      <TextField
                        fullWidth
                        label="Cvv"
                        {...getFieldProps('cardCvv')}
                        error={Boolean(touched.cardCvv && errors.cardCvv)}
                        helperText={touched.cardCvv && errors.cardCvv}
                      />
                    </Stack>

                    <>
                      {/*<Stack direction={{ xs: 'column' }} spacing={2}>*/}
                      {/*<FormControlLabel*/}
                      {/*  control={*/}
                      {/*    <Checkbox*/}
                      {/*      checked={checked}*/}
                      {/*      onChange={handleChange}*/}
                      {/*      inputProps={{ 'aria-label': 'controlled' }}*/}
                      {/*    />*/}
                      {/*  }*/}
                      {/*  label="Same billing address as original"*/}
                      {/*/>*/}

                      {/*{!checked && (*/}
                      {/*  <>*/}
                      {/*    <FormControl fullWidth>*/}
                      {/*      <InputLabel id="demo-simple-select-label">Country</InputLabel>*/}
                      {/*      <Select*/}
                      {/*        labelId="demo-simple-select-label"*/}
                      {/*        id="demo-simple-select"*/}
                      {/*        label="Country"*/}
                      {/*        {...getFieldProps('billingAddress.country')}*/}
                      {/*      >*/}
                      {/*        {countries.map((country, index) => (*/}
                      {/*          <MenuItem key={index} value={country.label}>*/}
                      {/*            {country.label}*/}
                      {/*          </MenuItem>*/}
                      {/*        ))}*/}
                      {/*      </Select>*/}
                      {/*    </FormControl>*/}

                      {/*    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>*/}
                      {/*      <TextField*/}
                      {/*        fullWidth*/}
                      {/*        autoComplete="address"*/}
                      {/*        type="text"*/}
                      {/*        label="Street address 1"*/}
                      {/*        {...getFieldProps('billingAddress.address')}*/}
                      {/*      />*/}

                      {/*      <TextField*/}
                      {/*        fullWidth*/}
                      {/*        autoComplete="address2"*/}
                      {/*        type="text"*/}
                      {/*        label="Street address 2"*/}
                      {/*        {...getFieldProps('billingAddress.address2')}*/}
                      {/*      />*/}
                      {/*    </Stack>*/}

                      {/*    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>*/}
                      {/*      <TextField*/}
                      {/*        fullWidth*/}
                      {/*        autoComplete="postalCode"*/}
                      {/*        type="number"*/}
                      {/*        label="Post Code"*/}
                      {/*        {...getFieldProps('billingAddress.postalCode')}*/}
                      {/*      />*/}

                      {/*      <TextField*/}
                      {/*        fullWidth*/}
                      {/*        autoComplete="city"*/}
                      {/*        type="text"*/}
                      {/*        label="City"*/}
                      {/*        {...getFieldProps('billingAddress.city')}*/}
                      {/*      />*/}
                      {/*    </Stack>*/}
                      {/*  </>*/}
                      {/*)}*/}
                      {/*</Stack>*/}
                    </>

                    <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                      <Button type="button" color="inherit" variant="outlined" onClick={() => {}}>
                        Cancel
                      </Button>
                      <Box sx={{ flexGrow: 1 }} />
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Save Card
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

export default UpdatePasswordModal;
