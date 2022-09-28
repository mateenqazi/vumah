import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, ListItemText, ListItemAvatar, ListItemButton, Typography } from '@mui/material';
//
import BadgeStatus from '../BadgeStatus';
import React from 'react';
import createAvatar from '../../utils/createAvatar';
import { MAvatar } from '../@material-extend';
import useWebNotifications from '../../hooks/useWebNotifications';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  marginBottom: '3px',
  transition: theme.transitions.create('all')
}));

const AvatarWrapperStyle = styled('div')({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar-img': { borderRadius: '50%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' }
});

ChatVehicleItem.propTypes = {
  isSelected: PropTypes.bool,
  vehicle: PropTypes.object.isRequired,
  isOpenSidebar: PropTypes.bool,
  onSelectVehicle: PropTypes.func
};

export default function ChatVehicleItem({ isSelected, vehicle, onSelectVehicle }) {
  const { notifications } = useWebNotifications();

  const getUnread = () => {
    return notifications?.filter(
      (n) => !n.isRead && n?.notificationType === 'MESSAGE' && n?.contactItemID === vehicle?.id
    )?.length;
  };

  return (
    <RootStyle
      onClick={onSelectVehicle}
      sx={{
        ...(isSelected && { bgcolor: 'vumah.selected' })
      }}
    >
      <ListItemAvatar>
        <Box>
          <AvatarWrapperStyle className="avatarWrapper">
            <MAvatar
              src={vehicle.images[0]?.url}
              alt={vehicle.make}
              sx={{
                width: 48,
                height: 48,
                border: 'solid 2px black',
                borderColor: (theme) => theme.palette.primary.main
              }}
            >
              {createAvatar(vehicle.make).firstName}
            </MAvatar>
            {getUnread() > 0 && (
              <BadgeStatus size="large" status="unread">
                <Typography variant="caption">{getUnread()}</Typography>
              </BadgeStatus>
            )}
          </AvatarWrapperStyle>
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={`${vehicle.make} - ( ${vehicle.reg} )`}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'subtitle2'
        }}
        secondary={`#${vehicle.id}`}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body2',
          color: 'textSecondary'
        }}
      />
    </RootStyle>
  );
}
