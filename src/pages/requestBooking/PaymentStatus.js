import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import AccountImage from '../../assets/img/account-review.png';
import { getCostsDroid } from '../../utils/TimeCalc';

function PaymentStatus({ booking }) {
  return (
    <Paper
      sx={{
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        width: '100%',
        top: 0,
        left: 0,
        p: 4,
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(196, 196, 196, 0.75)'
      }}
    >
      <Stack
        spacing={3}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
          py: 16,
          px: 8,
          background: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[10]
        }}
      >
        <Typography variant={'h4'}>Booking Payment</Typography>
        {booking?.paymentStatus === 'processing' ? (
          <Typography variant={'body1'}>
            Payment are being processed, in case of any inconvenience contact our support team
          </Typography>
        ) : (
          <Typography variant={'body1'}>Please Provide a proper working payment method to proceed</Typography>
        )}
        <img src={AccountImage} alt="Account Image" style={{ width: 160 }} />
        <Button variant="contained" color="primary" size="large" sx={{ width: '450', borderRadius: '100px' }}>
          Make payment
        </Button>
      </Stack>
    </Paper>
  );
}

export default PaymentStatus;
