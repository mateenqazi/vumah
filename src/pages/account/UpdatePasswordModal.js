import React, { useState } from 'react';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { MIconButton } from '../../components/@material-extend';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';
import { SIGNUP, UPDATE_PASSWORD } from '../../graphql/Queries';

function UpdatePasswordModal(props) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    },

    validationSchema: RegisterSchema,

    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await UpdatePassword();

        enqueueSnackbar('data.response.message', {
          variant: 'success'
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }

        setActiveStep(true);
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

  const [UpdatePassword, { loading, data, error }] = useMutation(UPDATE_PASSWORD, {
    variables: { updatePassword: { oldPassword: values.password, newPassword: values.newPassword } }
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={2} sx={{ flexGrow: 1, width: '550px' }}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

              {activeStep ? (
                <>
                  <Paper sx={{ p: 5, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
                    <Stack spacing={1} alignItems="center" justifyContent="center">
                      <Typography component="snap" variant="subtitle2" sx={{ color: 'text.secondary', my: 1 }}>
                        Please verify this change by clicking on the link sent to your email.
                      </Typography>

                      <Typography component="snap" variant="subtitle1" sx={{ color: 'text.secondary' }}>
                        {/*({values.email})*/}
                        email
                      </Typography>
                    </Stack>
                  </Paper>
                </>
              ) : (
                <>
                  <Paper
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      py: 6,
                      px: 4,
                      minHeight: 200,
                      bgcolor: 'grey.50012'
                    }}
                  >
                    <Stack spacing={3} sx={{ width: '100%' }}>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowPassword} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />

                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="New Password"
                        {...getFieldProps('newPassword')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowPassword} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                      />

                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        {...getFieldProps('confirmPassword')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowPassword} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                      />

                      <LoadingButton
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        sx={{ mr: 1 }}
                      >
                        Update Password
                      </LoadingButton>
                    </Stack>
                  </Paper>
                </>
              )}
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdatePasswordModal;
