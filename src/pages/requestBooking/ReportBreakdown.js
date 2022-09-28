import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { MAvatar, MIconButton } from '../../components/@material-extend';
import createAvatar from '../../utils/createAvatar';
import useDroidDialog from '../../hooks/useDroidDialog';
import Masonry from '@mui/lab/Masonry';
import { Close, FiberManualRecord } from '@mui/icons-material';
import UploadImages from './UploadImages';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { UploadImages as UploadFileImages } from '../../utils/UploadImage';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';
import { VEHICLE_BREAKDOWN } from '../../graphql/Queries';

function ReportBreakdown({ booking }) {
  const { onClose } = useDroidDialog();
  const vehicle = booking.vehicleRented;
  const [preview, setPreview] = useState(false);
  const [reason, setReason] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState([]);

  const [breakdown] = useMutation(VEHICLE_BREAKDOWN);

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const vehicleBreakdownSchema = Yup.object().shape({
    description: Yup.string().required('Description required')
  });

  const formik = useFormik({
    initialValues: {
      vehicleType: ''
    },
    validationSchema: vehicleBreakdownSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        let postValues = {
          reason: reason,
          description: values.description
        };

        await UploadFileImages(files).then((uploadedFiles) => {
          postValues = {
            ...postValues,
            images: uploadedFiles
          };
        });

        await breakdown({ variables: { bookingID: booking.id, newBreakDown: postValues } });

        enqueueSnackbar('Vehicle breakdown sent successfully', {
          variant: 'success'
        });

        if (isMountedRef.current) {
          setSubmitting(false);
        }
        onClose();
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

  const reasons = [
    'Flat Tyre',
    'Clutch',
    'Overheating',
    'Steering issues',
    "Cut-off/engine won't start",
    'Brake or Handbrake problems',
    'Flat Battery',
    'Wrong Fuel',
    'Lights',
    'Lost Key',
    'Others'
  ];

  const reportOptions = (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack alignItems="flex-start" spacing={2} sx={{ flexGrow: 1, width: '560px' }}>
          <Paper
            sx={{
              py: 1,
              px: 1,
              minHeight: 120,
              width: '100%',
              mb: 5
            }}
          >
            <Card sx={{ bgcolor: 'grey.50012', boxShadow: 'none', mb: 3 }}>
              <CardContent>
                <Stack alignItems="center" direction="column" spacing={2} sx={{ width: '100%' }}>
                  <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%' }}>
                    <MAvatar
                      src={vehicle.images[0]?.url}
                      alt={vehicle.make}
                      sx={{
                        width: 72,
                        height: 72,
                        border: 'solid 3px black',
                        borderColor: (theme) => theme.palette.primary.main
                      }}
                    >
                      {createAvatar(vehicle.make).firstName}
                    </MAvatar>
                    <Stack alignItems="flex-start" justifyContent="space-between" spacing={0.5} sx={{ width: '100%' }}>
                      <Typography component="snap" variant="subtitle1" color="primary">
                        {vehicle.make} {vehicle.model}
                      </Typography>
                      <Typography component="snap" variant="body1">
                        Listing
                        <Typography component="snap" color="primary">
                          #343534
                        </Typography>
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
          <Typography component="snap" variant="subtitle1">
            What's the problem
          </Typography>
          <Typography component="snap" variant="body1">
            This will help us understand what happened before getting to you. You can also check out our warning lights
            manuals
          </Typography>
          <Masonry columns={3} spacing={1} sx={{ height: '100%', gridAutoRows: 'auto' }}>
            {reasons.map((r, index) => (
              <Chip
                key={index}
                label={r}
                variant={r !== reason ? 'outlined' : 'filled'}
                color={r === reason ? 'primary' : 'default'}
                onClick={() => setReason(r)}
              />
            ))}
          </Masonry>
          <Stack alignItems="center" sx={{ width: '100%' }}>
            <Button
              disabled={reason === ''}
              variant="contained"
              size="large"
              style={{ marginTop: 24, marginBottom: 8 }}
              sx={{ borderRadius: '100px', color: '#fff', maxWidth: '300px' }}
              onClick={() => setPreview(true)}
            >
              Submit Change Request
            </Button>
            <Stack direction="row" justifyContent="center">
              <FiberManualRecord fontSize="small" color="primary" />
              <FiberManualRecord fontSize="small" />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );

  const reportAddImages = (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack alignItems="flex-start" spacing={2} sx={{ flexGrow: 1, width: '560px' }}>
          <Paper
            sx={{
              py: 1,
              px: 1,
              minHeight: 120,
              width: '100%'
            }}
          >
            <Card sx={{ bgcolor: 'grey.50012', boxShadow: 'none', mb: 3 }}>
              <CardContent>
                <Stack alignItems="center" direction="column" spacing={2} sx={{ width: '100%' }}>
                  <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%' }}>
                    <MAvatar
                      src={vehicle.images[0]?.url}
                      alt={vehicle.make}
                      sx={{
                        width: 72,
                        height: 72,
                        border: 'solid 3px black',
                        borderColor: (theme) => theme.palette.primary.main
                      }}
                    >
                      {createAvatar(vehicle.make).firstName}
                    </MAvatar>
                    <Stack alignItems="flex-start" justifyContent="space-between" spacing={0.5} sx={{ width: '100%' }}>
                      <Typography component="snap" variant="subtitle1" color="primary">
                        {vehicle.make} {vehicle.model}
                      </Typography>
                      <Typography component="snap" variant="body1">
                        Listing
                        <Typography component="snap" color="primary">
                          #343534
                        </Typography>
                      </Typography>
                    </Stack>
                  </Stack>
                  <TextField
                    label="Additional Details"
                    fullWidth
                    multiline
                    rows={3}
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <UploadImages files={files} setFiles={setFiles} />
                  <Stack alignItems="center" sx={{ width: '100%' }}>
                    <LoadingButton
                      variant="contained"
                      size="large"
                      type="submit"
                      loading={isSubmitting}
                      sx={{ width: '240px', borderRadius: '100px', color: '#fff', maxWidth: '300px', mt: 3, mb: 1 }}
                    >
                      Submit
                    </LoadingButton>
                    <Stack direction="row" justifyContent="center">
                      <FiberManualRecord fontSize="small" />
                      <FiberManualRecord fontSize="small" color="primary" />
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Paper>
        </Stack>
      </Box>
    </>
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {preview ? reportAddImages : reportOptions}
        </Form>
      </FormikProvider>
    </>
  );
}

export default ReportBreakdown;
