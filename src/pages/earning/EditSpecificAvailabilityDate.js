import React, { useState } from 'react';
import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { LoadingButton, LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { useMutation } from '@apollo/client';
import { CREATE_SPECIFIC_DATE_AVAILABILITY } from '../../graphql/Queries';
import useDroidDialog from '../../hooks/useDroidDialog';

function EditSpecificAvailabilityDate({ vehicle, date, availability, getVehicles }) {
  const { onClose } = useDroidDialog();
  const [dayStart, setDayStart] = useState(availability?.dayStart || moment().startOf('day'));
  const [dayEnd, setDayEnd] = useState(availability?.dayEnd || moment().endOf('day'));
  const [timeType, setTimeType] = useState(availability?.timeType || 'All Day');

  const [CreateSpecificDate, { loading }] = useMutation(CREATE_SPECIFIC_DATE_AVAILABILITY);

  const handleChangeTimeType = (event) => {
    setTimeType(event.target.value);
    if (event.target.value === 'All Day') {
      setDayStart(moment().startOf('day'));
      setDayEnd(moment().endOf('day'));
    }
    if (event.target.value === 'Custom Hours') {
      setDayStart(moment().startOf('day').add(6, 'hours'));
      setDayEnd(moment().endOf('day').subtract(6, 'hours'));
    }
    if (event.target.value === 'Unavailable') {
      setDayStart(moment().startOf('day'));
      setDayEnd(moment().startOf('day'));
    }
  };

  const handleDayStart = (event) => {
    setDayStart(event);
    setTimeType('Custom Hours');
  };

  const handleDayEnd = (event) => {
    setDayEnd(event);
    setTimeType('Custom Hours');
  };
  const timeTypes = ['All Day', 'Custom Hours', 'Unavailable'];

  return (
    <Stack spacing={6} sx={{ py: 5 }}>
      <Stack alignItems="flex-start" direction="row" spacing={2} sx={{ width: '100%', pb: 3 }}>
        <img src={vehicle?.images[0]?.url} alt="tesla car" style={{ width: 120 }} />
        <Stack alignItems="flex-start" justifyContent="space-between" spacing={0.5} sx={{ width: '100%' }}>
          <Typography component="snap" variant="subtitle1" color="primary">
            {vehicle?.make} - ( {vehicle?.reg} )
          </Typography>
          <Typography component="snap" variant="body1">
            Date:{' '}
            <Typography component="snap" color="primary">
              {moment(date).format('DD/MMM/YYYY')}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={4}>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Availability"
          value={timeType}
          onChange={handleChangeTimeType}
          helperText="Please select Availability"
          sx={{ minWidth: '170px' }}
        >
          {timeTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {timeType === 'Custom Hours' && (
          <Stack direction="row" spacing={1}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                onChange={handleDayStart}
                value={dayStart}
                renderInput={(params) => <TextField label="start Time" {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                onChange={handleDayEnd}
                value={dayEnd}
                renderInput={(params) => <TextField label="end Time" {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        )}
      </Stack>
      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        onClick={async () => {
          await CreateSpecificDate({
            variables: {
              vehicleId: vehicle?.id,
              specificDate: {
                id: availability?.id || 0,
                date: moment(date).startOf('day'),
                timeType: timeType,
                dayStart: dayStart,
                dayEnd: dayEnd
              }
            }
          });
          onClose();
          await getVehicles();
        }}
      >
        Save Availability
      </LoadingButton>
    </Stack>
  );
}

export default EditSpecificAvailabilityDate;
