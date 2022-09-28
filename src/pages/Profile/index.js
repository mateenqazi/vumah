/* eslint-disable */
import React from 'react';
import useAuth from '../../hooks/useAuth';
import UnauthorizedAccess from '../../layouts/authGuard/UnauthorizedAccess';
import HostView from '../private-host-review';
import GuestView from '../private-guest-review';
import { useQuery } from '@apollo/client';
import { GET_USER_REVIEWS_BY_ID } from '../../graphql/Queries';

export default function Profile() {
  const { isAuthenticated, user } = useAuth();

  const { loading: loadingReviews, data: reviews } = useQuery(GET_USER_REVIEWS_BY_ID, {
    variables: { id: user.id }
  });

  return (
    <>
      {!isAuthenticated ? (
        <UnauthorizedAccess />
      ) : (
        <>
          {user.isBusiness ? (
            <>
              <HostView loadingReviews={loadingReviews} reviews={reviews} />
            </>
          ) : (
            <>
              <GuestView loadingReviews={loadingReviews} reviews={reviews} />
            </>
          )}
        </>
      )}
    </>
  );
}
