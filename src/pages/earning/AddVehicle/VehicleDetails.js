import React from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { RHFTextField } from '../../../components/hook-form';

export default function VehicleDetails({ values, setValues, setFeatures }) {
  const onVehicleTypeChange = (type) => {
    setValues({ ...values, vehicleType: type, reg: '' });
    setFeatures(
      type === 'CAMPERVAN'
        ? [
            { checked: false, name: 'Toilet' },
            { checked: false, name: 'Shower' },
            { checked: false, name: 'Kitchen Unit' },
            { checked: false, name: 'Hot Water' },
            { checked: false, name: 'Heating' },
            { checked: false, name: 'Suitable for tall people' },
            { checked: false, name: 'Bicycle Rack' },
            { checked: false, name: 'A/C in cabin' },
            { checked: false, name: 'A/C in motorhome compartment' },
            { checked: false, name: 'Bluetooth' },
            { checked: false, name: 'Automatic gearbox' },
            { checked: false, name: 'Autopilot' },
            { checked: false, name: 'USB input' },
            { checked: false, name: 'GPS' }
          ]
        : [
            { checked: false, name: 'Bluetooth' },
            { checked: false, name: 'Automatic gearbox' },
            { checked: false, name: 'Autopilot' },
            { checked: false, name: 'USB input' },
            { checked: false, name: 'Electric' },
            { checked: false, name: 'GPS' }
          ]
    );
  };

  return (
    <>
      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel>Select Vehicle Type</InputLabel>
        <Select
          id={'vehicleType'}
          value={values.vehicleType}
          label="Select Vehicle Type"
          onChange={(e) => {
            setValues({ ...values, vehicleType: e.target.value, reg: '' });
            setFeatures(
              e.target.value === 'CAMPERVAN'
                ? [
                    { checked: false, name: 'Toilet' },
                    { checked: false, name: 'Shower' },
                    { checked: false, name: 'Kitchen Unit' },
                    { checked: false, name: 'Hot Water' },
                    { checked: false, name: 'Heating' },
                    { checked: false, name: 'Suitable for tall people' },
                    { checked: false, name: 'Bicycle Rack' },
                    { checked: false, name: 'A/C in cabin' },
                    { checked: false, name: 'A/C in motorhome compartment' },
                    { checked: false, name: 'Bluetooth' },
                    { checked: false, name: 'Automatic gearbox' },
                    { checked: false, name: 'Autopilot' },
                    { checked: false, name: 'USB input' },
                    { checked: false, name: 'GPS' }
                  ]
                : [
                    { checked: false, name: 'Bluetooth' },
                    { checked: false, name: 'Automatic gearbox' },
                    { checked: false, name: 'Autopilot' },
                    { checked: false, name: 'USB input' },
                    { checked: false, name: 'Electric' },
                    { checked: false, name: 'GPS' }
                  ]
            );
          }}
        >
          <MenuItem value={'CAR'}>
            <i className="fas fa-car-side"></i>&nbsp;&nbsp;Car
          </MenuItem>
          <Divider style={{ height: 0 }} />
          <MenuItem value={'MOTORCYCLE'}>
            <i className="fas fa-motorcycle"></i>&nbsp;&nbsp;Motorbike
          </MenuItem>
          <Divider style={{ height: 0 }} />
          <MenuItem value={'BICYCLE'}>
            <i className="fas fa-bicycle"></i>&nbsp;&nbsp;Bicycle
          </MenuItem>
          <Divider style={{ height: 0 }} />
          <MenuItem value={'CAMPERVAN'}>
            <i className="fas fa-rv"></i>&nbsp;&nbsp;Campervan
          </MenuItem>
          {/* {['', 'CAR', 'CAMPERVAN', 'BICYCLE', 'MOTORCYCLE'].map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>

      {(values.vehicleType === 'CAR' || values.vehicleType === 'CAMPERVAN' || values.vehicleType === 'MOTORCYCLE') && (
        <RHFTextField autoComplete="reg" name="reg" label="Registration/License Plate" />
      )}

      {(values.vehicleType === 'MOTORCYCLE' || values.vehicleType === 'BICYCLE') && (
        <RHFTextField name="bikeType" label="Bike type" />
      )}

      {!(values.vehicleType === 'BICYCLE') && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <RHFTextField name="make" label="Make" />
          <RHFTextField name="model" label="Model" />
        </Stack>
      )}

      {!(values.vehicleType === 'BICYCLE') && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <RHFTextField name="fuelType" label="Fuel Type" />
          <RHFTextField name="year" label="Year" />
        </Stack>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <RHFTextField
          name="hourlyRates"
          label="Hourly Rates"
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>
          }}
        />
        <RHFTextField
          name="dailyRates"
          label="Daily Rates"
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>
          }}
        />
      </Stack>

      {values.vehicleType === 'BICYCLE' ? (
        <RHFTextField name="description" label="Description" />
      ) : (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <RHFTextField
            name="mileage"
            label="Mileage included"
            InputProps={{
              endAdornment: <InputAdornment position="end">(miles)</InputAdornment>
            }}
          />
          <RHFTextField
            name="mileageRates"
            label="Mileage rates"
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
              endAdornment: <InputAdornment position="end">/mile</InputAdornment>
            }}
          />
        </Stack>
      )}
    </>
  );
}
