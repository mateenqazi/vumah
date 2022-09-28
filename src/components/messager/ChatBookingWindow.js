import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Stack, Typography } from '@mui/material';

import { motion } from 'framer-motion';
import { varFadeInDown } from '../animate';
import VehiclesSidebar from './VehiclesSidebar';
import ChatWindow from './ChatWindow';
import { useSubscription } from '@apollo/client';
import { CONTACT_VEHICLES_SUBSCRIPTION, MESSAGES_SUBSCRIPTION } from '../../graphql/Queries';
import LoadingScreen from '../LoadingScreen';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function ChatBookingWindow({ contacts }) {
  const { user } = useAuth();
  const { contactKey } = useParams();

  const [data, setData] = useState(null);
  const [contact, setContact] = useState(null);

  const { loading } = useSubscription(CONTACT_VEHICLES_SUBSCRIPTION, {
    variables: { id: contactKey },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setData(data?.GetContactVehicles);
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

  if (!data)
    return (
      <Stack sx={{ width: 1, height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" component="snap">
          Server error while fetching data
        </Typography>
      </Stack>
    );

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
      {contact && (
        <>
          <VehiclesSidebar vehicles={data} participant={getUser()} />
          <ChatWindow participant={getUser()} />
        </>
      )}
    </>
  );
}
