import React, { useState } from 'react';
// material
import { Card, Container, Divider, Stack, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
// components
import { ChatSidebar, ChatBookingWindow } from '../../components/messager';
import LoadingScreen from '../../components/LoadingScreen';
import { GET_USER_MESSAGE_CONTACTS, MESSAGES_SUBSCRIPTION } from '../../graphql/Queries';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Chat() {
  const { contactKey } = useParams();

  const { user } = useAuth();

  const [data, setData] = useState(null);

  const { loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { id: user?.id, type: 'message' },
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
