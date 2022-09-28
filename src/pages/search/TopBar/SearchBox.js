import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { TextField } from '@mui/material';

function SearchBox() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bannerStyles = {
    background: '#ffffff',
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
    color: 'rgba(0, 0, 0, 0.75)',
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
    <>

      <div style={{
        flex: '1',
        minWidth: '220px'
      }}>

        <TextField
          // size='small'
          fullWidth
          type='text'
          label='Location/ Post code'
          onChange={
            (event) => {
              getPlacePredictions({ input: event.target.value });
              setSearchSuggestionsOpen(event.target.value.length > 0);
            }
          }
          ref={searchRef}
        />

        {
          searchSuggestionsOpen === true && placePredictions.length > 0 && (
            <div style={bannerStyles}>
              {
                placePredictions.map((suggestion, index) => (
                  <div
                    style={bannerStylesLocation}
                    onClick={async () => {
                      setSearchSuggestionsOpen(false);
                      searchRef.current.value = suggestion.description;
                      searchRef.current.focus();
                      dispatch(
                        {
                          type: 'MapSearch',
                          payload: suggestion.description
                        }
                      );

                      await placesService.getDetails({ placeId: suggestion.place_id },
                        (placeDetails) => {
                          dispatch(
                            {
                              type: 'MapCenter',
                              payload: {
                                name: suggestion.description,
                                coordinates: [
                                  placeDetails.geometry.location.lat(),
                                  placeDetails.geometry.location.lng()
                                ]
                              }
                            }
                          );
                          navigate('search');
                        }
                      );
                    }}
                    key={index}
                    tabIndex='0'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' width='24'
                         height='24' viewBox='0 0 24 24' fill='none'
                         stroke='currentColor' strokeWidth='2'
                         strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' />
                      <circle cx='12' cy='10' r='3' />
                    </svg>
                    {suggestion.description}
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </>
  );
}

export default SearchBox