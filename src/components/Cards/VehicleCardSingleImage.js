import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
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
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@apollo/client';
import { VEHICLE_ADD_TO_FAVOURITES, VEHICLE_REMOVE_FROM_FAVOURITES } from '../../graphql/Queries';
import { alpha } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../@material-extend';
import { useSelector } from '../../redux/store';
import moment from 'moment';
import { Link } from 'react-router-dom';

function VehicleCardSingleImage({ vehicle, isSelected }) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

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

  const onFavoriteClick = () => {
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

  // Total price function is for the calculation of total price ccording to number of seklected days or hours

  // const totalPrice = (rate) => {
  //   if (startDate === endDate && startTime === endTime) {
  //     return <Typography>Total: £0</Typography>;
  //   } else if (startDate === endDate) {
  //     const time1 = moment(dateRange.fromDate)._d;
  //     const time2 = moment(dateRange.toDate)._d;
  //     const totalHours = Math.abs(time1 - time2) / 36e5;
  //     const totalHourlyRate = rate * Math.abs(totalHours);
  //     const absoluteTotalHours = Math.round(totalHourlyRate);
  //     return <Typography>Total: £{absoluteTotalHours}</Typography>;
  //   } else if (startDate !== endDate) {
  //     const date1 = moment(dateRange.fromDate)._d;
  //     const date2 = moment(dateRange.toDate)._d;
  //     const differenceInTime = date2.getTime() - date1.getTime();
  //     const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  //     const totalDays = Math.round(differenceInDays);

  //     const totalRate = rate * Math.abs(totalDays);
  //     return <Typography>Total: £{totalRate}</Typography>;
  //   }
  // };

  return (
    <>
      {/* <Link to={`/vehicle/${vehicle.id}`}> */}
      <Card
        sx={{
          borderRadius: '10px',
          m: 1,
          maxWidth: '450px',
          boxShadow: (theme) => (isSelected ? theme.customShadows.primary : ''),
          border: (theme) => (isSelected ? `solid 2px ${alpha(theme.palette.primary.dark, 0.44)}` : '')
        }}
      >
        <CardActionArea sx={{ boxShadow: 'none', p: 0 }}>
          <div style={{ minHeight: 260 }}>
            {vehicle.images[0] !== undefined && (
              <Box
                component="img"
                alt={vehicle.images[0].url}
                src={vehicle.images[0].url}
                sx={{
                  width: '100%',
                  height: 260,
                  objectFit: 'cover',
                  boxShadow: 'none'
                }}
              />
            )}
          </div>
          <CardActions disablespacing sx={{ px: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                my: 2,
                marginRight: 'auto'
              }}
            >
              <Grid container justifyContent="flex-start">
                <Grid item xs={12}>
                  <Stack>
                    <Typography
                      sx={{
                        maxWidth: '240px',
                        mx: 0.5,
                        fontWeight: '700',
                        lineHeight: '1.5',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
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
              <Typography component="snap" variant="subtitle1" align="center" sx={{ mx: 1, color: 'text.secondary' }}>
                £{vehicle.dailyRates}/day (£{vehicle.hourlyRates}/hr)
              </Typography>
            </Box>
          </CardActions>
        </CardActionArea>
      </Card>
      {/* </Link> */}
    </>
  );
}

export default VehicleCardSingleImage;
