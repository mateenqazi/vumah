import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, ListItemText, ListItemAvatar, ListItemButton, Typography } from '@mui/material';
//
import BadgeStatus from '../BadgeStatus';
import useAuth from '../../hooks/useAuth';
import MessageAvatar from '../chat/components/MessageAvatar';
import React from 'react';
import { getLastSeen } from '../../utils/TimeCalc';

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

ChatConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  isOpenSidebar: PropTypes.bool,
  onSelectConversation: PropTypes.func
};

export default function ChatConversationItem({ isSelected, conversation, getUnread, onSelectConversation }) {
  const { user } = useAuth();

  const findParticipant = () => {
    if (user.id !== conversation.owner1.id) return conversation.owner1;
    if (user.id !== conversation.owner2.id) return conversation.owner2;

    return {};
  };

  const participant = findParticipant();

  return (
    <RootStyle
      onClick={onSelectConversation}
      sx={{
        ...(isSelected && { bgcolor: 'vumah.selected' })
      }}
    >
      <ListItemAvatar>
        <Box>
          <AvatarWrapperStyle className="avatarWrapper">
            <MessageAvatar
              user={participant}
              sx={{
                border: 'solid 3px black',
                borderColor: (theme) => theme.palette.primary.main
              }}
            />
            {getUnread(conversation?.id) > 0 && (
              <BadgeStatus status="unread" size="large">
                <Typography variant="caption">{getUnread(conversation?.id)}</Typography>
              </BadgeStatus>
            )}
          </AvatarWrapperStyle>
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={participant.firstName + ' ' + participant.lastName}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'subtitle2'
        }}
        secondary={getLastSeen(new Date(Number(participant.lastSeen)))}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body2',
          color: 'textSecondary'
        }}
      />
    </RootStyle>
  );
}
