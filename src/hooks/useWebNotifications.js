import { useContext } from 'react';
import { WebNotificationsContext } from '../contexts/WebNotificationsProvider';

const useWebNotifications = () => useContext(WebNotificationsContext);

export default useWebNotifications;
