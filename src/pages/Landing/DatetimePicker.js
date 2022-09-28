import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '100px',
    }
  }
}));

export default function DatetimePicker() {
  const [value, setValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <StyledTextField {...params}
                                                    hiddenLabel
                                                    id="filled-hidden-label-small"
                                                    defaultValue="Small"
                                                    variant="filled"
                                                    InputProps={{
                                                      style: {color: '#fff'}
                                                    }}
                                                    size='small' />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
