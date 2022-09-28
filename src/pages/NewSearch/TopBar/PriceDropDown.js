import React, { useState } from 'react';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Box,
  Slider,
  Container,
  TextField,
  Menu,
  Switch,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const prices = [
  { value: 0, label: '£0' },
  { value: 25, label: '250' },
  { value: 50, label: '500' },
  { value: 75, label: '750' },
  { value: 100, label: '1000' }
];

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' }
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

function valuePrice(value) {
  return value > 0 ? `£${value}` : value;
}

function valueLabelFormatPrice(value) {
  return value > 0 ? `£${value}` : value;
}

// ----------------------------------------------------------------------

function PriceDropDown() {
  const [isOpen, setIsOpen] = useState(null);
  const [isDailyPrice, setIsDailyPrice] = React.useState(false);

  const handleClose = () => {
    setIsOpen(null);
  };

  const [price, setPrice] = useState([10, 50]);
  const [textPrice, setTextPrice] = useState([100, 500]);

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
    setTextPrice([newValue[0] * 10, newValue[1] * 10]);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <div
      style={{
        width: 'auto',
        padding: '4px'
      }}
    >
      <Button
        variant="text"
        size="medium"
        endIcon={isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
        onClick={(event) => setIsOpen(event.currentTarget)}
        sx={{
          whiteSpace: 'nowrap'
        }}
      >
        Price
      </Button>
      <Menu keepMounted id="lock-menu" anchorEl={isOpen} onClose={handleClose} open={Boolean(isOpen)} sx={{ mt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': { mx: '8px !important' },
            px: 2,
            py: 5,
            minHeight: 180,
            minWidth: 300,
            maxWidth: 500
          }}
        >
          <Box sx={{ width: '100%', mt: 4 }}>
            <Slider
              scale={(x) => x * 10}
              step={10}
              marks={prices}
              value={price}
              onChange={handleChangePrice}
              valueLabelDisplay="on"
              getAriaValueText={valuePrice}
              valueLabelFormat={valueLabelFormatPrice}
            />
          </Box>
          <Box
            sx={{
              p: 2,
              width: '100%',
              borderRadius: 1,
              bgcolor: 'grey.50012'
            }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={1.5}>
              <TextField
                fullWidth
                label="Min Price"
                onChange={(event) => {
                  setTextPrice([event.target.value, textPrice[1]]);
                  setPrice([event.target.value / 10, price[1]]);
                }}
                value={textPrice[0]}
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
              />
              <TextField
                fullWidth
                label="Max Price"
                onChange={(event) => {
                  setTextPrice([textPrice[0], event.target.value]);
                  setPrice([price[0], event.target.value / 10]);
                }}
                value={textPrice[1]}
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>
                }}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              mt: 1,
              p: 2,
              width: '100%',
              borderRadius: 1,
              bgcolor: 'grey.50012'
            }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={1.5}>
              <Box sx={{ flexGrow: 1 }}>
                <Stack alignItems="center" direction="row" spacing={0.5}>
                  <Switch
                    checked={isDailyPrice}
                    onChange={() => setIsDailyPrice(!isDailyPrice)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography component="snap" variant="subtitle1" fontWeight="light">
                    {!isDailyPrice ? 'Set to hourly rates' : 'Set to daily rates'}
                  </Typography>
                </Stack>
              </Box>
              <Button type="button" variant="contained" onClick={handleClose}>
                Apply
              </Button>
            </Stack>
          </Box>
        </Box>
      </Menu>
    </div>
  );
}

export default PriceDropDown;
