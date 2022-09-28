import React, { useState } from 'react';
// material
import { Card, Container, Divider, Stack, Typography } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// components
import { ChatSidebar, ChatBookingWindow } from '../../components/chat';
import { useLocation, useParams } from 'react-router-dom';
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { GET_USER_BOOKING_CONTACTS, GET_USER_CONTACT_BY_ID, MESSAGES_SUBSCRIPTION } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import useWebNotifications from '../../hooks/useWebNotifications';

// ----------------------------------------------------------------------

export default function Chat() {
  const { user } = useAuth();
  const { contactKey } = useParams();

  const [data, setData] = useState(null);

  const { loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { id: user?.id, type: 'booking' },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setData(data?.GetMessageContacts);
    }
  });

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
    <Container maxWidth={false} style={{ padding: 0 }}>
      <Divider style={{ height: 0 }} />
      <Card sx={{ height: 'calc(100vh - 100px)', display: 'flex', mt: 1 }}>
        <ChatSidebar contacts={data} contactKey={contactKey} />
        <ChatBookingWindow contacts={data} />
      </Card>
    </Container>
  );
}
