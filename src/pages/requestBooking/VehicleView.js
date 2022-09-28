import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DroidDateRangePicker from '../../components/DateRangePicker';
import createAvatar from '../../utils/createAvatar';
import { MAvatar } from '../../components/@material-extend';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { getCostsDroid, getTimeDiffDroid } from '../../utils/TimeCalc';
import { fCurrency, fNumber } from '../../utils/formatNumber';
import { useSelector } from 'react-redux';

function VehicleView({ vehicle, serviceFee }) {
  const dateRange = useSelector((state) => state.VehicleBookingTime);

  const getValuesHere = () => {
    if (vehicle?.freeCancellation) {
      return '';
    } else {
      if (vehicle?.isFixedPrice) {
        return `£${vehicle?.cancellationPercentage}`;
      } else {
        return `${vehicle?.cancellationPercentage}%`;
      }
    }
  };

  return (
    <div className="col-md-12">
      <div className="book-request-right">
        <div className="request-product-main d-flex">
          <div className="request-product-left margin-right-ten">
            {vehicle.images !== undefined && (
              <>{vehicle.images[0] !== undefined && <img src={vehicle.images[0].url} alt="tesla car" />}</>
            )}
          </div>
          {vehicle?.user !== undefined && (
            <div className="request-product-right pl-4">
              <Typography component="snap" variant="body2" style={{ whiteSpace: 'nowrap' }}>
                {vehicle?.make} {vehicle?.model}
              </Typography>
              <Stack direction="row" sx={{ mb: 0.5, alignItems: 'flex-start', pt: 3 }} spacing={1}>
                <MAvatar
                  src={vehicle?.user?.avatarUrl}
                  alt={vehicle?.user?.firstName}
                  color="default"
                  sx={{ width: 40, height: 40 }}
                >
                  {createAvatar(vehicle?.user?.firstName).name}
                </MAvatar>
                <Stack>
                  <Typography component="snap" variant="body2">
                    Car hosted by{' '}
                    <snap style={{ fontWeight: '700', whiteSpace: 'nowrap' }}>
                      {vehicle?.user?.firstName} {vehicle?.user?.lastName}
                    </snap>
                  </Typography>
                  <Typography component="snap" variant="caption" sx={{ pt: 1 }}>
                    Level 1 host
                  </Typography>
                  <Link to={`/profile/${vehicle?.user?.id}`}>
                    <Typography component="snap" variant="caption" color="primary" sx={{ pt: 2 }}>
                      View Profile
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            </div>
          )}
        </div>
        <Stack spacing={2}>
          <Stack spacing={2} direction={'row'} justifyContent="space-between">
            <Typography component="snap" variant="h6">
              Vehicle Rates
            </Typography>
            <Typography component="snap" variant="h6">
              £{vehicle?.dailyRates}/day (£{vehicle?.hourlyRates}/hr)
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Stack spacing={2} direction={'row'} justifyContent="space-between">
              <Typography component="snap" variant="body1">
                Distance included
              </Typography>
              <Typography component="snap" variant="body1">
                {fNumber(vehicle?.mileage) || 0} mil
              </Typography>
            </Stack>
            <Typography component="snap" variant="caption">
              £{fNumber(vehicle?.mileageRates) || 0}/mil fee for additional miles driven
            </Typography>
          </Stack>
          <DroidDateRangePicker />
          <Stack spacing={2}>
            <Stack spacing={0}>
              <Stack direction="row" justifyContent="flex-end">
                {/*<Typography component="snap" variant="caption">*/}
                {/*  Time*/}
                {/*</Typography>*/}
                <Typography component="snap" variant="caption">
                  {getTimeDiffDroid(dateRange).days} days & {getTimeDiffDroid(dateRange).hours} hours &{' '}
                  {getTimeDiffDroid(dateRange).minutes} minutes & {getTimeDiffDroid(dateRange).seconds} seconds
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography component="snap" variant="body2">
                  Vehicle cost
                </Typography>
                <Typography component="snap" variant="body2">
                  £{fCurrency(getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates))}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="body2">
                Service fee
              </Typography>
              <Typography component="snap" variant="body2">
                £{fCurrency(getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) * serviceFee)}
              </Typography>
            </Stack>
            <Divider style={{ height: 0 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography component="snap" variant="subtitle1">
                Total
              </Typography>
              <Typography component="snap" variant="subtitle1">
                £
                {fCurrency(
                  getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) +
                    getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) * serviceFee
                )}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <>
          {/*<div className="request-grid mb-4">*/}
          {/*  <div className="row">*/}
          {/*    <div className="col-md-12">*/}
          {/*      <h2>Dates</h2>*/}
          {/*      <div className="mb-3">*/}
          {/*        <DroidDateRangePicker />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<h5 className="mb-4 booking">Total Booking Cost for 3 days 6hrs</h5>*/}
          {/*<div className="request-grid">*/}
          {/*  <div className="row mb-3">*/}
          {/*    <div className="col-md-6">*/}
          {/*      <p>£100</p>*/}
          {/*    </div>*/}
          {/*    <div className="col-md-6">*/}
          {/*      <p>$100.00</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="row mb-3">*/}
          {/*    <div className="col-md-6">*/}
          {/*      <p>Service fee</p>*/}
          {/*    </div>*/}
          {/*    <div className="col-md-6">*/}
          {/*      <p>$0.00</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="row">*/}
          {/*    <div className="col-md-6">*/}
          {/*      <h2>Total (GDP)</h2>*/}
          {/*    </div>*/}
          {/*    <div className="col-md-6">*/}
          {/*      <h2>£100.00</h2>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </>
      </div>
      <Stack spacing={2} sx={{ p: 1, pt: 4 }}>
        <Typography component="snap" variant="h5">
          Cancellation Policy
        </Typography>
        <Typography component="snap" variant="body2" sx={{ pt: 1 }}>
          Cancellation Fee: {getValuesHere()}
        </Typography>
        {vehicle?.freeCancellation ? (
          <Typography component="snap" variant="body2" sx={{ maxWidth: '450px' }}>
            *When booking a vehicle on the Vumah platform we allow free cancellations up to 24hrs before the trip start
            to allow flexibility for our guests.
            <br />
            If the guest chooses to cancel for any reason within the 24 hours period of the trip start, the guest will
            be subject to a late cancellation fee and will be refunded the remainder that is on hold.
          </Typography>
        ) : (
          <Typography component="snap" variant="body2" sx={{ maxWidth: '400px' }}>
            {vehicle?.cancellationDescription}
          </Typography>
        )}
      </Stack>
    </div>
  );
}

export default VehicleView;
