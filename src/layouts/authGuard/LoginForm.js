import * as Yup from 'yup';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';

import { Visibility, VisibilityOff } from '@mui/icons-material';
// material
import {
  Alert,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
//
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/Queries';
import useDroidDialog from '../../hooks/useDroidDialog';
import { useDispatch } from 'react-redux';
import ForgotPasswordRequest from './ForgotPasswordRequest';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const { setData } = useAuth();

  const { onClose, onOpen } = useDroidDialog();

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login().then((res) => {
          if (res.data.login.token) {
            dispatch({
              type: 'Token',
              payload: res.data.login.token
            });
            setData(res);
            onClose();
            enqueueSnackbar('Login success', {
              variant: 'success'
            });
            if (isMountedRef.current) {
              setSubmitting(false);
            }
          } else {
            setErrors({ afterSubmit: res.data.login.error });
            if (isMountedRef.current) {
              setSubmitting(false);
            }
          }
        });
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: 'Failed to login' });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const [login] = useMutation(LOGIN, {
    variables: { userName: values.email, password: values.password }
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div style={{ minWidth: '350px', maxWidth: '414px', paddingTop: 56 }}>
      <Stack
        sx={{ justifyContent: 'center', width: '76%', position: 'absolute', top: '28px', left: '40px', right: '40px' }}
      >
        <Typography textAlign="center" sx={{ mt: 1, px: 2, fontWeight: '600', fontSize: '1.5rem' }}>
          Welcome back!
        </Typography>
      </Stack>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ px: 4 }}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
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
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2, px: 4 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />

            <Link
              component={RouterLink}
              to={'/'}
              variant="subtitle2"
              onClick={(event) => {
                event.preventDefault();
                onClose();
                onOpen('', <ForgotPasswordRequest />);
              }}
            >
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mb: 2 }}>
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
}
