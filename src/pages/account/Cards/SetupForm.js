import React, { useEffect, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { CREATE_SETUP_INTEND } from '../../../graphql/Queries';
import LoadingScreen from '../../../components/LoadingScreen';
import { Button, Stack } from '@mui/material';
import useDroidDialog from '../../../hooks/useDroidDialog';
import { LoadingButton } from '@mui/lab';

// const stripePromise = loadStripe(
//   'pk_test_51KfTZ5KD8DXRtfuXHVqqmubdZxnv9cKZ1mfDPAA9664mfD2TSC9PcCfKJJRQl7awXwU9oIjkGk4i2t35l1NnNq5O00Nz9lMNB4'
// );

const SetupForm = ({ getCards = () => {} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { onClose } = useDroidDialog();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: 'https://vumah.vercel.app/account'
      }
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    await getCards();
    setLoading(false);
    onClose();
  };

  if (!stripe) <LoadingScreen />;

  return (
    // <Elements stripe={stripePromise} options={options}>
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Stack sx={{ width: '100%', justifyContent: 'center', py: 2 }}>
        <LoadingButton loading={loading} type="submit" variant="contained" color="primary" disabled={!stripe}>
          Submit
        </LoadingButton>
      </Stack>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
    // </Elements>
  );
};

export default SetupForm;
