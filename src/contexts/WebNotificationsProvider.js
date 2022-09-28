import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Toolbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import './WebDroidDialog.css';
import { useMutation, useSubscription } from '@apollo/client';
import { NOTIFICATIONS_SUBSCRIPTION, REGISTER_VEHICLE } from '../graphql/Queries';
import Notifier from 'react-desktop-notification';
import { DroidDialogProvider } from './WebDroidDialog';
import useAuth from '../hooks/useAuth';

const initialState = {
  initiated: false,
  notifications: []
};

const WebNotificationsContext = createContext(initialState);

WebNotificationsProvider.propTypes = {
  children: PropTypes.node
};

function WebNotificationsProvider({ children }) {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [initiated, setInitiated] = useState(false);

  useSubscription(NOTIFICATIONS_SUBSCRIPTION, {
    variables: { id: user?.id },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (initiated)
        if (data?.GetNotifications?.length > notifications?.length) {
          const notification = data?.GetNotifications[data?.GetNotifications?.length - 1];
          Notifier.start('Vumah', notification?.message, notification?.url, '', 'Vumah Application');
        }
      setNotifications(data?.GetNotifications?.reverse());
      if (data?.GetNotifications?.length > 0 && !initiated) setInitiated(true);
    }
  });

  return (
    <WebNotificationsContext.Provider
      value={{
        initiated: initiated,
        notifications: notifications
      }}
    >
      {children}
    </WebNotificationsContext.Provider>
  );
}

export { WebNotificationsProvider, WebNotificationsContext };
