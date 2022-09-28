import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 70,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3)
}));

// ----------------------------------------------------------------------

ChatHeaderDetail.propTypes = {
  booking: PropTypes.array
};

export default function ChatHeaderDetail({ booking, ...other }) {
  return (
    <RootStyle {...other}>
      <Stack direction="row" spacing={2}>
        <Typography component="snap" variant="body1">
          Vehicle:
        </Typography>
        <Stack>
          <Typography component="snap" variant="subtitle1" color="primary">
            Mercedes Benz S-Class
          </Typography>
          <Typography component="snap" variant="body1">
            Listing
            <Typography component="snap" color="primary">
              #343534
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
