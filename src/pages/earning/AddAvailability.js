import React from 'react';
import { MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';

function AddAvailability({
  monday,
  setMonday,
  tuesday,
  setTuesday,
  wednesday,
  setWednesday,
  thursday,
  setThursday,
  friday,
  setFriday,
  saturday,
  setSaturday,
  sunday,
  setSunday
}) {
  const timeType = ['All Day', 'Custom Hours', 'Unavailable'];

  const [isAllDays, setIsAllDays] = React.useState(
    Boolean(
      monday.timeType === 'All Day' &&
        tuesday.timeType === 'All Day' &&
        wednesday.timeType === 'All Day' &&
        thursday.timeType === 'All Day' &&
        friday.timeType === 'All Day' &&
        saturday.timeType === 'All Day' &&
        sunday.timeType === 'All Day'
    )
  );

  const handleChangeIsAllDays = () => {
    setMonday({ ...monday, timeType: 'All Day' });
    setTuesday({ ...tuesday, timeType: 'All Day' });
    setWednesday({ ...wednesday, timeType: 'All Day' });
    setThursday({ ...thursday, timeType: 'All Day' });
    setFriday({ ...friday, timeType: 'All Day' });
    setSaturday({ ...saturday, timeType: 'All Day' });
    setSunday({ ...sunday, timeType: 'All Day' });

    setIsAllDays(true);
  };

  const onChangeStartMonday = (e) => {
    setMonday({ ...monday, timeType: 'Custom Hours', dayStart: e });
  };
  const onChangeStartTuesday = (e) => {
    setTuesday({ ...tuesday, timeType: 'Custom Hours', dayStart: e });
  };
  const onChangeStartWednesday = (e) => {
    setWednesday({ ...wednesday, timeType: 'Custom Hours', dayStart: e });
  };
  const onChangeStartThursday = (e) => {
    setThursday({ ...thursday, timeType: 'Custom Hours', dayStart: e });
  };
  const onChangeStartFriday = (e) => {
    setFriday({ ...friday, timeType: 'Custom Hours', dayStart: e });
  };
  const onChangeStartSaturday = (e) => {
    setSaturday({ ...saturday, timeType: 'Custom Hours', dayStart: e });
  };
  const onChangeStartSunday = (e) => {
    setSunday({ ...sunday, timeType: 'Custom Hours', dayStart: e });
  };

  const onChangeEndMonday = (e) => {
    setMonday({ ...monday, timeType: 'Custom Hours', dayEnd: e });
  };
  const onChangeEndTuesday = (e) => {
    setTuesday({ ...tuesday, timeType: 'Custom Hours', dayEnd: e });
  };
  const onChangeEndWednesday = (e) => {
    setWednesday({ ...wednesday, timeType: 'Custom Hours', dayEnd: e });
  };
  const onChangeEndThursday = (e) => {
    setThursday({ ...thursday, timeType: 'Custom Hours', dayEnd: e });
  };
  const onChangeEndFriday = (e) => {
    setFriday({ ...friday, timeType: 'Custom Hours', dayEnd: e });
  };
  const onChangeEndSaturday = (e) => {
    setSaturday({ ...saturday, timeType: 'Custom Hours', dayEnd: e });
  };
  const onChangeEndSunday = (e) => {
    setSunday({ ...sunday, timeType: 'Custom Hours', dayEnd: e });
  };

  const handleChangeMonday = (event) => {
    setMonday({ ...monday, timeType: event.target.value });
    if (event.target.value === 'Custom Hours') setIsAllDays(false);
  };
  const handleChangeTuesday = (event) => {
    setTuesday({ ...tuesday, timeType: event.target.value });
    if (event.target.value === 'Custom Hours') setIsAllDays(false);
  };
  const handleChangeWednesday = (event) => {
    setWednesday({ ...wednesday, timeType: event.target.value });
    if (event.target.value === 'Custom Hours') setIsAllDays(false);
  };
  const handleChangeThursday = (event) => {
    setThursday({ ...thursday, timeType: event.target.value });
    if (event.target.value === 'Custom Hours') setIsAllDays(false);
  };
  const handleChangeFriday = (event) => {
    setFriday({ ...friday, timeType: event.target.value });
    if (event.target.value === 'Custom Hours') setIsAllDays(false);
  };
  const handleChangeSaturday = (event) => {
    setSaturday({ ...saturday, timeType: event.target.value });
    if (event.target.value === 'Custom Hours') setIsAllDays(false);
  };
  const handleChangeSunday = (event) => {
    setSunday({ ...sunday, timeType: event.target.value });
    if (event.target.value === 'Custom Hours') setIsAllDays(false);
  };

  const days = [
    {
      value: monday,
      onChangeStart: onChangeStartMonday,
      onChangeEnd: onChangeEndMonday,
      handleChange: handleChangeMonday
    },
    {
      value: tuesday,
      onChangeStart: onChangeStartTuesday,
      onChangeEnd: onChangeEndTuesday,
      handleChange: handleChangeTuesday
    },
    {
      value: wednesday,
      onChangeStart: onChangeStartWednesday,
      onChangeEnd: onChangeEndWednesday,
      handleChange: handleChangeWednesday
    },
    {
      value: thursday,
      onChangeStart: onChangeStartThursday,
      onChangeEnd: onChangeEndThursday,
      handleChange: handleChangeThursday
    },
    {
      value: friday,
      onChangeStart: onChangeStartFriday,
      onChangeEnd: onChangeEndFriday,
      handleChange: handleChangeFriday
    },
    {
      value: saturday,
      onChangeStart: onChangeStartSaturday,
      onChangeEnd: onChangeEndSaturday,
      handleChange: handleChangeSaturday
    },
    {
      value: sunday,
      onChangeStart: onChangeStartSunday,
      onChangeEnd: onChangeEndSunday,
      handleChange: handleChangeSunday
    }
  ];

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={0.5}>
        <Switch checked={isAllDays} onChange={handleChangeIsAllDays} inputProps={{ 'aria-label': 'controlled' }} />
        <Typography component="snap" variant="subtitle1" fontWeight="light" sx={{ color: 'text.secondary' }}>
          Select All days
        </Typography>
      </Stack>

      {days.map((day, index) => (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography component="snap" variant="subtitle2" fontWeight="light" sx={{ color: 'text.secondary' }}>
            {day.value.label}
          </Typography>
          <Stack direction="row" spacing={2} key={index}>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={day.value.timeType}
              onChange={day.handleChange}
              helperText="Please select the time"
              sx={{ minWidth: '170px' }}
            >
              {timeType.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            {day.value.timeType === 'Custom Hours' && (
              <>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    onChange={day.onChangeStart}
                    value={day.value.dayStart}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    onChange={day.onChangeEnd}
                    value={day.value.dayEnd}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </>
            )}
          </Stack>
        </Stack>
      ))}
    </>
  );
}

export default AddAvailability;
