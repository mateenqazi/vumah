import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { CREATE_SETUP_INTEND } from '../../../graphql/Queries';
import LoadingScreen from '../../../components/LoadingScreen';
import SetupForm from './SetupForm';
import { Card, useTheme } from '@mui/material';

const stripePromise = loadStripe(
  'pk_test_51KfTZ5KD8DXRtfuXHVqqmubdZxnv9cKZ1mfDPAA9664mfD2TSC9PcCfKJJRQl7awXwU9oIjkGk4i2t35l1NnNq5O00Nz9lMNB4'
);

const AddPaymentCard = ({ getCards }) => {
  const theme = useTheme();
  const [CreateSetUpIntent, { loading, error, data }] = useMutation(CREATE_SETUP_INTEND);

  useEffect(() => {
    CreateSetUpIntent().catch((e) => {
      console.log(e);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) return <>Error with setup intent</>;

  return (
    <Card sx={{ minWidth: { xs: '380px', md: '450px' }, p: 3, minHeight: '392px' }}>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: data?.CreateSetUpIntent?.message,
          appearance: {
            theme: theme.palette.mode === 'light' ? 'stripe' : 'night',
            labels: 'floating'
          }
        }}
      >
        <SetupForm getCards={getCards} />
      </Elements>
    </Card>
  );
};

export default AddPaymentCard;
