import React from 'react';
import { CardActionArea, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';

function Notification({ notify, read }) {
  const theme = useTheme();

  const getColor = () => {
    if (notify?.isRead) {
      return `${theme.palette.mode === 'dark' ? '#1b222b' : '#f6f6f6'}`;
    } else {
      return `${theme.palette.mode === 'dark' ? theme.palette.background.paper : '#e9e8e8'}`;
    }
  };

  return (
    <CardActionArea
      onClick={() => read(notify)}
      sx={{ p: 2, borderRadius: '8px' }}
      style={{
        background: getColor()
      }}
    >
      <Stack spacing={2}>
        <Typography variant={'body1'} component="snap">
          {notify?.message}
        </Typography>
        <Typography variant={'caption'} component="snap">
          {moment(new Date(Number(notify?.date))).format('DD/MMM/YYYY HH:mm A')}
        </Typography>
      </Stack>
    </CardActionArea>
  );
}

export default Notification;
