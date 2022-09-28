import React from 'react';
import moment from 'moment';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import DeclineBooking from '../../../pages/requestBooking/DeclineBooking';
import useDroidDialog from '../../../hooks/useDroidDialog';
import ViewBooking from '../../../pages/requestBooking/ViewBooking';
import { Visibility } from '@mui/icons-material';

function BookingDeclined({ message, getMessages }) {
  const { onOpen } = useDroidDialog();
  const booking = message.booking;
  const vehicle = message.booking.vehicleRented;

  return (
    <>
      <div className="row">
        <div className="col-md-8 mb-3">
          <div className=" chat-box left_pnnel d-flex">
            <div
              className="chat-bubble chat-bubble--left p-0 my-button"
              style={{ borderRadius: '10px', border: '1px solid grey' }}
            >
              <Stack
                alignItems="center"
                justifyContent="space-between"
                direction="row"
                spacing={0.5}
                sx={{
                  width: '100%',
                  borderBottom: '1px solid grey',
                  minWidth: '400px',
                  padding: '2px 20px'
                }}
              >
                <Typography
                  sx={{
                    maxWidth: '300px',
                    mx: 0.5,
                    fontWeight: '700',
                    lineHeight: '1.5',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {vehicle.make} {vehicle.model}
                </Typography>
                <IconButton
                  onClick={() =>
                    onOpen('View Booking Change', <ViewBooking booking={booking} getMessages={getMessages} />)
                  }
                >
                  <Visibility />
                </IconButton>
              </Stack>
              <p
                style={{
                  minWidth: '300px',
                  paddingBottom: '0',
                  padding: '5px 20px'
                }}
              >
                Reason:
                <span
                  style={{
                    color: '#F67810',
                    marginLeft: '10px',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {booking.declineReason}
                </span>
              </p>
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  textAlign: 'right',
                  width: '100%',
                  padding: '5px 10px'
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="flex-end"
                  direction="row"
                  spacing={0.5}
                  sx={{ width: '100%', pt: 1 }}
                >
                  <Typography component="snap" variant="body1">
                    Booking request was declined
                  </Typography>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingDeclined;
