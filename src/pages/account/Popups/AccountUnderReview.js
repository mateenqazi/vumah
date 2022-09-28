import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';

export default function AccountUnderReview({ title, message, image, status, setAccountPopUpOpen }) {
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
        <Typography component="snap" variant={'h4'}>
          {title}
        </Typography>
        <Typography component="snap" variant={'body1'}>
          {message}
        </Typography>
        <img src={image} alt="Account Image" style={{ width: 160 }} />
        <Button variant={'contained'} onClick={() => setAccountPopUpOpen(false)}>
          View documents
        </Button>
      </Stack>
    </Paper>
  );
}
