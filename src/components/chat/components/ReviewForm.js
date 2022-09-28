import React, { useState } from 'react';
import { Box, createTheme, Divider, Rating, Stack, TextField, Typography } from '@mui/material';
import MessageAvatar from './MessageAvatar';
import { useMutation, useSubscription } from '@apollo/client';
import { BOOKING_REVIEW, BOOKING_REVIEWS_SUBSCRIPTION } from '../../../graphql/Queries';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 460,
  width: 380,
  padding: theme.spacing(2),
  marginTop: 0,
  borderRadius: theme.shape.borderRadius,
  color: 'grey.800',
  bgcolor: 'primary.lighter'
}));

// ----------------------------------------------------------------------

function ReviewForm({ booking, user }) {
  const [sendReview] = useMutation(BOOKING_REVIEW);

  const isLender = booking.lender.id === user.id;

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const [communication, setCommunication] = useState(0);
  const [vehicle, setVehicle] = useState(0);
  const [experience, setExperience] = useState(0);

  const [data, setData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const { loading } = useSubscription(BOOKING_REVIEWS_SUBSCRIPTION, {
    variables: { id: booking?.id },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setData(data?.GetBookingReviews);
    }
  });

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
        const postValues = {
          communicationRating: communication,
          vehicleRating: vehicle,
          experienceRating: experience,
          comment: values.description,
          postedAt: Date()
        };

        await sendReview({ variables: { bookingID: booking.id, review: postValues } });

        enqueueSnackbar('Booking review sent successfully', {
          variant: 'success'
        });

        setSubmitted(true);

        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

  if (submitted) return <></>;

  if (loading) return <></>;

  const checkReview = () => {
    let b = false;
    if (data)
      data?.map((r) => {
        if (r.user?.id === user.id) {
          b = true;
        }
      });
    return b;
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {!checkReview() && (
          <>
            <RootStyle>
              <Box sx={{ display: 'flex', ml: 'auto' }}>
                <div>
                  <ContentStyle sx={{ color: 'grey.800', bgcolor: 'primary.lighter' }}>
                    <Stack spacing={2}>
                      <Stack>
                        <Typography component="snap" variant="body2" color="primary">
                          The {isLender ? 'guest' : 'host'} has submitted his review for your services, fill up the
                          following form:
                        </Typography>
                      </Stack>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography component="snap" variant="body2">
                          {isLender ? 'Host' : 'Guest'} Communication?{' '}
                        </Typography>
                        <Rating
                          name="half-rating"
                          value={communication}
                          onChange={(e) => setCommunication(e.target.value)}
                          precision={0.5}
                          size="small"
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography component="snap" variant="body2">
                          Vehicle {isLender ? 'Quality' : 'Condition'}{' '}
                        </Typography>
                        <Rating
                          name="half-rating"
                          value={vehicle}
                          onChange={(e) => setVehicle(e.target.value)}
                          precision={0.5}
                          size="small"
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography component="snap" variant="body2">
                          Overall Experience?{' '}
                        </Typography>
                        <Rating
                          name="half-rating"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          precision={0.5}
                          size="small"
                        />
                      </Stack>
                      <ThemeProvider theme={themeLight}>
                        <TextField
                          label="Additional comments"
                          fullWidth
                          multiline
                          rows={3}
                          style={{ color: '#212B36' }}
                          {...getFieldProps('description')}
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      </ThemeProvider>
                      <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <LoadingButton
                          loading={isSubmitting}
                          type="submit"
                          variant="contained"
                          size="small"
                          sx={{ borderRadius: '100px', color: '#fff', px: 2 }}
                        >
                          Submit Review
                        </LoadingButton>
                      </Stack>
                    </Stack>
                  </ContentStyle>
                </div>
                <MessageAvatar user={user} sx={{ width: 32, height: 32, m: 1 }} />
              </Box>
            </RootStyle>
          </>
        )}
      </Form>
    </FormikProvider>
  );
}

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      lighter: '#FEF4D4',
      light: '#f67810',
      main: '#f67810',
      dark: '#f67810',
      darker: '#5c2c00'
    }
  }
});

export default ReviewForm;
