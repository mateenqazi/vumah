import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
// material
import { Box, Container, List, Typography } from '@mui/material';
//
import { motion } from 'framer-motion';
import { varFadeInDown } from '../animate';
import React from 'react';
import ChatVehicleItem from './ChatVehicleItem';

// ----------------------------------------------------------------------

ChatVehiclesList.propTypes = {
  bookings: PropTypes.array,
  isOpenSidebar: PropTypes.bool,
  activeBookingId: PropTypes.string
};

export default function ChatVehiclesList({ vehicles, isOpenSidebar, activeBookingId, ...other }) {
  const navigate = useNavigate();

  const { contactKey } = useParams();

  const handleSelectConversation = (conversationId) => {
    navigate(`/messages/${contactKey}/${conversationId}`);
  };

  if (vehicles?.length < 1)
    return (
      <Box sx={{ position: 'relative' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5 }}>
          <motion.div variants={varFadeInDown}>
            <Typography component="snap" variant="body1">
              There are no Vehicle chats for display
            </Typography>
          </motion.div>
        </Container>
      </Box>
    );

  return (
    <List disablePadding {...other}>
      {vehicles?.map((vehicle, index) => (
        <ChatVehicleItem
          key={index}
          isOpenSidebar={isOpenSidebar}
          vehicle={vehicle}
          isSelected={activeBookingId === vehicle?.id}
          onSelectVehicle={() => handleSelectConversation(vehicle?.id)}
        />
      ))}
    </List>
  );
}
