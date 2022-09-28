/* eslint-disable */
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import VehicleMarker from './VehicleMarker';

export default function SearchMap({ vehicles, handleOnMapScroll }) {
  const dispatch = useDispatch();

  const center = useSelector((state) => state.MapCenter);
  const selectedVehicleOnMap = useSelector((state) => state.SelectedVehicleOnMap);

  function onClickMapImage(key) {
    if (selectedVehicleOnMap === key) {
      dispatch({
        type: 'SelectedVehicleOnMap',
        payload: null
      });
      return;
    }

    dispatch({
      type: 'SelectedVehicleOnMap',
      payload: key
    });
  }

  const onBoundsChange = (data) => {
    handleOnMapScroll(data);
  };

  return (
    <GoogleMapReact
      defaultZoom={12}
      defaultCenter={center.coordinates}
      center={center.coordinates}
      onChildClick={onClickMapImage}
      onChange={onBoundsChange}
    >
      {vehicles?.map((vehicle) => (
        <VehicleMarker key={vehicle.id} lat={vehicle?.location?.lat} lng={vehicle?.location?.lng} vehicle={vehicle} />
      ))}
    </GoogleMapReact>
  );
}
