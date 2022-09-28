import React from 'react';
import useAuth from './hooks/useAuth';
import { useSubscription } from '@apollo/client';
import { UPDATE_LAST_SEEN_SUBSCRIPTION } from './graphql/Queries';

function UpdateLastSeen() {
  const { user } = useAuth();

  useSubscription(UPDATE_LAST_SEEN_SUBSCRIPTION, {
    variables: { id: user?.id }
  });

  return <div>{''}</div>;
}

export default UpdateLastSeen;
