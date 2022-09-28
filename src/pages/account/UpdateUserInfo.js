import React, { useState } from 'react';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { MIconButton } from '../../components/@material-extend';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
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
import { UPDATE_USER } from '../../graphql/Queries';
import countries from '../../layouts/authGuard/countries';
import useAuth from '../../hooks/useAuth';

function UpdatePasswordModal() {
  const { user } = useAuth();

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    address: Yup.string().required('Address required'),
    address2: Yup.string().required('Address required'),
    city: Yup.string().required('City required'),
    country: Yup.string().required('Country required'),
    postalCode: Yup.string().required('Post Code required'),
    businessName: user.isBusiness && Yup.string().required('Business name required')
  });

  const formik = useFormik({
    initialValues: {
      id: user.id,
      address: user.address,
      address2: user.address2,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      businessName: user.businessName
    },

    validationSchema: RegisterSchema,

    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await UpdateUserInfo()
          .then((res) => {
            enqueueSnackbar('User updated successfully', {
              variant: 'success'
            });
            if (isMountedRef.current) {
              setSubmitting(false);
            }
          })
          .catch((error) => {
            setErrors({ afterSubmit: error.message });
            setSubmitting(false);
          });
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const [UpdateUserInfo] = useMutation(UPDATE_USER, {
    variables: { user: values }
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={2} sx={{ flexGrow: 1, width: '550px' }}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

              <Paper
                sx={{ display: 'flex', justifyContent: 'center', py: 6, px: 4, minHeight: 200, bgcolor: 'grey.50012' }}
              >
                <Stack spacing={4} sx={{ width: '100%' }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {user.isBusiness && (
                      <TextField
                        fullWidth
                        autoComplete="businessName"
                        type="text"
                        label="Business Name"
                        {...getFieldProps('businessName')}
                        error={Boolean(touched.businessName && errors.businessName)}
                        helperText={touched.businessName && errors.businessName}
                      />
                    )}

                    <TextField
                      fullWidth
                      autoComplete="city"
                      type="text"
                      label="City"
                      {...getFieldProps('city')}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      autoComplete="address"
                      type="text"
                      label="Street address 1"
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />

                    <TextField
                      fullWidth
                      autoComplete="address2"
                      type="text"
                      label="Street address 2"
                      {...getFieldProps('address2')}
                      error={Boolean(touched.address2 && errors.address2)}
                      helperText={touched.address2 && errors.address2}
                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      autoComplete="postalCode"
                      type="number"
                      label="Post Code"
                      {...getFieldProps('postalCode')}
                      error={Boolean(touched.postalCode && errors.postalCode)}
                      helperText={touched.postalCode && errors.postalCode}
                    />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Country</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Country"
                        {...getFieldProps('country')}
                      >
                        {countries.map((country, index) => (
                          <MenuItem key={index} value={country.label}>
                            {country.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>

                  <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mr: 1 }}>
                    Update Info
                  </LoadingButton>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdatePasswordModal;
