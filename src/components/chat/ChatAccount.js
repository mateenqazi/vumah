import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';
import { capitalCase } from 'change-case';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundPowerSettingsNew from '@iconify/icons-ic/round-power-settings-new';
// material
import {
  Box,
  List,
  Select,
  Divider,
  Popover,
  Tooltip,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
//
import MyAvatar from '../MyAvatar';
import BadgeStatus from '../BadgeStatus';
import MessageAvatar from './components/MessageAvatar';

// ----------------------------------------------------------------------

const STATUS = ['online', 'invisible', 'away'];

export default function ChatAccount() {
  const [show, setShow] = useState(false);

  useEffect(async () => {
    // await login("demo@gmail.com", "demo");
    setShow(true);
  }, []);

  const { user } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('online');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      {show && (
        <>
          <Box ref={anchorRef} sx={{ position: 'relative' }}>
            <MessageAvatar
              onClick={handleOpen}
              user={user}
              sx={{
                cursor: 'pointer',
                width: '70px',
                height: '70px',
                border: 'solid 4px black',
                borderColor: (theme) => `${theme.palette.primary.main}90`,
                '&:hover': {
                  borderWidth: '5px',
                  borderColor: (theme) => `${theme.palette.primary.main}`
                }
              }}
            />
          </Box>
        </>
      )}
    </>
  );
}
