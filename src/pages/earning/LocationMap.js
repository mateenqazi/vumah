import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleApiWrapper } from 'google-maps-react';
import { CardContent } from '@mui/material';

function LocationMap(props) {
  return (
    <CardContent sx={{height: '300px', p: 0}} style={{paddingBottom: 0}}>
      <GoogleMapReact
        defaultZoom={12}
        defaultCenter={[51.509865, -0.118092]}
      />
    </CardContent>
  );
}

// export default LocationMap;

export default LocationMap