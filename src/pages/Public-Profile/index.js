/* eslint-disable */
import React from 'react';
import HostView from '../public-host-review';
import GuestView from '../public-guest-review';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE_BY_ID, GET_USER_REVIEWS_BY_ID } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';

export default function Profile() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_USER_PROFILE_BY_ID, {
    variables: { id: id }
  });

  const { loading: loadingReviews, data: reviews } = useQuery(GET_USER_REVIEWS_BY_ID, {
    variables: { id: id }
  });

  if (loading) return <LoadingScreen />;

  if (error) return <>no profile found</>;

  return (
    <>
      {data?.userProfileById?.isBusiness ? (
        <>
          <HostView profile={data?.userProfileById} loadingReviews={loadingReviews} reviews={reviews} />
        </>
      ) : (
        <>
          <GuestView profile={data?.userProfileById} loadingReviews={loadingReviews} reviews={reviews} />
        </>
      )}
    </>
  );
}
