import React, { useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useTheme } from '@mui/material/styles';

const VumahAuto = (props) => {
  const theme = useTheme();
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading, } = useGoogle({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "uk" },
    },
  });
  const [value, setValue] = useState("");
  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);

  const bannerSearchSuggestions = {
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    left: '0',
    padding: '15px',
    position: 'absolute',
    top: 'calc(100% + 20px)',
    width: '100%',
  }

  const input = {
    backgroundColor: '#212B3600',
    color: '#fff',
    fontSize: '18px',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightLight,
    width: '100%',
    height: '50px',
    borderRadius: '50px',
    padding: '0 30px',
    cursor: 'pointer',
    border: '1px solid #ff7500c7',
    transition: 'all 0.5s ease',
    boxShadow: 'inset 0.1px 0.1px 0.1px #bdbdbd, inset 0.1px 0.1px 3px #bdbdbd',
  }

  const bannerSearchLocation = {
    alignItems: 'center',
    borderRadius: '4px',
    color: 'rgba(0, 0, 0, 0.75)',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '-0.5px',
    lineHeight: '1',
    marginBottom: '15px',
    padding: '5px 10px',
    transition: '200ms background, 200ms box-shadow, 200ms color',
    userSelect: 'none',
  }

  return (
    <div style={{position: 'relative', width: '100%', maxWidth: 400}}>
      <input
        type="search"
        style={input}
        value={value}
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
          setValue(evt.target.value);
          setSearchSuggestionsOpen(true)
        }}
        placeholder="Search for a city or a postcode"
      />
      {
        searchSuggestionsOpen && placePredictions.length > 0 && (
          <div style={bannerSearchSuggestions}>
            {
              placePredictions.map((suggestion) => (
                <div
                  style={bannerSearchLocation}
                  onClick={() => {
                    setValue(suggestion.description)
                    setSearchSuggestionsOpen(false)
                  }}
                  key={suggestion.description}
                  tabIndex="0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  { suggestion.description }
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default VumahAuto
