import React from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { Close, Favorite, FavoriteBorder, Search } from '@mui/icons-material';

export default function SearchHeader({ isOpen }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '250px',
          px: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: '100px',
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1.5
          },
          '& hr': {
            mx: 0.5
          }
        }}
      >
        <Typography
          component="snap"
          variant="subtitle2"
          sx={{ mx: 0.5, color: 'text.secondary', whiteSpace: 'nowrap', fontWeight: 500 }}
        >
          {isOpen ? 'Close search bar' : 'Start your search'}
        </Typography>
        <IconButton aria-label="search" color="primary">
          {isOpen ? <Close style={{ margin: '0px' }} /> : <Search style={{ margin: '0px' }} />}
        </IconButton>
      </Box>
    </>
  );
}
