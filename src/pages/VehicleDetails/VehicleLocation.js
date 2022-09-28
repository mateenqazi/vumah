import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';

import zone from '../../assets/svg/Zone.svg';

const VehicleLocation = ({ map }) => {
  const AsyncMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: parseFloat(map.lat, 10), lng: parseFloat(map.lng, 10) }}>
        <Marker
          key="vehicle"
          name={'Vehicle Location'}
          icon={{
            url: zone,
            anchor: new google.maps.Point(50, 50),
            scaledSize: new google.maps.Size(100, 100)
          }}
          position={{
            lat: parseFloat(map.lat, 10),
            lng: parseFloat(map.lng, 10)
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
        containerElement={<div style={{ height: 300 }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default VehicleLocation;
