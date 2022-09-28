import React from 'react';
import { Bluetooth, DirectionsCar, ElectricCar, GpsFixed, HdrAuto, Usb, Api } from '@mui/icons-material';
import { Checkbox, Grid, Stack, Typography } from '@mui/material';

function AddFeatures({ features, setFeatures, vehicleType }) {
  const handleOnFeature = (e) => {
    const newFeatures = [];
    features.map((item) => {
      let f = item;
      if (item.name === e.target.name) {
        f = {
          ...item,
          checked: !item.checked
        };
      }
      newFeatures.push(f);
    });
    setFeatures(newFeatures);
  };

  const featureIcons = [
    {
      name: 'Bluetooth',
      icon: <Bluetooth />
    },
    {
      name: 'Automatic gearbox',
      icon: <DirectionsCar />
    },
    {
      name: 'Autopilot',
      icon: <HdrAuto />
    },
    {
      name: 'USB input',
      icon: <Usb />
    },
    {
      name: 'Electric',
      icon: <ElectricCar />
    },
    {
      name: 'GPS',
      icon: <GpsFixed />
    }
  ];

  const getFeatureIcon = (name) => {
    let icon = <></>;
    featureIcons.map((item) => {
      if (item.name === name) {
        icon = item.icon;
        return icon;
      }
    });
    return icon;
  };

  return (
    <>
      {features.map((item, index) => (
        <Grid item xs={6} key={index}>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Checkbox name={item.name} checked={item.checked} onChange={handleOnFeature} />
            {vehicleType !== 'CAMPERVAN' && getFeatureIcon(item.name)}
            <Typography component="snap" variant="subtitle2" fontWeight="light" sx={{ color: 'text.secondary' }}>
              {item.name}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </>
  );
}

export default AddFeatures;
