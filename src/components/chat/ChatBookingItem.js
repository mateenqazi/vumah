import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
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

ChatBookingItem.propTypes = {
  isSelected: PropTypes.bool,
  booking: PropTypes.object.isRequired,
  isOpenSidebar: PropTypes.bool,
  onSelectBooking: PropTypes.func
};

export default function ChatBookingItem({ isSelected, booking, onSelectBooking }) {
  const { notifications } = useWebNotifications();

  const getUnread = () => {
    return notifications?.filter(
      (n) => !n.isRead && n?.notificationType === 'BOOKING' && n?.contactItemID === booking?.id
    )?.length;
  };

  const vehicle = booking.vehicleRented;

  return (
    <RootStyle
      onClick={onSelectBooking}
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
                width: 52,
                height: 52,
                border: 'solid 2px black',
                borderColor: (theme) => theme.palette.primary.main
              }}
            >
              {createAvatar(vehicle.make).firstName}
            </MAvatar>
            {getUnread() > 0 && (
              <BadgeStatus status="unread" size="large">
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
          variant: 'body1'
        }}
        secondary={`#${booking?.id}`}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body2',
          color: 'textSecondary'
        }}
      />
    </RootStyle>
  );
}
