import React from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Alert, Box, Button, Paper, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../../components/Scrollbar';
import useAuth from '../../hooks/useAuth';
import useDroidDialog from '../../hooks/useDroidDialog';

export default function NewAddress({ setBillingAddress }) {
  const { onClose } = useDroidDialog();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

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
    onSubmit: async (values) => {
      enqueueSnackbar('Billing address was successful', { variant: 'success' });
      onClose();
      setBillingAddress({ ...values });
    }
  });

  const { errors, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={2} sx={{ flexGrow: 1, width: '550px' }}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <Scrollbar sx={{ p: 2, height: '380px' }}>
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
                      <Button type="button" color="inherit" variant="outlined" onClick={() => onClose()}>
                        Close
                      </Button>
                      <Box sx={{ flexGrow: 1 }} />
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        save
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
