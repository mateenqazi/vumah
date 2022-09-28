/* eslint-disable */
import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import dummyData from '../dummyData';
import { useDispatch, useSelector } from 'react-redux';

export default function Map(props) {
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

  return (
    <GoogleMapReact defaultZoom={12} defaultCenter={center.coordinates} onChildClick={onClickMapImage}>
      {dummyData.map((place) => (
        <Marker key={place.id} lat={place.geometry.location.lat} lng={place.geometry.location.lng} place={place} />
      ))}
    </GoogleMapReact>
  );
}
