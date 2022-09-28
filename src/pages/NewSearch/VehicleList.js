import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import VehicleCard from '../../components/Cards/VehicleCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function VehiclesList(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { panelWidth, vehicles } = props;

  console.log('MATEEN', panelWidth, vehicles);
  const selectedVehicleOnMap = useSelector((state) => state.SelectedVehicleOnMap);

  const setSelectedVehicleOnMap = (key) => {
    dispatch({
      type: 'SelectedVehicleOnMap',
      payload: key
    });
  };

  useEffect(() => setSelectedVehicleOnMap(0), []);

  const getCardSize = () => {
    if (panelWidth > 1200) return 3;
    if (panelWidth > 900) return 4;
    if (panelWidth > 600) return 6;
    return 12;
  };

  return (
    <div
      className={`toggle-double-grid ${
        panelWidth > 1100 ? 'c4' : panelWidth > 900 ? 'c3' : panelWidth > 600 ? 'c2' : 'c1'
      }`}
    >
      <Grid container justifyContent="flex-start" spacing={1} sx={{ pb: 0.5, pt: 0.2 }}>
        {vehicles?.length > 0 ? (
          vehicles.map((vehicle, index) => {
            const isSelected = selectedVehicleOnMap === vehicle.id;

            return (
              <Grid
                key={index}
                spacing={2}
                item
                xs={getCardSize()}
                onClick={() => {
                  if (!isSelected) setSelectedVehicleOnMap(vehicle.id);
                  else navigate(`/vehicle/${vehicle.id}`);
                }}
                className="cpointer"
              >
                <VehicleCard vehicle={vehicle} isSelected={isSelected} />
              </Grid>
            );
          })
        ) : (
          <h4 className="empty-vehicle-text">No vehicles available, try changing your dates or location</h4>
        )}
      </Grid>
    </div>
  );
}

export default VehiclesList;
