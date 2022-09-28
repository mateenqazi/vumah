import React from 'react';
import { IconButton, Menu, MenuItem, TableCell } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import EditStaffMember from './EditStaffMember';
import DeleteStaffMember from './DeleteStaffMember';
import useDroidDialog from '../../hooks/useDroidDialog';

function StaffMembersTableMore({ row, getMembers }) {
  const { onOpen } = useDroidDialog();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch'
          }
        }}
      >
        <MenuItem
          selected={true}
          onClick={() => {
            handleClose();
            onOpen('Edit Staff Member', <EditStaffMember staffMember={row} getMembers={getMembers} />);
          }}
        >
          Edit Permissions
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onOpen('Delete Staff Member', <DeleteStaffMember staffMember={row} getMembers={getMembers} />);
          }}
        >
          Delete Member
        </MenuItem>
      </Menu>
    </>
  );
}

export default StaffMembersTableMore;
