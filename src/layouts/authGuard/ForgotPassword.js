import * as Yup from 'yup';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

import { Visibility, Close, VisibilityOff } from '@mui/icons-material';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../components/@material-extend';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../../graphql/Queries';
import useDroidDialog from '../../hooks/useDroidDialog';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const { setData } = useAuth();

  const { onClose } = useDroidDialog();

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
        });
      } catch (error) {
        console.error(error.message);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
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
    <div style={{ width: '400px' }}>
      <Typography textAlign="center" sx={{ mt: 3, mb: 2, px: 2, fontWeight: '600', fontSize: '2rem' }}>
        Welcome back!
      </Typography>
      <Typography component="snap" variant="h5" textAlign="center" sx={{ color: 'text.secondary', mb: 3, px: 2 }}>
        Please login to your Account
      </Typography>

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

            <Link component={RouterLink} variant="subtitle2" to={'/reset-password'}>
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mb: 5 }}>
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </div>
  );
}
