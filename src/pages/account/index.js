import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import UnauthorizedAccess from '../../layouts/authGuard/UnauthorizedAccess';
import AccountNew from './AccountNew';

export default function Index() {
  const { isAuthenticated } = useAuth();
  return <>{!isAuthenticated ? <UnauthorizedAccess /> : <AccountNew />}</>;
}
