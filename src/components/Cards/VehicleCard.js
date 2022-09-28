import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import CarouselVehicles from '../../pages/Favorites/CarouselVehicles';
import {
  Api,
  Bluetooth,
  Close,
  DirectionsCar,
  ElectricCar,
  Favorite,
  FavoriteBorder,
  GpsFixed,
  HdrAuto,
  Share,
  Usb
} from '@mui/icons-material';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@apollo/client';
import { VEHICLE_ADD_TO_FAVOURITES, VEHICLE_REMOVE_FROM_FAVOURITES } from '../../graphql/Queries';
import { alpha } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../@material-extend';
import { useSelector } from '../../redux/store';
import { fCurrency } from '../../utils/formatNumber';
import { getCostsDroid } from '../../utils/TimeCalc';

function VehicleCard({ vehicle, isSelected }) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const dateRange = useSelector((state) => state.VehicleBookingTime);
  const startDate = moment(dateRange.fromDate).format('DD/MM/yyyy');
  const endDate = moment(dateRange.toDate).format('DD/MM/yyyy');
  const startTime = moment(dateRange.fromDate).format('HH');
  const endTime = moment(dateRange.toDate).format('HH');

  const [isFavorite, setIsFavorite] = useState(false);

  const [AddFavoritesToUser] = useMutation(VEHICLE_ADD_TO_FAVOURITES, {
    variables: { vehicleID: vehicle.id }
  });

  const [RemoveFavoritesFromUser] = useMutation(VEHICLE_REMOVE_FROM_FAVOURITES, {
    variables: { vehicleID: vehicle.id }
  });

  const CheckIfFavorites = () => {
    if (user.favorites !== undefined)
      user.favorites.map((item) => {
        if (item.id === vehicle.id) {
          setIsFavorite(true);
        }
      });
  };

  const onFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      RemoveFavoritesFromUser().then(() => {
        setIsFavorite(false);
        enqueueSnackbar('Vehicle removed from favorites', {
          variant: 'success'
        });
      });
    } else {
      AddFavoritesToUser().then(() => {
        setIsFavorite(true);
        enqueueSnackbar('Vehicle added to favorites', {
          variant: 'success'
        });
      });
    }
  };

  useEffect(() => CheckIfFavorites(), []);

  const totalPrice = (rate) => {
    if (startDate === endDate && startTime === endTime) {
      return <Typography>Total: £0</Typography>;
    } else if (startDate === endDate) {
      const time1 = moment(dateRange.fromDate)._d;
      const time2 = moment(dateRange.toDate)._d;
      const totalHours = Math.abs(time1 - time2) / 36e5;
      const totalHourlyRate = rate * Math.abs(totalHours);
      const absoluteTotalHours = Math.round(totalHourlyRate);
      return <Typography>Total: £{absoluteTotalHours}</Typography>;
    } else if (startDate !== endDate) {
      const date1 = moment(dateRange.fromDate)._d;
      const date2 = moment(dateRange.toDate)._d;
      const differenceInTime = date2.getTime() - date1.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      const totalDays = Math.round(differenceInDays);

      const totalRate = rate * Math.abs(totalDays);
      return <Typography>Total: £{totalRate}</Typography>;
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: '10px',
          boxShadow: (theme) => (isSelected ? theme.customShadows.primary : ''),
          border: (theme) => (isSelected ? `solid 2px ${alpha(theme.palette.primary.dark, 0.44)}` : '')
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {vehicle.images !== undefined && <CarouselVehicles images={vehicle.images} />}
        </CardContent>
        <CardActions disablespacing sx={{ px: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
              marginRight: 'auto'
            }}
          >
            <Grid container justifyContent="flex-start">
              <Grid item xs={12}>
                <Stack>
                  <Typography
                    sx={{
                      maxWidth: '260px',
                      mx: 0.5,
                      fontWeight: '700',
                      lineHeight: '1.5',
                      fontSize: '1rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                      // color: 'text.secondary'
                    }}
                    className="hover-orange-color"
                  >
                    {vehicle.make} {vehicle.model}.
                  </Typography>
                  <Typography variant="caption" sx={{ mx: 0.5, color: 'text.secondary' }}>
                    {vehicle.year}.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} sx={{ mt: 1, minHeight: '24px' }}>
                  {vehicle?.features !== undefined && (
                    <>
                      {vehicle?.features?.map((feature, index) => {
                        if (index < 2)
                          return <Chip key={index} label={feature?.name} sx={{ maxWidth: '100px' }} size="small" />;
                        else if (index > 2) return '';
                        // else return <Chip key={index} label={`+${vehicle.features.length - 2}`} />;
                      })}
                      {vehicle?.features?.length > 2 && (
                        <Chip label={`+${vehicle?.features?.length - 2}`} size="small" />
                      )}
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardActions>
        <CardActions disablespacing sx={{ px: 2, pb: 3 }}>
          <IconButton aria-label="add to favourites" onClick={onFavoriteClick} color="primary">
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              my: 0.5,
              marginLeft: 'auto'
            }}
          >
            <Stack sx={{ alignItems: 'flex-end' }}>
              <Typography
                component="snap"
                variant="subtitle2"
                align="center"
                sx={{ mx: 1, color: 'text.secondary', whiteSpace: 'nowrap', fontWeight: 600 }}
              >
                £{vehicle?.dailyRates}/day <snap style={{ fontWeight: 300 }}>(£{vehicle?.hourlyRates}/hr)</snap>
              </Typography>
              <Typography
                component="snap"
                variant="caption"
                align="center"
                sx={{ mx: 1, color: 'text.secondary', whiteSpace: 'nowrap', fontWeight: 500 }}
              >
                £{fCurrency(getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates))} total
              </Typography>
            </Stack>
          </Box>
        </CardActions>
        {/*<Typography sx={{ float: 'right', marginRight: '3rem', marginBottom: '25px' }}>*/}
        {/*  {startDate === endDate && startTime === endTime*/}
        {/*    ? totalPrice(0)*/}
        {/*    : startDate === endDate*/}
        {/*    ? totalPrice(vehicle.hourlyRates)*/}
        {/*    : totalPrice(vehicle.dailyRates)}*/}
        {/*</Typography>*/}
      </Card>
    </>
  );
}

export default VehicleCard;
