import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import videoFill from '@iconify/icons-eva/video-fill';
import phoneFill from '@iconify/icons-eva/phone-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

  return (
    <RootStyle {...other}>
      <Stack direction="row" spacing={2}>
        <Typography component="snap" variant="body1">
          Vehicle:
        </Typography>
        <Stack>
          <Typography
            component="snap"
            variant="subtitle1"
            color="primary"
            className="cpointer"
            onClick={() => {
              navigate(`/vehicle/${booking.vehicleRented.id}`);
            }}
          >
            {booking.vehicleRented.make} {booking.vehicleRented.model}
          </Typography>
          <Typography component="snap" variant="body2">
            Booking Id: #{booking.id}
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
