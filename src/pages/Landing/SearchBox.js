import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

function SearchBox({ searchRef }) {
  const dispatch = useDispatch();

  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);

  const { placesService, placePredictions, getPlacePredictions } = useGoogle({
    apiKey: 'AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U',
    options: {
      types: ['(regions)'],
      componentRestrictions: { country: 'uk' }
    }
  });

  return (
    <>
      <input
        type="search"
        onChange={(event) => {
          getPlacePredictions({ input: event.target.value });
          setSearchSuggestionsOpen(event.target.value.length > 0);
        }}
        placeholder="Search for a city or a postcode"
        ref={searchRef}
      />
      {searchSuggestionsOpen === true && placePredictions.length > 0 && (
        <div className="banner-search-suggestions">
          {placePredictions.map((suggestion, index) => (
            <div
              className="banner-search-location"
              onClick={async () => {
                setSearchSuggestionsOpen(false);
                searchRef.current.value = suggestion.description;
                searchRef.current.focus();
                dispatch({
                  type: 'MapSearch',
                  payload: suggestion.description
                });

                await placesService.getDetails({ placeId: suggestion.place_id }, (placeDetails) => {
                  dispatch({
                    type: 'MapCenter',
                    payload: {
                      name: suggestion.description,
                      coordinates: [placeDetails.geometry.location.lat(), placeDetails.geometry.location.lng()]
                    }
                  });
                  // navigate('search');
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
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBox;
