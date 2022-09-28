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
  Typography
} from '@mui/material';
import {
  ArrowDropDown,
  ArrowDropUp,
  Delete,
  Drafts,
  ElectricCar,
  PedalBike,
  Send,
  TwoWheeler
} from '@mui/icons-material';

function DropDown({title, icon}) {

  const [isOpen, setIsOpen] = useState(false);

  const bannerStyles = {
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '15px',
    position: 'absolute',
    marginTop: '20px',
    width: 'auto',
    zIndex: 10
  };

  const bannerStylesLocation = {
    alignItems: 'center',
    borderRadius: '4px',
    color: 'rgba(0, 0, 0, 0.75)',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '-0.5px',
    lineHeight: '1',
    marginBottom: '15px',
    padding: '5px 10px',
    transition: '200ms background, 200ms box-shadow, 200ms color',
    userSelect: ' none'
  };

  const list = [
    {
      name: 'Car',
      icon: <ElectricCar />
    },
    {
      name: 'Motocycle',
      icon: <TwoWheeler />
    },
    {
      name: 'Bicycle',
      icon: <PedalBike />
    }
  ];

  return (
    <div style={{
      width: 'auto',
      padding: '10px'
    }}>
      <Button variant='text' size='large' startIcon={icon} endIcon={isOpen ? <ArrowDropUp/> : <ArrowDropDown />} onClick={() => setIsOpen(!isOpen)}>
        {title}
      </Button>
      {isOpen &&
      <div style={bannerStyles}>
        <nav aria-label='main mailbox folders'>
          <List>
            {list.map((item, index) =>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </nav>
      </div>
      }
    </div>
  );
}

export default DropDown;