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
  Typography
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp, FilterListRounded } from '@mui/icons-material';

function DropDown({ list, selectType, type }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpenList, setOpenList] = useState(null);

  const handleClose = () => {
    setOpenList(null);
  };

  const handleClickListItem = (event) => {
    setOpenList(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenList(null);
    type === 'sort' && selectType(index);
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
          size="medium"
          onClick={handleClickListItem}
          endIcon={isOpenList ? <ArrowDropUp /> : <ArrowDropDown />}
          startIcon={list[selectedIndex].icon ? list[selectedIndex].icon : <></>}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {list[selectedIndex].name}
        </Button>
        <Menu keepMounted id="lock-menu" anchorEl={isOpenList} onClose={handleClose} open={Boolean(isOpenList)}>
          {list.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
              sx={{ minWidth: '150px' }}
            >
              <ListItemButton>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.name} sx={{ whiteSpace: 'nowrap', fontSize: '12px' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </Menu>
      </Stack>
    </div>
  );
}

export default DropDown;
