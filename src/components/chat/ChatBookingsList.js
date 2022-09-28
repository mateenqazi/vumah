import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
// material
import { Box, Container, List, Typography } from '@mui/material';
//
import ChatConversationItem from './ChatConversationItem';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../animate';
import React from 'react';
import ChatBookingItem from './ChatBookingItem';

// ----------------------------------------------------------------------

ChatBookingsList.propTypes = {
  bookings: PropTypes.array,
  isOpenSidebar: PropTypes.bool,
  activeBookingId: PropTypes.string
};

export default function ChatBookingsList({ bookings, isOpenSidebar, activeBookingId, ...other }) {
  const navigate = useNavigate();

  const { contactKey } = useParams();

  const handleSelectConversation = (conversationId) => {
    navigate(`/bookings/${contactKey}/${conversationId}`);
  };

  if (bookings?.length < 1)
    return (
      <Box sx={{ position: 'relative' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5 }}>
          <motion.div variants={varFadeInDown}>
            <Typography component="snap" variant="body1">
              There are no bookings for display
            </Typography>
          </motion.div>
        </Container>
      </Box>
    );

  return (
    <List disablePadding {...other}>
      {bookings
        ?.sort((a, b) => (a.id > b.id ? 1 : -1))
        ?.map((booking, index) => (
          <ChatBookingItem
            key={index}
            isOpenSidebar={isOpenSidebar}
            booking={booking}
            isSelected={activeBookingId === booking.id}
            onSelectBooking={() => handleSelectConversation(booking.id)}
          />
        ))}
    </List>
  );
}
