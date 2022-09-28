import React, { useCallback } from 'react';
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
import { CREATE_PAYMENT_CARD, CREATE_STAFF_MEMBER } from '../../graphql/Queries';
import countries from '../../layouts/authGuard/countries';
import Scrollbar from '../../components/Scrollbar';
import { UploadAvatar } from '../../components/upload';
import { fData } from '../../utils/formatNumber';

function AddStaffMember(props) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const NewCardSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Card number is required'),
    adminLevel: Yup.string().required('Card expired is required'),
    photoURL: Yup.string().required('Card expired is required')
  });

  const formik = useFormik({
    initialValues: {
      name: 'KANYESIGYE ALLAN',
      email: 'kanyeallan@gmail.com',
      adminLevel: 'Moderate Access',
      photoURL: '/static/mock-images/avatars/avatar_default.jpg'
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await CreateStaff();
      // resetForm();
      setSubmitting(false);
      // alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Add card success', { variant: 'success' });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const [CreateStaff, { loading, data, error }] = useMutation(CREATE_STAFF_MEMBER, {
    variables: { staffMember: values }
  });

  const adminLevels = ['Full access', 'Moderate Access', 'Read Only Access'];

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={2} sx={{ flexGrow: 1, width: '550px' }}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  py: 4,
                  px: 4,
                  minHeight: 200,
                  bgcolor: 'grey.50012'
                }}
              >
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <UploadAvatar
                    accept="image/*"
                    file={values.photoURL}
                    maxSize={3145728}
                    onDrop={handleDrop}
                    error={Boolean(touched.photoURL && errors.photoURL)}
                    caption={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary'
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />

                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    select
                    label="Admin Level"
                    {...getFieldProps('adminLevel')}
                    error={Boolean(touched.adminLevel && errors.adminLevel)}
                    helperText={touched.adminLevel && errors.adminLevel}
                  >
                    {adminLevels.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                    <Button type="button" color="inherit" variant="outlined" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Save Staff Member
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
}

export default AddStaffMember;
