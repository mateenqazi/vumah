import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import GoogleMap from './map';
import { useDispatch, useSelector } from 'react-redux';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

function SearchBar(props) {

  const { setMap } = props;

  const dispatch = useDispatch();

  const searchText = useSelector(state => state.MapSearch);

  const [mapLoad, setMapLoad] = useState(true);
  const [search, setSearch] = useState(searchText);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('Vehicle');
  const [showFilters, setShowFilters] = useState(false);

  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);

  const { placesService, placePredictions, getPlacePredictions } = useGoogle({
    // apiKey: 'AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U',
    options: {
      types: ['(regions)'],
      componentRestrictions: { country: 'uk' }
    }
  });

  function dropDownToggle() {
    setDropdownOpen(prevState => !prevState);
  };

  function dropDownToggle2() {
    setDropdownOpen2(prevState => !prevState);
  };

  return (
    <>
      <div className='row align-items-center' style={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        <div style={{ width: '120px', paddingRight: '0', paddingLeft: '10px' }}>
          <Dropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
            <DropdownToggle
              className='btn btn-light select-outer my-button'
              style={{
                borderRadius: '10px',
                height: '50px',
                paddingRight: '45px'
              }}
            >
              Vehicle
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem><i className='fas fa-car-side' />&nbsp;&nbsp;Car</DropdownItem>
              <DropdownItem><i className='fas fa-motorcycle' />&nbsp;&nbsp;Motorbike</DropdownItem>
              <DropdownItem><i className='fas fa-bicycle' />&nbsp;&nbsp;Bicycle</DropdownItem>
              <DropdownItem><i className='fas fa-rv' />&nbsp;&nbsp;Campervan</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div style={{
          flex: '1',
          minWidth: '350px'
        }}>
          <div className='banner-search-field'>
            <input
              type='search'
              value={search}
              onChange={
                (event) => {
                  setSearch(event.target.value);
                  getPlacePredictions({ input: event.target.value });
                  setSearchSuggestionsOpen(event.target.value.length > 0);
                }
              }
              placeholder='Search for a city or a postcode'
            />
            {
              searchSuggestionsOpen === true && placePredictions.length > 0 && (
                <div className='banner-search-suggestions' style={{ zIndex: '10' }}>
                  {
                    placePredictions.map((suggestion, index) => (
                      <div
                        className='banner-search-location'
                        onClick={() => {
                          setSearchSuggestionsOpen(false);
                          setSearch(suggestion.description);

                          try {
                            placesService.getDetails({ placeId: suggestion.place_id },
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
                                setMapLoad(!mapLoad);
                                setMap(
                                  <>
                                    {mapLoad ?
                                      <div
                                        className='search-filter-map'>
                                        <GoogleMap />
                                      </div>
                                      :
                                      <GoogleMap />
                                    }
                                  </>
                                );
                              }
                            );
                          } catch (e) {}

                          dispatch(
                            {
                              type: 'MapSearch',
                              payload: suggestion.description
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
                          <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z'/>
                          <circle cx='12' cy='10' r='3'/>
                        </svg>
                        {suggestion.description}
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>

        <div style={{ width: '150px', paddingRight: '0' }}>
          <button
            className='btn btn-light select-outer my-button'
            onClick={() => setShowFilters(!(showFilters))}
            style={{
              borderRadius: '10px',
              height: '50px',
              paddingRight: '45px'
            }}
          >
            <i
              className='fas fa-sort-alt'
              style={{
                fontSize: '18px',
                color: 'var(--secondary-color)',
                marginRight: '10px'
              }} />
            Filters
          </button>
        </div>

        <div style={{ width: '180px', paddingLeft: '0', paddingRight: '0' }}>
          <div className='search-filter-grid contact-form-field w-100' style={{
            margin: '0'
          }}>
            <div className='select-outer pl-0 sortBy-field '>
              <i className='fas fa-sort-alt'/>
              <select>
                <option>Sort by</option>
                <option>Sort by</option>
                <option>Sort by</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {showFilters && (
        <div className='d-flex flex-wrap mb-4'>
          {selectedVehicle !== 'Bicycle' &&
          <div className='search-filter-grid contact-form-field'>
            <div className='select-outer'>
              <select>
                <option>Make</option>
                <option>Make</option>
                <option>Make</option>
              </select>
            </div>
          </div>}

          {selectedVehicle !== 'Bicycle' &&
          <div className='search-filter-grid contact-form-field '>
            <div className='select-outer'>
              <select>
                <option>Model</option>
                <option>Model</option>
                <option>Model</option>
              </select>
            </div>
          </div>}

          {selectedVehicle !== 'Bicycle' &&
          <div className='search-filter-grid contact-form-field '>
            <div className='select-outer'>
              <select>
                <option>Gearbox</option>
                <option>Gearbox</option>
                <option>Gearbox</option>
              </select>
            </div>
          </div>}

          {selectedVehicle !== 'Bicycle' && selectedVehicle !== 'Campervan' && selectedVehicle !== 'Motorbike' &&
          <div className='search-filter-grid contact-form-field '>
            <div className='select-outer'>
              <select>
                <option>Body type</option>
                <option>Body type</option>
                <option>Body type</option>
              </select>
            </div>
          </div>}

          {selectedVehicle === 'Campervan' &&
          <div className='search-filter-grid contact-form-field '>
            <div className='select-outer'>
              <select>
                <option>Facilities</option>
                <option>Facilities</option>
                <option>Facilities</option>
              </select>
            </div>
          </div>}

          {selectedVehicle !== 'Bicycle' &&
          <div className='search-filter-grid contact-form-field '>
            <div className='select-outer'>
              <select>
                <option>Fuel type</option>
                <option>Fuel type</option>
                <option>Fuel type</option>
              </select>
            </div>
          </div>}

          {(selectedVehicle === 'Bicycle' || selectedVehicle === 'Motorbike') &&
          <div className='search-filter-grid contact-form-field '>
            <div className='select-outer'>
              <select>
                <option>Bike type</option>
                <option>Bike type</option>
                <option>Bike type</option>
              </select>
            </div>
          </div>}

          <Dropdown isOpen={dropdownOpen2} toggle={dropDownToggle2}
                    style={{ width: '33.33%', padding: '0 10px' }}>
            <DropdownToggle
              className='btn btn-light select-outer w-100 my-button'
              style={{
                height: '50px',
                paddingLeft: '20px',
                paddingRight: '45px',
                width: '100%',
                textAlign: 'left'
              }}
            >
              Price
            </DropdownToggle>
            <DropdownMenu className='my-button'>
              <div
                className='search-filter-grid contact-form-field field-label padding-left-ten py-1 px-3'>
                <div className='d-flex align-items-center text-dark-white'>
                  <span className='margin-right-five'> Hourly:</span>
                  £<input className='margin-right-five primary-input' />
                  <span className='margin-right-five'>to</span>
                  £<input className='primary-input' />
                </div>
                <div className='d-flex align-items-center mt-3 text-dark-white'>
                  <span className='margin-right-five'> Daily:</span>
                  £<input className='margin-right-five primary-input' />
                  <span className='margin-right-five'>to</span>
                  £<input className='primary-input' />
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </>
  );
}

export default SearchBar;