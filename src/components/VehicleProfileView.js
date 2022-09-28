import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Card, CardActionArea, Chip, IconButton, Paper, Stack } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useMutation } from '@apollo/client';
import { VEHICLE_ADD_TO_FAVOURITES, VEHICLE_REMOVE_FROM_FAVOURITES } from '../graphql/Queries';

function VehicleProfileView({ vehicle }) {
  const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);

  const [AddFavoritesToUser] = useMutation(VEHICLE_ADD_TO_FAVOURITES, {
    variables: { vehicleID: vehicle.id }
  });

  const [RemoveFavoritesFromUser] = useMutation(VEHICLE_REMOVE_FROM_FAVOURITES, {
    variables: { vehicleID: vehicle.id }
  });

  const CheckIfFavorites = () => {
    if (user.favorites !== undefined) {
      user.favorites.map((item) => {
        if (item.id === vehicle.id) {
          setIsFavorite(true);
        }
      });
    }
  };

  const onFavoriteClick = () => {
    if (isFavorite) {
      RemoveFavoritesFromUser().then(() => {
        setIsFavorite(false);
      });
    } else {
      AddFavoritesToUser().then(() => {
        setIsFavorite(true);
      });
    }
  };

  useEffect(() => CheckIfFavorites(), []);

  return (
    <Card sx={{ p: 0.5 }}>
      <CardActionArea>
        <Paper sx={{ height: '220px' }}>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            className={'carModal-slider mb-5'}
            style={{ borderRadius: '0', height: '100%' }}
          >
            {vehicle.images.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt="car-modal-img" />
              </div>
            ))}
          </Slider>
        </Paper>
        <Paper sx={{ p: 4 }}>
          <h2>
            {vehicle.make} {vehicle.model}
          </h2>
          <Stack direction="row" spacing={1} sx={{ mt: 1, width: '100%' }}>
            {vehicle.features !== undefined && (
              <>
                {vehicle.features.map((feature, index) => {
                  if (index < 2) return <Chip key={index} label={feature.name} />;
                  else if (index > 2) return <div key={index} />;
                  else return <Chip key={index} label={`+${vehicle.features.length - 2}`} />;
                })}
              </>
            )}
          </Stack>
          <div className="comapany-card-footer d-flex justify-content-between mt-4 pt-2">
            <span className="heart-review">
              <IconButton aria-label="add to favourites" onClick={onFavoriteClick} color="primary">
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </span>
            <h2 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'right' }}>
              <b>
                £{vehicle.hourlyRates}
                <span style={{ fontWeight: '500' }}>/hr</span>
                <span style={{ fontWeight: '500', marginLeft: '5px' }}>(£{vehicle.dailyRates}/day)</span>
              </b>
              <small style={{ opacity: '0.6', marginTop: '3px', fontSize: '13px', textDecoration: 'underline' }}>
                £653 total
              </small>
            </h2>
          </div>
        </Paper>
      </CardActionArea>
    </Card>
  );
}

export default VehicleProfileView;
