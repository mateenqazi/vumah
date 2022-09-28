import React from 'react';
import InfoWindow from './InfoWindow';
import { useSelector } from 'react-redux';

export default function Marker(props) {
  const { place } = props;

  const selectedVehicleOnMap = useSelector((state) => state.SelectedVehicleOnMap);

  return (
    <>
      <div
        className={
          selectedVehicleOnMap === place.id ? 'map-position-label map-position-label--active' : 'map-position-label'
        }
      >
        £100
      </div>
      {selectedVehicleOnMap === place.id && <InfoWindow place={place} />}
    </>
  );
}
