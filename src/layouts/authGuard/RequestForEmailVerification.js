import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { SEND_EMAIL_VERIFICATION, VERIFICATION_REQUEST } from '../../graphql/Queries';
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { varBounceIn, varFadeInDown } from '../../components/animate';
import { MailIllustration } from '../../assets';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';

function RequestForEmailVerification(props) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const [success, setSuccess] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await CreateMailVerification().then((res) => {
          setSuccess(true);
          enqueueSnackbar('Verification Email sent Successfully', {
            variant: 'success'
          });
          if (isMountedRef.current) {
            setSubmitting(false);
          }
        });
      } catch (error) {
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const [CreateMailVerification] = useMutation(SEND_EMAIL_VERIFICATION, {
    variables: { userName: values.email }
  });

  return (
    <div style={{ width: '400px', maxWidth: '400px' }}>
      <Typography component="snap" variant="h5" textAlign="center" sx={{ color: 'text.secondary', mb: 3, px: 2 }}>
        Request for a new verification email
      </Typography>
      {success ? (
        <Stack spacing={3} sx={{ px: 4, justifyContent: 'center', textAlign: 'center' }}>
          <Alert severity="success">Email Sent</Alert>

          <motion.div variants={varBounceIn}>
            <MailIllustration sx={{ height: 100, my: { xs: 1, sm: 1 } }} />
          </motion.div>

          <motion.div variants={varFadeInDown}>
            <Paper sx={{ p: 1 }}>
              <Typography component="snap" variant="body1">
                An email has been sent for verification
              </Typography>
            </Paper>
          </motion.div>

          <motion.div variants={varBounceIn}>
            <Button size="large" variant="contained" sx={{ m: 1 }}>
              Check your email
            </Button>
          </motion.div>
        </Stack>
      ) : (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ px: 4, py: 5 }}>
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

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ my: 5 }}
              >
                Send Verification Email
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      )}
    </div>
  );
}

export default RequestForEmailVerification;
