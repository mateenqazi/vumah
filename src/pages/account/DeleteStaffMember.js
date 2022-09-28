import React, { useState } from 'react';
import { Alert, Box, Button, Paper, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Scrollbar from '../../components/Scrollbar';
import { useSnackbar } from 'notistack';
import createAvatar from '../../utils/createAvatar';
import { MAvatar, MIconButton } from '../../components/@material-extend';
import PermissionsTable from './PermissionsTable';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_STAFF_MEMBER, DELETE_STAFF_MEMBER, GET_USER_BY_EMAIL } from '../../graphql/Queries';
import { LoadingButton } from '@mui/lab';
import useDroidDialog from '../../hooks/useDroidDialog';

function DeleteStaffMember({ staffMember, getMembers }) {
  const { enqueueSnackbar } = useSnackbar();
  const { onClose } = useDroidDialog();

  const [CreateStaff, { loading }] = useMutation(DELETE_STAFF_MEMBER, {
    variables: { id: staffMember?.id }
  });

  const handleDeleteStaffMember = () => {
    CreateStaff()
      .then((res) => {
        enqueueSnackbar('Staff member delete successfully', {
          variant: 'success'
        });
        onClose();
        getMembers();
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Staff member failed to delete successfully', {
          variant: 'error'
        });
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack spacing={1} sx={{ flexGrow: 1, width: '700px' }}>
          <>
            <Scrollbar sx={{ p: 1, height: '460px' }}>
              <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, minHeight: 300 }}>
                <Stack spacing={3} sx={{ width: '100%' }}>
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
                    <Stack spacing={4} sx={{ width: '100%' }}>
                      <MAvatar
                        src={staffMember?.user?.avatarUrl}
                        alt={staffMember?.user?.firstName}
                        color={
                          staffMember?.user?.avatarUrl ? 'default' : createAvatar(staffMember?.user?.firstName).color
                        }
                        sx={{ mx: 'auto', mb: 2, height: 100, width: 100, fontSize: '40px' }}
                      >
                        {createAvatar(staffMember?.user?.firstName).name}
                      </MAvatar>

                      <TextField fullWidth label="Email" value={staffMember?.user?.email} />

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField fullWidth type="text" label="First Name" value={staffMember?.user?.firstName} />

                        <TextField fullWidth type="text" label="Last Name" value={staffMember?.user?.lastName} />
                      </Stack>
                    </Stack>
                  </Paper>
                </Stack>
              </Paper>
            </Scrollbar>

            <Stack alignItems="center">
              <LoadingButton
                onClick={handleDeleteStaffMember}
                variant="contained"
                loading={loading}
                sx={{ width: '200px', mr: 1 }}
              >
                Delete Staff Member
              </LoadingButton>
            </Stack>
          </>
        </Stack>
      </Box>
    </>
  );
}

export default DeleteStaffMember;
