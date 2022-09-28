import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper,
  StepLabel,
  Typography,
  StepConnector,
  stepConnectorClasses,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  MenuItem,
  FormLabel,
  Grid,
  Stack,
  Alert,
  TextField,
  FormHelperText,
  Select,
  InputLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import { BusinessCenter, Close, Person, Check, Visibility, VisibilityOff } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { MIconButton } from '../../components/@material-extend';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import countries from './countries';
import CompanyCheck from '../../redux/services/CompanyCheck';
import Scrollbar from '../../components/Scrollbar';
import { SIGNUP } from '../../graphql/Queries';
import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { motion } from 'framer-motion';
import { varBounceIn, varFadeInDown } from '../../components/animate';
import { MailIllustration } from '../../assets';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

//href="https://mail.google.com/mail/u/kanyeallan@gmail.com/#search/from:support@stripe.com"

const STEPS = ['Account Type', 'Account Details', 'Set up Location'];
const STEPS_BUSINESS = ['Account Details', 'Set up Location'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.palette.divider
  }
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  height: 22,
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.disabled,
  ...(ownerState.active && {
    color: theme.palette.success.main
  }),
  '& .QontoStepIcon-completedIcon': {
    zIndex: 1,
    fontSize: 18,
    color: theme.palette.success.main
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}));

function QontoStepIcon({ active, completed }) {
  return (
    <QontoStepIconRoot ownerState={{ active }}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

export default function RegisterForm() {
  const isMountedRef = useIsMountedRef();
  const { pathname } = useLocation();

  const isBusinessValue = pathname === '/landing-page';

  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isBusiness, setIsBusiness] = useState(isBusinessValue);
  const [confirmEmail, setConfirmEmail] = useState({ value: '', touched: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', touched: false });

  useEffect(() => {
    console.log('Is Business Value: ', isBusinessValue, isBusiness);
    setIsBusiness(isBusinessValue);
  }, [isBusinessValue]);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    address: Yup.string().required('Address required'),
    address2: Yup.string(),
    city: Yup.string().required('City required'),
    country: Yup.string().required('Country required'),
    postalCode: Yup.string().required('Post Code required'),
    birthDay: Yup.string()
      .test('error message', (value) => {
        return moment().diff(moment(value), 'years') >= 18;
      })
      .required('Date of Birth required'),
    businessName: isBusiness ? Yup.string().required('Business name required') : Yup.string(),
    phoneNumber: Yup.string().required('Phone Number required').min(9, 'Too Short!'),
    gender: Yup.string().required('Gender required'),
    title: Yup.string().required('Title required'),
    isBusiness: Yup.string().required('Account Type required')
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      address2: '',
      city: '',
      country: '',
      postalCode: '',
      birthDay: '',
      businessName: '',
      phoneNumber: '',
      gender: '',
      title: '',
      isBusiness: isBusiness,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await CreateUser()
          .then((res) => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

            enqueueSnackbar('Register success', {
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
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, values, setValues, isSubmitting, handleSubmit, getFieldProps } = formik;

  const [CreateUser] = useMutation(SIGNUP, {
    variables: { user: values }
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const selectAccountType = (
    <>
      <FormControl sx={{ m: 3 }} component="fieldset" error={errors.isBusiness} variant="standard">
        <FormLabel
          component="legend"
          sx={{
            margin: '0',
            fontWeight: '700',
            lineHeight: '1.5',
            fontSize: '1.25rem',
            fontFamily: 'Public Sans,sans-serif',
            textAlign: 'center'
          }}
        >
          Choose Account Type
        </FormLabel>
        <RadioGroup aria-label="Account Type" {...getFieldProps('isBusiness')}>
          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <Paper sx={{ display: 'flex', alignItems: 'center', p: 2, my: 1 }}>
                <FormControlLabel value={true} control={<Radio />} label="" sx={{ mb: 0, mr: 0 }} />
                <BusinessCenter sx={{ width: '30px', height: '30px' }} />
                <Typography textAlign="center" style={{ margin: 8, color: 'text.primary' }}>
                  Business
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ display: 'flex', alignItems: 'center', p: 2, my: 1 }}>
                <FormControlLabel value={false} control={<Radio />} label="" sx={{ mb: 0, mr: 0 }} />
                <Person sx={{ width: '30px', height: '30px' }} />
                <Typography textAlign="center" style={{ margin: 8, color: 'text.primary' }}>
                  Personal
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>
        <FormHelperText>{touched.isBusiness && errors.isBusiness}</FormHelperText>
      </FormControl>
    </>
  );

  const handleNextAccountType = () => {
    setIsBusiness(values.isBusiness);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const accountTypeAction = (
    <>
      <Button disabled sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleNextAccountType} sx={{ mr: 1 }}>
        Next
      </Button>
    </>
  );

  const getBoolean = (touch, value, error) => {
    return Boolean(Boolean(touch || value.length > 0) && error === undefined);
  };

  const getBooleanNotEmpty = (touch, value, error) => {
    return Boolean(Boolean(touch && value.length > 0) && error === undefined);
  };

  const setUpAccountDetails = (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          fullWidth
          label="First Name"
          {...getFieldProps('firstName')}
          error={Boolean(touched.firstName && errors.firstName)}
          helperText={touched.firstName && errors.firstName}
          focused={getBoolean(touched.firstName, values.firstName, errors.firstName)}
          color={getBoolean(touched.firstName, values.firstName, errors.firstName) ? 'success' : 'primary'}
        />

        <TextField
          fullWidth
          label="Last Name"
          {...getFieldProps('lastName')}
          error={Boolean(touched.lastName && errors.lastName)}
          helperText={touched.lastName && errors.lastName}
          focused={getBoolean(touched.lastName, values.lastName, errors.lastName)}
          color={getBoolean(touched.lastName, values.lastName, errors.lastName) && 'success'}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FormControl
          fullWidth
          error={Boolean(touched.title && errors.title)}
          helperText={touched.title && errors.title}
          focused={getBoolean(touched.title, values.title, errors.title)}
          color={getBoolean(touched.title, values.title, errors.title) && 'success'}
        >
          <InputLabel id="demo-simple-select-label">Title</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Title" {...getFieldProps('title')}>
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
            <MenuItem value="Ms">Ms</MenuItem>
            <MenuItem value="Others">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          error={Boolean(touched.gender && errors.gender)}
          helperText={touched.gender && errors.gender}
          focused={getBoolean(touched.gender, values.gender, errors.gender)}
          color={getBoolean(touched.gender, values.gender, errors.gender) && 'success'}
        >
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            {...getFieldProps('gender')}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Other</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Date of Birth"
            value={values.birthDay}
            maxDate={moment().subtract(18, 'years')}
            onChange={(event) => {
              setValues({ ...values, birthDay: event });
            }}
            onOpen={() => {
              if (values.birthDay === '') setValues({ ...values, birthDay: moment().subtract(18, 'years') });
            }}
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  fullWidth
                  {...params}
                  error={Boolean(touched.birthDay && errors.birthDay)}
                  helperText={Boolean(touched.birthDay && errors.birthDa) && 'Date of birth is invalid'}
                  focused={getBoolean(touched.birthDay, values.birthDay, errors.birthDay)}
                  color={getBoolean(touched.birthDay, values.birthDay, errors.birthDay) && 'success'}
                />
              );
            }}
          />
        </LocalizationProvider>

        <TextField
          fullWidth
          autoComplete="phoneNumber"
          type="text"
          label={isBusiness ? 'Business Phone No.' : 'Personal Phone No.'}
          {...getFieldProps('phoneNumber')}
          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
          helperText={touched.phoneNumber && errors.phoneNumber}
          focused={getBoolean(touched.phoneNumber, values.phoneNumber, errors.phoneNumber)}
          color={getBoolean(touched.phoneNumber, values.phoneNumber, errors.phoneNumber) && 'success'}
        />
      </Stack>

      {isBusiness ? '' : ''}

      {isBusiness ? (
        <>
          <TextField
            fullWidth
            autoComplete="businessName"
            type="text"
            label="Business Name (As stated in Company House)"
            {...getFieldProps('businessName')}
            error={Boolean(touched.businessName && errors.businessName)}
            helperText={touched.businessName && errors.businessName}
            focused={getBoolean(touched.businessName, values.businessName, errors.businessName)}
            color={getBoolean(touched.businessName, values.businessName, errors.businessName) && 'success'}
          />
        </>
      ) : (
        <></>
      )}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          fullWidth
          type="email"
          label={isBusiness ? 'Business Email' : 'Email Address'}
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          focused={getBoolean(touched.email, values.email, errors.email)}
          color={getBoolean(touched.email, values.email, errors.email) && 'success'}
        />

        <TextField
          fullWidth
          autoComplete="confirm-emails"
          type="email"
          label={isBusiness ? 'Confirm Business Email' : 'Confirm Email Address'}
          value={confirmEmail.value}
          onChange={(event) => {
            setConfirmEmail({
              value: event.target.value,
              touched: true
            });
          }}
          error={Boolean(
            confirmEmail.value !== values.email && Boolean(confirmEmail.value !== '' || confirmEmail.touched)
          )}
          helperText={
            Boolean(
              confirmEmail.value !== values.email && Boolean(confirmEmail.value !== '' || confirmEmail.touched)
            ) && "Emails don't match"
          }
          focused={Boolean(
            confirmEmail.value === values.email && Boolean(confirmEmail.value !== '' || confirmEmail.touched)
          )}
          color={
            Boolean(
              confirmEmail.value === values.email && Boolean(confirmEmail.value !== '' || confirmEmail.touched)
            ) && 'success'
          }
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
          focused={getBoolean(touched.password, values.password, errors.password)}
          color={getBoolean(touched.password, values.password, errors.password) && 'success'}
        />

        <TextField
          fullWidth
          autoComplete="confirm-password"
          type={showPassword ? 'text' : 'password'}
          label="Confirm Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          value={confirmPassword.value}
          onChange={(event) => {
            setConfirmPassword({
              value: event.target.value,
              touched: true
            });
          }}
          error={Boolean(
            confirmPassword.value !== values.password &&
              Boolean(confirmPassword.value !== '' || confirmPassword.touched)
          )}
          helperText={
            Boolean(
              confirmPassword.value !== values.password &&
                Boolean(confirmPassword.value !== '' || confirmPassword.touched)
            ) && "Passwords don't match"
          }
          focused={Boolean(
            confirmPassword.value === values.password &&
              Boolean(confirmPassword.value !== '' || confirmPassword.touched)
          )}
          color={
            Boolean(
              confirmPassword.value === values.password &&
                Boolean(confirmPassword.value !== '' || confirmPassword.touched)
            ) && 'success'
          }
        />
      </Stack>
    </>
  );

  const handleNextAccountDetails = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const accountSetUpAction = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleNextAccountDetails} sx={{ mr: 1 }}>
        Next
      </Button>
    </>
  );

  const setUpAccountLocation = (
    <>
      <TextField
        fullWidth
        autoComplete="address"
        type="text"
        label={isBusiness ? 'Business St. address 1' : 'Street address 1'}
        {...getFieldProps('address')}
        error={Boolean(touched.address && errors.address)}
        helperText={touched.address && errors.address}
        focused={getBoolean(touched.address, values.address, errors.address)}
        color={getBoolean(touched.address, values.address, errors.address) && 'success'}
      />

      <TextField
        fullWidth
        autoComplete="address2"
        type="text"
        label={isBusiness ? 'Business St. address 2' : 'Street address 2'}
        {...getFieldProps('address2')}
        error={Boolean(touched.address2 && errors.address2)}
        helperText={touched.address2 && errors.address2}
        focused={getBooleanNotEmpty(touched.address2, values.address2, errors.address2)}
        color={getBooleanNotEmpty(touched.address2, values.address2, errors.address2) && 'success'}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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

        <TextField
          fullWidth
          autoComplete="city"
          type="text"
          label="City"
          {...getFieldProps('city')}
          error={Boolean(touched.city && errors.city)}
          helperText={touched.city && errors.city}
          focused={getBoolean(touched.city, values.city, errors.city)}
          color={getBoolean(touched.city, values.city, errors.city) && 'success'}
        />
      </Stack>

      <TextField
        fullWidth
        autoComplete="postalCode"
        type="text"
        label="Post Code"
        {...getFieldProps('postalCode')}
        error={Boolean(touched.postalCode && errors.postalCode)}
        helperText={touched.postalCode && errors.postalCode}
        focused={getBoolean(touched.postalCode, values.postalCode, errors.postalCode)}
        color={getBoolean(touched.postalCode, values.postalCode, errors.postalCode) && 'success'}
      />
    </>
  );

  const accountLocationAction = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ mr: 1 }}>
        Register
      </LoadingButton>
    </>
  );

  const SignUp = <>SignUp</>;

  function getStepContentBusiness(step) {
    switch (step) {
      case 0:
        return setUpAccountDetails;
      case 1:
        return setUpAccountLocation;
      default:
        return SignUp;
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return selectAccountType;
      case 1:
        return setUpAccountDetails;
      case 2:
        return setUpAccountLocation;
      default:
        return SignUp;
    }
  }

  function getStepActionsBusiness(step) {
    switch (step) {
      case 0:
        return accountSetUpAction;
      case 1:
        return accountLocationAction;
      default:
        return SignUp;
    }
  }

  function getStepActions(step) {
    switch (step) {
      case 0:
        return accountTypeAction;
      case 1:
        return accountSetUpAction;
      case 2:
        return accountLocationAction;
      default:
        return SignUp;
    }
  }

  const getActions = (step) => {
    if (isBusinessValue) return getStepActionsBusiness(step);
    return getStepActions(step);
  };

  const getContent = (step) => {
    if (isBusinessValue) return getStepContentBusiness(step);
    return getStepContent(step);
  };

  const getSteps = () => {
    if (isBusinessValue) return STEPS_BUSINESS;
    return STEPS;
  };

  return (
    <>
      {/* <Typography component="snap" variant='h4' textAlign='center' sx={{ my: 5 }}>Sign Up your account</Typography>*/}

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={2} sx={{ flexGrow: 1, width: '550px' }}>
              {activeStep === getSteps().length ? (
                <>
                  <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                    {getSteps().map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Box sx={{ mb: 1 }} />

                  <Stack direction="column" spacing={2}>
                    <Paper
                      sx={{
                        p: 3,
                        my: 3,
                        minHeight: 120,
                        bgcolor: 'grey.50012'
                      }}
                    >
                      <Stack spacing={3} sx={{ px: 4, justifyContent: 'center', textAlign: 'center' }}>
                        <Alert severity="success">Email Sent</Alert>

                        <motion.div variants={varBounceIn}>
                          <MailIllustration sx={{ height: 100, my: { xs: 1, sm: 1 } }} />
                        </motion.div>

                        <motion.div variants={varFadeInDown}>
                          <Stack spacing={2} sx={{ p: 1 }}>
                            <Typography component="snap" variant="subtitle1" sx={{ color: 'text.primary' }}>
                              Welcome to the Vumah Community!
                            </Typography>
                            <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                              We have sent you a confirmation email with the steps required to verify your account.
                            </Typography>
                          </Stack>
                        </motion.div>

                        {/*<motion.div variants={varBounceIn}>*/}
                        {/*  <Button size="large" variant="contained" sx={{ m: 1 }}>*/}
                        {/*    Check your email*/}
                        {/*  </Button>*/}
                        {/*</motion.div>*/}
                      </Stack>
                    </Paper>

                    <Button color="inherit" onClick={handleReset} sx={{ mr: 1 }}>
                      Close
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Scrollbar sx={{ p: 1, height: '72vh', maxHeight: '574px' }}>
                    {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                      {getSteps().map((label) => (
                        <Step key={label}>
                          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    <Box sx={{ mb: 3 }} />

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
                      <Stack spacing={2} sx={{ width: '100%' }}>
                        {getContent(activeStep)}
                      </Stack>
                    </Paper>
                  </Scrollbar>

                  <Box sx={{ textAlign: 'right', display: 'flex' }}>{getActions(activeStep)}</Box>
                </>
              )}
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
}
