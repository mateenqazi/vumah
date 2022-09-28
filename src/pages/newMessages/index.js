import React from 'react';
import useAuth from '../../hooks/useAuth';
import UnauthorizedAccess from '../../layouts/authGuard/UnauthorizedAccess';
import Chat from './Chat';

export default function Index() {
  const { isAuthenticated } = useAuth();
  return <>{!isAuthenticated ? <UnauthorizedAccess /> : <Chat />}</>;
}
