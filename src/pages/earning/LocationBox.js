import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { Card, CardContent, Stack, TextField } from '@mui/material';
import LocationMap from './LocationMap';
import { GoogleApiWrapper } from 'google-maps-react';
import LocationSearchModal from './GoogleMap';
import Geocode from 'react-geocode';
import { useTheme } from '@mui/material/styles';

Geocode.setApiKey('AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U');
Geocode.enableDebug();

function LocationBox({ map, location, setMap }) {
  const theme = useTheme();

  useEffect(() => {
    if (location?.lat && location?.lng) {
      const lat = Number(location?.lat);
      const lng = Number(location?.lng);
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address,
            addressArray = response.results[0].address_components,
            city = getCity(addressArray),
            area = getArea(addressArray),
            state = getState(addressArray);
          setMap({
            ...map,
            address: address ? address : '',
            area: area ? area : '',
            city: city ? city : '',
            state: state ? state : '',
            markerPosition: {
              lat: lat,
              lng: lng
            },
            mapPosition: {
              lat: lat,
              lng: lng
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition((position) => {
          Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
            (response) => {
              const address = response.results[0].formatted_address,
                addressArray = response.results[0].address_components,
                city = getCity(addressArray),
                area = getArea(addressArray),
                state = getState(addressArray);
              setMap({
                ...map,
                address: address ? address : '',
                area: area ? area : '',
                city: city ? city : '',
                state: state ? state : '',
                mapPosition: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                },
                markerPosition: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              });
            },
            (error) => {
              console.error('Errors', error);
            }
          );
        });
    }
  }, []);

  const getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  const getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  const getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray);
        setMap({
          ...map,
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = getCity(addressArray),
      area = getArea(addressArray),
      state = getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    // Set these values in the state.
    setMap({
      ...map,
      address: address ? address : '',
      area: area ? area : '',
      city: city ? city : '',
      state: state ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      }
    });
  };

  const bannerStyles = {
    background: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    left: '0',
    padding: '15px',
    margin: '20px',
    position: 'absolute',
    marginTop: '20px',
    width: '-webkit-fill-available',
    zIndex: 1
  };

  const bannerStylesLocation = {
    alignItems: 'center',
    borderRadius: '4px',
    color: theme.palette.text.primary,
    cursor: 'pointer',
    display: 'flex',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '-0.5px',
    lineHeight: '1',
    marginBottom: '15px',
    padding: '5px 10px',
    transition: '200ms background, 200ms box-shadow, 200ms color',
    userSelect: ' none'
  };

  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);

  const { placesService, placePredictions, getPlacePredictions } = useGoogle({
    apiKey: 'AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U',
    options: {
      types: ['(regions)'],
      componentRestrictions: { country: 'uk' }
    }
  });

  const searchRef = useRef(null);

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <div
        style={{
          flex: '1',
          minWidth: '320px',
          marginBottom: '5px'
        }}
      >
        <TextField
          // size='small'
          fullWidth
          type="text"
          label="Location/ Post code"
          onChange={(event) => {
            getPlacePredictions({ input: event.target.value });
            setSearchSuggestionsOpen(event.target.value.length > 0);
          }}
          ref={searchRef}
        />

        {searchSuggestionsOpen === true && placePredictions.length > 0 && (
          <div style={bannerStyles}>
            {placePredictions.map((suggestion, index) => (
              <div
                style={bannerStylesLocation}
                onClick={async () => {
                  setSearchSuggestionsOpen(false);
                  searchRef.current.value = suggestion.description;
                  searchRef.current.focus();
                  await placesService.getDetails({ placeId: suggestion.place_id }, (placeDetails) => {
                    onPlaceSelected(placeDetails);
                  });
                }}
                key={index}
                tabIndex="0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: 8 }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {suggestion.description}
              </div>
            ))}
          </div>
        )}
      </div>
      <p>
        address:
        {map.address}
      </p>

      <Card>
        <CardContent sx={{ height: '300px', p: 0 }} style={{ paddingBottom: 0 }}>
          <LocationSearchModal map={map} setMap={setMap} onMarkerDragEnd={onMarkerDragEnd} />
        </CardContent>
      </Card>
    </Stack>
  );
}

export default LocationBox;
//
// export default GoogleApiWrapper(
//   {
//     apiKey: ('AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U')
//   }
// )(LocationBox);
