import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';
import DropDown from './DropDown';
import SearchBox from './SearchBox';
import { ArrowDropDown, ArrowDropUp, CarRental, FilterList, FilterRounded, SortRounded } from '@mui/icons-material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  spacing: 5
}));

// ----------------------------------------------------------------------

function Index(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack sx={{ flexGrow: 1, flexDirection: 'column' }}>
      <RootStyle>
        <DropDown title="Vehicle" icon={<CarRental />} />
        <DropDown title="Price" />
        <Button
          variant="text"
          size="large"
          startIcon={<FilterList />}
          endIcon={isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            width: 'auto',
            mx: '10px'
          }}
        >
          Filter
        </Button>
        <DropDown title="Sort By" icon={<SortRounded />} />
      </RootStyle>

      {isOpen && (
        <Box sx={{ width: '100%' }}>
          <Stack sx={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <DropDown title="Make" />
            <DropDown title="Gear Box" />
            <DropDown title="Fuel Type" />
            <DropDown title="Vehicle" />
          </Stack>
        </Box>
      )}
    </Stack>
  );
}

export default Index;
