import React, { useState } from 'react';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { ArrowDropDown, ArrowDropUp, FilterListRounded } from '@mui/icons-material';

function MultiSelect({ title, icon, list, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpenList, setOpenList] = useState(null);

  const handleClose = () => {
    setOpenList(null);
  };

  const handleClickListItem = (event) => {
    setOpenList(event.currentTarget);
  };

  return (
    <div
      style={{
        width: 'auto',
        padding: '10px'
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button
          variant="text"
          size="large"
          onClick={handleClickListItem}
          endIcon={isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          startIcon={list[selectedIndex].icon ? list[selectedIndex].icon : <></>}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {list[selectedIndex].name}
        </Button>
        <Menu
          keepMounted
          id="lock-menu"
          anchorEl={isOpenList}
          onClose={handleClose}
          open={Boolean(isOpenList)}
          autoFocus={true}
        >
          <ListItem>
            <Typography variant="h5" sx={{ whiteSpace: 'nowrap' }}>
              {title}
            </Typography>
          </ListItem>

          <FormGroup>
            <div style={{ padding: '10px' }}>
              {type === 'Car' && (
                <>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Bluetooth"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Automatic Gearbox"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Autopilot"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="USB Input"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Electric"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="GPS"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                </>
              )}
              {type === 'Campervan' && (
                <>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Toilet"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Shower"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Kitchen Unit"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Hot Water"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Heating"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Suitable for tall people"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Bicycle Rack"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="A/C in cabin"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="A/C in motorhome compartment"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Bluetooth"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Automatic gearbox"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Autopilot"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="USB input"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="GPS"
                    sx={{ whiteSpace: 'nowrap', fontSize: '12px' }}
                  />
                </>
              )}
            </div>
          </FormGroup>
        </Menu>
      </Stack>
    </div>
  );
}

export default MultiSelect;
