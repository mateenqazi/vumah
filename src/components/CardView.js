import React from 'react';
import Visa from '../assets/svg/payments/visa';
import MasterCard from '../assets/svg/payments/mastercard';
import Amex from '../assets/svg/payments/american_express';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { varBounceIn } from './animate';

function CardView({ paymentMethod }) {
  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          py: 0.2,
          my: 1,
          px: 1,
          width: '100%',
          bgcolor: 'grey.50012',
          textAlign: 'start'
        }}
      >
        <Stack direction="rows" spacing={4} sx={{ width: '100%', alignItems: 'center' }}>
          <motion.div variants={varBounceIn}>
            {paymentMethod?.card?.brand === 'mastercard' && <MasterCard />}
            {paymentMethod?.card?.brand === 'visa' && <Visa />}
            {paymentMethod?.card?.brand === 'american_express' && <Amex />}
          </motion.div>
          <Stack
            direction="row"
            spacing={0}
            style={{ marginLeft: 10 }}
            sx={{ width: '100%', justifyContent: 'space-between', alignContent: 'center' }}
          >
            <Typography>{paymentMethod?.card?.brand}</Typography>
            <Typography>**** **** **** {paymentMethod?.card?.last4}</Typography>
            <Typography>
              {Number(paymentMethod?.card?.expMonth) > 10
                ? paymentMethod?.card?.expMonth
                : `0${paymentMethod?.card?.expMonth}`}{' '}
              / {paymentMethod?.card?.expYear}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default CardView;
