import PropTypes from 'prop-types';
import React, { useState } from 'react';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { Close, Delete, Edit, MoreVert } from '@mui/icons-material';
import AddVehicle from './AddVehicle.js';
import useDroidDialog from '../../hooks/useDroidDialog';
import { useMutation } from '@apollo/client';
import { DELETE_STAFF_MEMBER, DELETE_VEHICLE, REGISTER_VEHICLE } from '../../graphql/Queries';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

export default function VehicleMoreMenu({ vehicle, onDelete, getVehicles }) {
  const { onOpen } = useDroidDialog();
  const [open, setOpen] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const [deleteVehicle, { loading }] = useMutation(DELETE_VEHICLE, {
    variables: { vehicleId: vehicle?.id }
  });

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 }
        }}
      >
        <MenuItem
          onClick={() => {
            deleteVehicle()
              .then(async () => {
                await getVehicles();
                enqueueSnackbar('Vehicle deleted successfully', { variant: 'success' });
                handleClose();
              })
              .catch(async (e) => {
                enqueueSnackbar('Vehicle failed to delete', { variant: 'error' });
                await getVehicles();
                handleClose();
                console.log(e);
              });
          }}
          sx={{ color: 'error.main' }}
        >
          <Delete sx={{ ...ICON }} />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() =>
            onOpen(
              'Edit Vehicle',
              <AddVehicle vehicle={vehicle} isEdit={!vehicle?.isDraft} getVehicles={getVehicles} />,
              true
            )
          }
        >
          <Edit sx={{ ...ICON }} />
          Edit
        </MenuItem>
      </MenuPopover>
    </>
  );
}
