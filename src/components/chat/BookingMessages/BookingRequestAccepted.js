import React from 'react';
import moment from 'moment';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import DeclineBooking from '../../../pages/requestBooking/DeclineBooking';
import useDroidDialog from '../../../hooks/useDroidDialog';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { ACCEPT_BOOKING } from '../../../graphql/Queries';
import { MIconButton } from '../../@material-extend';
import { Close, Visibility } from '@mui/icons-material';
import useAuth from '../../../hooks/useAuth';
import ViewBookingChange from '../../../pages/requestBooking/ViewBookingChange';

function BookingRequestAccepted({ message, booking }) {
  const { onOpen } = useDroidDialog();

  const bookingChangeRequest = message.bookingChangeRequest;
  const vehicle = booking.vehicleRented;
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
                    onOpen('View Booking Change', <ViewBookingChange bookingChangeRequest={bookingChangeRequest} />)
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
                New Check-in:
                <span
                  style={{
                    color: '#F67810',
                    marginLeft: '10px',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {moment(Date(Number(bookingChangeRequest.startTime))).format('ddd MMM yyyy - hh:mm a')}
                </span>
              </p>
              <p
                style={{
                  borderBottom: '1px solid grey',
                  minWidth: '300px',
                  padding: '5px 20px'
                }}
              >
                New Return Date:
                <span
                  style={{
                    color: '#F67810',
                    marginLeft: '10px',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {moment(Date(Number(bookingChangeRequest.endTime))).format('ddd MMM yyyy - hh:mm a')}
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
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: 'center', justifyContent: 'flex-end', width: '100%', pt: 1 }}
                >
                  <Typography component="snap" variant="body2">
                    Booking Change request was accepted
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

export default BookingRequestAccepted;
