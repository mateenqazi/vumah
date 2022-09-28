// material
import { Grid } from '@mui/material';
// redux
import useAuth from '../../hooks/useAuth';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function CheckoutBillingInfo() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <>
      <div className="addressContainer" style={{ textAlign: 'left' }}>
        <p id="addressTitle" style={{ color: theme.palette.text.primary }}>
          {user.isBusiness ? 'Business Address' : 'Address'}
        </p>
        <Grid container sx={{ mt: 2 }} spacing={2}>
          <Grid item xs={12} md={6}>
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Street Address 1
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.address}
              ></input>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Street Address 2
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.address2}
              ></input>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              City
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.city}
              ></input>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Country (Optional)
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.country}
              ></input>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Postcode
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.postalCode}
              ></input>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
