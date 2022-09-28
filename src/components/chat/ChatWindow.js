import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// material
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
//
import ChatRoom from './ChatRoom';
import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessageInput';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import {
  ACCEPT_BOOKING,
  BOOKING_ACTIVITIES_SUBSCRIPTION,
  BOOKING_EARNING_SUBSCRIPTION,
  BOOKING_MESSAGES_SUBSCRIPTION,
  GET_USER_BOOKING_BY_ID,
  MESSAGES_SUBSCRIPTION,
  READ_NOTIFICATION
} from '../../graphql/Queries';
import { motion } from 'framer-motion';
import { varFadeInDown } from '../animate';
import LoadingScreen from '../LoadingScreen';
import ChatMessageList from './ChatMessageList';
import PaymentStatus from '../../pages/requestBooking/PaymentStatus';
import { useSnackbar } from 'notistack';
import useWebNotifications from '../../hooks/useWebNotifications';

// ----------------------------------------------------------------------

export default function ChatWindow({ bookings }) {
  const { notifications } = useWebNotifications();
  const { conversationKey } = useParams();

  const [isAccepted, setIsAccepted] = useState(null);
  const [booking, setBooking] = useState(null);
  const [data, setData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [earning, setEarning] = useState(null);

  const { loading: loadingEarning } = useSubscription(BOOKING_EARNING_SUBSCRIPTION, {
    variables: { id: booking?.id },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setEarning(data?.GetBookingEarning);
    }
  });

  const { loading } = useSubscription(BOOKING_MESSAGES_SUBSCRIPTION, {
    variables: { id: conversationKey },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data) setData(data?.GetBookingMessages);
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
      ?.filter((n) => !n.isRead && n?.notificationType === 'BOOKING' && n?.contactItemID === conversationKey)
      ?.map((n) => {
        read(n);
      });
  }, [conversationKey, notifications]);

  useEffect(() => {
    bookings?.map((b) => {
      if (b?.id === conversationKey) {
        setBooking(b);
      }
    });
  }, [conversationKey, data]);

  const [AcceptBookingRequest, { loading: onAcceptLoading }] = useMutation(ACCEPT_BOOKING);

  const onAccept = (id) => {
    AcceptBookingRequest({ variables: { bookingID: id } }).then((res) => {
      enqueueSnackbar('Booking request was accepted Successfully', {
        variant: 'success'
      });
      setIsAccepted(true);
    });
  };

  return (
    <>
      {!conversationKey && (
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
            <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
              Select a Booking for display
            </Typography>
          </motion.div>
        </Container>
      )}
      {booking && (
        <>
          <Stack sx={{ flexGrow: 1, minWidth: '1px', position: 'relative' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
              <Stack sx={{ flexGrow: 1 }}>
                <ChatHeaderDetail booking={booking} />

                <Divider style={{ height: 0 }} />

                {loading ? (
                  <LoadingScreen />
                ) : (
                  <>
                    {data ? (
                      <ChatMessageList
                        earning={earning}
                        booking={booking}
                        messages={data}
                        onAcceptLoading={onAcceptLoading}
                        onAccept={onAccept}
                        isAccepted={isAccepted}
                      />
                    ) : (
                      <Stack sx={{ width: 1, height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h5" component="snap">
                          Server error while fetching data
                        </Typography>
                      </Stack>
                    )}
                  </>
                )}

                <Divider style={{ height: 0 }} />
                <ChatMessageInput
                  booking={booking}
                  conversationId={conversationKey}
                  disabled={booking?.isCheckOutComplete || booking.isCancelled || booking.isDeclined}
                />
              </Stack>

              <ChatRoom
                earning={earning}
                booking={booking}
                onAcceptLoading={onAcceptLoading}
                onAccept={onAccept}
                isAccepted={isAccepted}
              />
            </Box>
            {/*{booking.paymentStatus === 'succeeded' ? (
            ) : (
            <PaymentStatus booking={booking} />
            )}
            */}
          </Stack>
        </>
      )}
    </>
  );
}
