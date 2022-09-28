import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Scrollbar from '../../components/Scrollbar';
import { useSnackbar } from 'notistack';
import createAvatar from '../../utils/createAvatar';
import { MAvatar, MIconButton } from '../../components/@material-extend';
import PermissionsTable from './PermissionsTable';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_STAFF_MEMBER, GET_USER_BY_EMAIL } from '../../graphql/Queries';
import { LoadingButton } from '@mui/lab';

const STEPS = ['User Email', 'User details', 'User Permissions'];

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

function AddStaffMemberNew({ getMembers }) {
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const [loadingStatus, setLoadingStatus] = useState({ show: false, status: 'warning', message: 'message' });

  const [permissions, setPermissions] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const image = '/static/mock-images/avatars/avatar_default.jpg';

  const [CreateStaff] = useMutation(CREATE_STAFF_MEMBER, {
    variables: { userName: user.userName, companyRoleGroup: permissions }
  });

  const [GetUserByEmail, { loading }] = useLazyQuery(GET_USER_BY_EMAIL, {
    variables: { email: email }
  });

  const handleEmailCheck = () => {
    GetUserByEmail()
      .then((res) => {
        if (res.data) {
          setUser(res.data.GetUserByEmail);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if (res.error) {
          setLoadingStatus({ show: true, status: 'error', message: res.error.message });
        }
      })
      .catch((e) => {
        setLoadingStatus({ show: true, status: 'error', message: e.message });
      });
  };

  const userEmailCheck = (
    <>
      <Typography component="snap" variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Enter Email for a valid user
      </Typography>

      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setLoadingStatus({ ...loadingStatus, show: false });
        }}
      />
    </>
  );

  const userEmailCheckActions = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <LoadingButton onClick={handleEmailCheck} variant="contained" loading={loading} sx={{ mr: 1 }}>
        Check User
      </LoadingButton>
    </>
  );

  const userDetails = (
    <>
      <Paper sx={{ display: 'flex', justifyContent: 'center', py: 6, px: 4, minHeight: 200, bgcolor: 'grey.50012' }}>
        <Stack spacing={4} sx={{ width: '100%' }}>
          <MAvatar
            src={user?.avatarUrl}
            alt={user?.firstName}
            color={user?.avatarUrl ? 'default' : createAvatar(user?.firstName).color}
            sx={{ mx: 'auto', mb: 2, height: 100, width: 100, fontSize: '40px' }}
          >
            {createAvatar('Allan Kanye').name}
          </MAvatar>

          <TextField fullWidth label="Email" value={user?.email} />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth type="text" label="First Name" value={user?.firstName} />

            <TextField fullWidth type="text" label="Last Name" value={user?.lastName} />
          </Stack>
        </Stack>
      </Paper>
    </>
  );

  const userDetailsActions = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
        Next
      </Button>
    </>
  );

  const handleSaveStaffMember = () => {
    if (permissions !== {}) {
      CreateStaff()
        .then((res) => {
          enqueueSnackbar('Staff member added successfully', {
            variant: 'success'
          });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          getMembers();
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar('Staff member failed to be added', {
            variant: 'error'
          });
        });
    }
  };

  const userPermissions = (
    <>
      <PermissionsTable setPermissions={setPermissions} permissions={permissions} />
    </>
  );

  const userPermissionsActions = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <LoadingButton onClick={handleSaveStaffMember} variant="contained" loading={loading} sx={{ mr: 1 }}>
        Save Staff Member
      </LoadingButton>
    </>
  );

  function getStepContent(step) {
    switch (step) {
      case 0:
        return userEmailCheck;
      case 1:
        return userDetails;
      case 2:
        return userPermissions;
      default:
        return userEmailCheck;
    }
  }

  function getStepActions(step) {
    switch (step) {
      case 0:
        return userEmailCheckActions;
      case 1:
        return userDetailsActions;
      case 2:
        return userPermissionsActions;
      default:
        return userEmailCheckActions;
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack spacing={1} sx={{ flexGrow: 1, width: '700px' }}>
          {loadingStatus.show && <Alert severity={loadingStatus.status}>{loadingStatus.message}</Alert>}

          {activeStep === STEPS.length ? (
            <>
              <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Paper
                sx={{
                  py: 3,
                  px: 1,
                  my: 3,
                  minHeight: 120,
                  bgcolor: 'grey.50012'
                }}
              >
                <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
              </Paper>

              <Button color="inherit" onClick={handleReset} sx={{ mr: 1 }}>
                Reset
              </Button>
            </>
          ) : (
            <>
              <Scrollbar sx={{ p: 1, height: loadingStatus.show ? '460px' : '510px' }}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                  {STEPS.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, minHeight: 300 }}>
                  <Stack spacing={3} sx={{ width: '100%' }}>
                    {getStepContent(activeStep)}
                  </Stack>
                </Paper>
              </Scrollbar>

              <Box sx={{ textAlign: 'right', display: 'flex' }}>{getStepActions(activeStep)}</Box>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default AddStaffMemberNew;
