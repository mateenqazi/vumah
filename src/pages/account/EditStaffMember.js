import React, { useState } from 'react';
import { Alert, Box, Button, Paper, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import Scrollbar from '../../components/Scrollbar';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../../components/@material-extend';
import PermissionsTable from './PermissionsTable';
import { useMutation } from '@apollo/client';
import { EDIT_STAFF_MEMBER } from '../../graphql/Queries';
import { LoadingButton } from '@mui/lab';
import useDroidDialog from '../../hooks/useDroidDialog';

function EditStaffMember({ staffMember, getMembers }) {
  const { onClose } = useDroidDialog();
  const { enqueueSnackbar } = useSnackbar();

  const [permissions, setPermissions] = useState({});

  const [EditStaff, { loading }] = useMutation(EDIT_STAFF_MEMBER, {
    variables: { id: staffMember?.id, companyRoleGroup: permissions }
  });

  const handleSaveStaffMember = () => {
    if (permissions !== {}) {
      EditStaff()
        .then((res) => {
          enqueueSnackbar('Staff member edited successfully', {
            variant: 'success'
          });
          onClose();
          getMembers();
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar('Staff member failed to edit successfully', {
            variant: 'error'
          });
        });
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack spacing={1} sx={{ flexGrow: 1, width: '700px' }}>
          <>
            <Scrollbar sx={{ p: 1, height: '460px' }}>
              <Paper
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, pb: 1, minHeight: 300 }}
              >
                <Stack spacing={3} sx={{ width: '100%' }}>
                  <PermissionsTable setPermissions={setPermissions} permissions={permissions} />
                </Stack>
              </Paper>
            </Scrollbar>

            <Stack alignItems="center">
              <LoadingButton
                onClick={handleSaveStaffMember}
                variant="contained"
                loading={loading}
                sx={{ width: '200px', mr: 1 }}
              >
                Save Staff Member
              </LoadingButton>
            </Stack>
          </>
        </Stack>
      </Box>
    </>
  );
}

export default EditStaffMember;
