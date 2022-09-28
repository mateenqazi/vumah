import React from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import MessageAvatar from './MessageAvatar';
import { getLastSeen } from "../../../utils/TimeCalc";

// ----------------------------------------------------------------------
const AVATAR_SIZE = '50px';

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  maxHeight: '80px',
  width: '380px',
  padding: theme.spacing(0.5, 2),
  transition: theme.transitions.create('all')
}));

const AvatarWrapperStyle = styled('div')({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar-img': { borderRadius: '50%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' }
});

const BadgeStatus = styled('span')(({ theme }) => {
  return {
    width: 18,
    height: 18,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    '&:before': { width: 6, height: 2 }
  };
});

// ----------------------------------------------------------------------

function ConversationItem({ isSelected, user, unRead }) {
  const { photoURL, name, lastSeen } = user;



  return (
    <RootStyle
      sx={{
        ...(isSelected && { bgcolor: 'vumah.selected' })
      }}
    >
      <ListItemAvatar>
        <Box>
          <AvatarWrapperStyle className="avatarWrapper">
            <MessageAvatar
              user={user}
              sx={{
                border: 'solid 2px black',
                borderColor: (theme) => theme.palette.primary.main
              }}
            />
            {unRead && <BadgeStatus sx={{ right: -2, top: -5, position: 'absolute' }}>{unRead}</BadgeStatus>}
          </AvatarWrapperStyle>
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'subtitle2'
        }}
        secondary={getLastSeen(lastSeen)}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body2',
          color: 'textSecondary'
        }}
      />
    </RootStyle>
  );
}

export default ConversationItem;
