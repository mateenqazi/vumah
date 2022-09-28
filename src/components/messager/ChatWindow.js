import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// material
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
//
import ChatMessageInput from './ChatMessageInput';
import { useMutation, useSubscription } from '@apollo/client';
import { READ_NOTIFICATION, VEHICLE_MESSAGES_SUBSCRIPTION } from '../../graphql/Queries';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../animate';
import LoadingScreen from '../LoadingScreen';
import ChatMessageList from './ChatMessageList';
import useWebNotifications from '../../hooks/useWebNotifications';

// ----------------------------------------------------------------------

export default function ChatWindow() {
  const { notifications } = useWebNotifications();
  const { contactKey, conversationKey } = useParams();

  const [data, setData] = useState(null);

  const { loading } = useSubscription(VEHICLE_MESSAGES_SUBSCRIPTION, {
    variables: { contactId: contactKey, vehicleId: conversationKey },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setData(data?.GetVehicleMessages);
    }
  });

  const [readNotification] = useMutation(READ_NOTIFICATION);

  const read = (notification) => {
    readNotification({
      variables: { notificationID: notification?.id }
    })
      .then(() => {})
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    notifications
      ?.filter((n) => !n.isRead && n?.notificationType === 'MESSAGE' && n?.contactItemID === conversationKey)
      ?.map((n) => {
        read(n);
      });
  }, [conversationKey, notifications]);

  if (!conversationKey) return <>_</>;

  if (loading) return <LoadingScreen />;

  if (!data)
    return (
      <Stack sx={{ width: 1, height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" component="snap">
          Server error while fetching data
        </Typography>
      </Stack>
    );

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
              Select a Vehicle for display
            </Typography>
          </motion.div>
        </Container>
      )}
      {data && (
        <>
          <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
            {/*<ChatHeaderDetail booking={data.BookingById} />*/}

            <Divider style={{ height: 0 }} />

            <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
              <Stack sx={{ flexGrow: 1 }}>
                {loading ? <LoadingScreen /> : <ChatMessageList messages={data} participant />}

                <Divider style={{ height: 0 }} />

                <ChatMessageInput disabled={loading} />
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
}
