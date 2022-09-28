import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Container, List, Typography } from '@mui/material';
//
import ChatConversationItem from './ChatConversationItem';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../animate';
import React from 'react';
import useWebNotifications from '../../hooks/useWebNotifications';

// ----------------------------------------------------------------------

ChatConversationList.propTypes = {
  conversations: PropTypes.array,
  allSelected: PropTypes.bool,
  isOpenSidebar: PropTypes.bool,
  activeContact: PropTypes.string
};

export default function ChatConversationList({ allSelected, conversations, isOpenSidebar, activeContact, ...other }) {
  const navigate = useNavigate();
  const { notifications } = useWebNotifications();

  const handleSelectConversation = (conversationId) => {
    navigate(`/bookings/${conversationId}`);
  };

  const getUnread = (id) => {
    let num = 0;
    const vehicles = [];
    notifications
      ?.filter((n) => !n.isRead && n?.notificationType === 'BOOKING' && n?.contactID === id)
      .map((n) => {
        let already = false;
        vehicles?.map((v) => {
          if (v === n?.contactItemID) {
            already = true;
          }
        });
        if (!already) {
          vehicles.push(n?.contactItemID);
          num = num + 1;
        }
      });
    return num;
  };

  return (
    <List disablePadding {...other}>
      {conversations.length < 1 && (
        <Box sx={{ position: 'relative' }}>
          <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5 }}>
            <motion.div variants={varFadeInDown}>
              <Typography component="snap" variant="body1">
                There are no bookings for display
              </Typography>
            </motion.div>
          </Container>
        </Box>
      )}

      {conversations.map((conversation) => (
        <ChatConversationItem
          getUnread={getUnread}
          key={conversation.id}
          isOpenSidebar={isOpenSidebar}
          conversation={conversation}
          isSelected={activeContact === conversation.id || allSelected}
          onSelectConversation={() => handleSelectConversation(conversation.id)}
        />
      ))}
    </List>
  );
}
