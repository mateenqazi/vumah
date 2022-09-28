import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';

import zone from '../../assets/svg/Zone.svg';

Geocode.setApiKey('AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U');
Geocode.enableDebug();

const LocationSearchModal = ({ map, onMarkerDragEnd }) => {
  const AsyncMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={map.zoom} defaultCenter={{ lat: map.mapPosition.lat, lng: map.mapPosition.lng }}>
        {/*Marker*/}
        <Marker
          key="vehicle"
          name={'Vehicle Location'}
          icon={{
            url: zone,
            anchor: new google.maps.Point(50, 50),
            scaledSize: new google.maps.Size(100, 100)
          }}
          onDragEnd={onMarkerDragEnd}
          draggable={true}
          position={{
            ...map.markerPosition
          }}
        />
      </GoogleMap>
    ))
  );

  return (
    <div style={{ padding: '0', margin: '0 auto', maxWidth: 1500 }}>
      <AsyncMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U&libraries=places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: map.height }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default LocationSearchModal;
