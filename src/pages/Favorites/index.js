import React from 'react';
import useAuth from '../../hooks/useAuth';
import UnauthorizedAccess from '../../layouts/authGuard/UnauthorizedAccess';
import Favorites from './Favorites';

export default function Index() {
  const { isAuthenticated } = useAuth();
  return <>{!isAuthenticated ? <UnauthorizedAccess /> : <Favorites />}</>;
}
