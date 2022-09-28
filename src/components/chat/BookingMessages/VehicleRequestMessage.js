import React from 'react';
import moment from 'moment';
import { Button, Stack } from '@mui/material';
import DeclineBooking from '../../../pages/requestBooking/DeclineBooking';
import useDroidDialog from '../../../hooks/useDroidDialog';

function VehicleRequestMessage({ message, getMessages }) {
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
              <h6
                style={{
                  borderBottom: '1px solid grey',
                  minWidth: '400px',
                  padding: '10px 20px'
                }}
                className="my-button"
              >
                {vehicle.make} {vehicle.model}
              </h6>
              <p
                style={{
                  minWidth: '300px',
                  paddingBottom: '0',
                  padding: '5px 20px'
                }}
              >
                Check-in:
                <span
                  style={{
                    color: '#F67810',
                    marginLeft: '10px',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {moment(new Date(Number(booking?.startTime))).format('ddd MMM yyyy - hh:mm a')}
                </span>
              </p>
              <p
                style={{
                  borderBottom: '1px solid grey',
                  minWidth: '300px',
                  padding: '5px 20px'
                }}
              >
                Return Date:
                <span
                  style={{
                    color: '#F67810',
                    marginLeft: '10px',
                    letterSpacing: '-0.5px'
                  }}
                >
                  {moment(new Date(Number(booking?.startTime))).format('ddd MMM yyyy - hh:mm a')}
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
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: '100px' }}
                    onClick={() =>
                      onOpen('Decline Booking', <DeclineBooking booking={booking} getMessages={getMessages} />)
                    }
                  >
                    Decline
                  </Button>
                  <Button variant="contained" sx={{ borderRadius: '100px', color: '#fff' }} onClick={() => {}}>
                    Accept
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleRequestMessage;
