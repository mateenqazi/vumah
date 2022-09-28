import React from 'react';
import './notifications.css';
import { ImCross } from 'react-icons/im';
import { useTheme } from '@mui/material/styles';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_NOTIFICATIONS, READ_NOTIFICATION } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import useWebNotifications from '../../hooks/useWebNotifications';
import { Button, Stack, Typography } from '@mui/material';
import Notification from './Notification';

export default function Notifications() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { notifications } = useWebNotifications();

  const [readNotification] = useMutation(READ_NOTIFICATION);

  const read = (notification) => {
    readNotification({
      variables: { notificationID: notification?.id }
    })
      .then(() => navigate(notification?.url || '#'))
      .catch((e) => console.log(e));
  };

  const markAllAsRead = () => {
    notifications
      ?.filter((n) => !n?.isRead)
      ?.map((n) => {
        readNotification({
          variables: { notificationID: n?.id }
        })
          .then(() => {})
          .catch(() => {});
      });
  };

  return (
    <>
      <Stack spacing={5} sx={{ p: 4, pt: 6 }}>
        <Stack spacing={2} direction="row" sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="snap">
            Notifications
          </Typography>
          <Button onClick={markAllAsRead} variant="outlined">
            Mark all as read
          </Button>
        </Stack>
        <Stack spacing={2}>
          {notifications
            ?.filter((n) => !n?.isRead)
            ?.map((notification) => (
              <Notification notify={notification} read={read} />
            ))}
          {notifications
            ?.filter((n) => n?.isRead)
            ?.map((notification) => (
              <Notification notify={notification} read={read} />
            ))}
        </Stack>
      </Stack>
      {/*<div id="notificationsContainer">*/}
      {/*  <div id="notifications">*/}
      {/*    <div id="notificationsTitleContainer">*/}
      {/*      <p id="notificationsTitle" style={{ color: theme.palette.text.primary }}>*/}
      {/*        Notifications*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    {notifications?.map((notification) => (*/}
      {/*      <div*/}
      {/*        className="singleNotification"*/}
      {/*        onClick={() => {*/}
      {/*          read(notification);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <div className="singleNotificationRow">*/}
      {/*          <div className="singleNotificationDataTextContainer">*/}
      {/*            <p style={{ color: theme.palette.text.primary }} className="itemData">*/}
      {/*              {notification?.message}*/}
      {/*            </p>*/}
      {/*            <p style={{ color: theme.palette.text.secondary }} className="itemDate">*/}
      {/*              {moment(Date(Number(notification?.date))).format('DD/MMM/YYYY HH:mm A')}*/}
      {/*            </p>*/}
      {/*          </div>*/}
      {/*          /!*<div className="cancelIconContainer">*!/*/}
      {/*          /!*  <ImCross style={{ color: theme.palette.text.primary }} className="cancelIcon" />*!/*/}
      {/*          /!*</div>*!/*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
