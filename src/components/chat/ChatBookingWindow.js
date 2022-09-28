import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// material
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { useLazyQuery, useSubscription } from '@apollo/client';
import {
  CONTACT_BOOKINGS_SUBSCRIPTION,
  CONTACT_VEHICLES_SUBSCRIPTION,
  GET_USER_CONTACT_BY_ID
} from '../../graphql/Queries';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../animate';
import BookingsSidebar from './BookingsSidebar';
import ChatWindow from './ChatWindow';
import useAuth from '../../hooks/useAuth';
import LoadingScreen from '../LoadingScreen';

// ----------------------------------------------------------------------

export default function ChatBookingWindow({ contacts }) {
  const { user } = useAuth();
  const { contactKey, conversationKey } = useParams();

  const [contact, setContact] = useState(null);

  const [data, setData] = useState(null);

  const { loading } = useSubscription(CONTACT_BOOKINGS_SUBSCRIPTION, {
    variables: { id: contactKey },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setData(data?.GetContactBookings);
    }
  });

  useEffect(() => {
    contacts?.map((c) => {
      if (c?.id === contactKey) setContact(c);
    });
  }, [contactKey]);

  if (!contactKey) return <></>;
  if (contact === undefined) return <></>;

  if (loading) return <LoadingScreen />;

  const getUser = () => {
    if (user.id === contact?.owner1.id) return contact?.owner2;
    return contact?.owner1;
  };

  return (
    <>
      {!contactKey && (
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 5,
            width: '100%',
            height: '100%'
          }}
        >
          <motion.div variants={varFadeInDown}>
            <Typography component="snap" variant="body1">
              Select a Contact for display
            </Typography>
          </motion.div>
        </Container>
      )}
      {data && (
        <>
          <BookingsSidebar bookings={data} participant={getUser()} />
          {conversationKey && <ChatWindow bookings={data} />}
        </>
      )}
    </>
  );
}
