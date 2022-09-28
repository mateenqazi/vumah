/* eslint-disable */
import React, {useState, useEffect, useRef} from 'react';
import GoogleMap from './map';
import SplitPane from "react-split-pane";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from 'moment';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import dummyData from "./dummyData";

export default function Search() {

    const dispatch = useDispatch()
    const center = useSelector(state => state.MapCenter)
    const searchText = useSelector(state => state.MapSearch)
    const selectedVehicleOnMap = useSelector(state => state.SelectedVehicleOnMap)

    const [mapLoad, setMapLoad] = useState(true);
    const [search, setSearch] = useState(searchText);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState('Vehicle');
    const [selectedFilter, setSelectedFilter] = useState('Filter');
    // const [selectedVehicleOnMap, setSelectedVehicleOnMap] = useState(null);
    const [fromDate, setFromDate] = useState(moment().format('M/DD/YYYY (hh:mm)'));
    const [toDate, setToDate] = useState(moment().format('M/DD/YYYY (hh:mm)'));
    const [showFilters, setShowFilters] = useState(false);

    const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);

    const {placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading,} = useGoogle({
        // apiKey: '',
        options: {
            types: ["(regions)"],
            componentRestrictions: {country: "uk"},
        },
    });

    const [panelWidth, setPanelWidth] = useState(
        window.innerWidth > 800 ? 800 : window.innerWidth
    );

    function dropDownToggle() {
        setDropdownOpen(prevState => !prevState);
    };

    function dropDownToggle2() {
        setDropdownOpen2(prevState => !prevState);
    };

    function handlePanelResize(newSize) {
        if (newSize > window.innerWidth) {
            setPanelWidth(window.innerWidth);
        } else {
            setPanelWidth(newSize);
        }
    }

    function handleSelectedVehicleChange(value) {
        setSelectedVehicle(value);
    };

    function handleSelectedFilterChange(value) {
        setSelectedFilter(value);
    };

    function handleEvent(event, picker) {
        setFromDate(picker.startDate.format('M/DD/YYYY (hh:mm)'));
        setToDate(picker.endDate.format('M/DD/YYYY (hh:mm)'));
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (panelWidth > window.innerWidth) {
                setPanelWidth(window.innerWidth);
            }
        }, true);
    });

    const setSelectedVehicleOnMap = (key) => {

        dispatch(
            {
                type: "SelectedVehicleOnMap",
                payload: key
            }
        )
    }

    const [map, setMap] = useState(<GoogleMap/>)

    return (
        <section className="search-main-header position-relative">
            <div
                className="container"
                style={{maxWidth: '1800px'}}
            >
                <div className="map-toggle-main open">
                    <SplitPane
                        split="vertical"
                        defaultSize={800}
                        minSize={400}
                        maxSize={1200}
                        pane1Style={{maxWidth: '100%'}}
                        style={{position: 'relative'}}
                        onChange={handlePanelResize}
                    >
                        <div className="search-left">
                            <div className="row mb-3 align-items-center" style={{
                                alignItems: 'center',
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}>
                                <div style={{width: '140px', paddingRight: '0'}}>
                                    <Dropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
                                        <DropdownToggle
                                            className="btn btn-light select-outer my-button"
                                            style={{
                                                borderRadius: '10px',
                                                height: '50px',
                                                paddingRight: '45px'
                                            }}
                                        >
                                            Vehicle
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem><i
                                                className="fas fa-car-side"></i>&nbsp;&nbsp;Car</DropdownItem>
                                            <DropdownItem><i
                                                className="fas fa-motorcycle"></i>&nbsp;&nbsp;Motorbike</DropdownItem>
                                            <DropdownItem><i
                                                className="fas fa-bicycle"></i>&nbsp;&nbsp;Bicycle</DropdownItem>
                                            <DropdownItem><i
                                                className="fas fa-rv"></i>&nbsp;&nbsp;Campervan</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div style={{
                                    flex: '1',
                                    minWidth: '200px'
                                }}>
                                    <div className="banner-search-field">
                                        <input
                                            type="search"
                                            value={search}
                                            onChange={
                                                (event) => {
                                                    setSearch(event.target.value)
                                                    getPlacePredictions({input: event.target.value});
                                                    setSearchSuggestionsOpen(event.target.value.length > 0);
                                                }
                                            }
                                            placeholder="Search for a city or a postcode"
                                        />
                                        {
                                            searchSuggestionsOpen === true && placePredictions.length > 0 && (
                                                <div className="banner-search-suggestions" style={{zIndex: '10'}}>
                                                    {
                                                        placePredictions.map((suggestion, index) => (
                                                            <div
                                                                className="banner-search-location"
                                                                onClick={() => {
                                                                    setSearchSuggestionsOpen(false);
                                                                    setSearch(suggestion.description)

                                                                    try {
                                                                        placesService.getDetails({placeId: suggestion.place_id,},
                                                                            (placeDetails) => {
                                                                                dispatch(
                                                                                    {
                                                                                        type: "MapCenter",
                                                                                        payload: {
                                                                                            name: suggestion.description,
                                                                                            coordinates: [
                                                                                                placeDetails.geometry.location.lat(),
                                                                                                placeDetails.geometry.location.lng()
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                )
                                                                                setMapLoad(!mapLoad)
                                                                                setMap(
                                                                                    <>
                                                                                        {mapLoad ?
                                                                                            <div
                                                                                                className="search-filter-map">
                                                                                                <GoogleMap/>
                                                                                            </div>
                                                                                            :
                                                                                            <GoogleMap/>
                                                                                        }
                                                                                    </>
                                                                                )
                                                                            }
                                                                        );
                                                                    } catch (e) {}

                                                                    dispatch(
                                                                        {
                                                                            type: "MapSearch",
                                                                            payload: suggestion.description
                                                                        }
                                                                    )
                                                                }}
                                                                key={index}
                                                                tabIndex="0"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" strokeWidth="2"
                                                                     strokeLinecap="round" strokeLinejoin="round">
                                                                    <path
                                                                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                                                                    <circle cx="12" cy="10" r="3"></circle>
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

                                <div style={{width: '160px', paddingRight: '0'}}>
                                    <button
                                        className="btn btn-light select-outer my-button"
                                        onClick={
                                            () => setShowFilters(!(showFilters))
                                        }
                                        style={{
                                            borderRadius: '10px',
                                            height: '50px',
                                            paddingRight: '45px'
                                        }}
                                    >
                                        <i className="fas fa-sort-alt" style={{
                                            fontSize: '18px',
                                            color: 'var(--secondary-color)',
                                            marginRight: '20px'
                                        }}></i>
                                        Filters
                                    </button>
                                </div>

                                <div style={{width: '180px', paddingLeft: '0'}}>
                                    <div className="search-filter-grid contact-form-field w-100" style={{
                                        margin: '0'
                                    }}>
                                        <div className="select-outer pl-0 sortBy-field ">
                                            <i className="fas fa-sort-alt"></i>
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
                                    <div className="d-flex flex-wrap mb-4">
                                        {selectedVehicle !== 'Bicycle' &&
                                        <div className="search-filter-grid contact-form-field">
                                            <div className="select-outer">
                                                <select>
                                                    <option>Make</option>
                                                    <option>Make</option>
                                                    <option>Make</option>
                                                </select>
                                            </div>
                                        </div>}

                                        {selectedVehicle !== 'Bicycle' &&
                                        <div className="search-filter-grid contact-form-field ">
                                            <div className="select-outer">
                                                <select>
                                                    <option>Model</option>
                                                    <option>Model</option>
                                                    <option>Model</option>
                                                </select>
                                            </div>
                                        </div>}

                                        {selectedVehicle !== 'Bicycle' &&
                                        <div className="search-filter-grid contact-form-field ">
                                            <div className="select-outer">
                                                <select>
                                                    <option>Gearbox</option>
                                                    <option>Gearbox</option>
                                                    <option>Gearbox</option>
                                                </select>
                                            </div>
                                        </div>}

                                        {selectedVehicle !== 'Bicycle' && selectedVehicle !== 'Campervan' && selectedVehicle !== 'Motorbike' &&
                                        <div className="search-filter-grid contact-form-field ">
                                            <div className="select-outer">
                                                <select>
                                                    <option>Body type</option>
                                                    <option>Body type</option>
                                                    <option>Body type</option>
                                                </select>
                                            </div>
                                        </div>}

                                        {selectedVehicle === 'Campervan' &&
                                        <div className="search-filter-grid contact-form-field ">
                                            <div className="select-outer">
                                                <select>
                                                    <option>Facilities</option>
                                                    <option>Facilities</option>
                                                    <option>Facilities</option>
                                                </select>
                                            </div>
                                        </div>}

                                        {selectedVehicle !== 'Bicycle' &&
                                        <div className="search-filter-grid contact-form-field ">
                                            <div className="select-outer">
                                                <select>
                                                    <option>Fuel type</option>
                                                    <option>Fuel type</option>
                                                    <option>Fuel type</option>
                                                </select>
                                            </div>
                                        </div>}

                                        {(selectedVehicle === 'Bicycle' || selectedVehicle === 'Motorbike') &&
                                        <div className="search-filter-grid contact-form-field ">
                                            <div className="select-outer">
                                                <select>
                                                    <option>Bike type</option>
                                                    <option>Bike type</option>
                                                    <option>Bike type</option>
                                                </select>
                                            </div>
                                        </div>}

                                        <Dropdown isOpen={dropdownOpen2} toggle={dropDownToggle2}
                                                  style={{width: '33.33%', padding: '0 10px'}}>
                                            <DropdownToggle
                                                className="btn btn-light select-outer w-100 my-button"
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
                                            <DropdownMenu className="my-button">
                                                <div
                                                    className="search-filter-grid contact-form-field field-label padding-left-ten py-1 px-3">
                                                    <div className="d-flex align-items-center text-dark-white">
                                                        <span className="margin-right-five"> Hourly:</span>
                                                        £<input className="margin-right-five primary-input"/>
                                                        <span className="margin-right-five">to</span>
                                                        £<input className="primary-input"/>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-3 text-dark-white">
                                                        <span className="margin-right-five"> Daily:</span>
                                                        £<input className="margin-right-five primary-input"/>
                                                        <span className="margin-right-five">to</span>
                                                        £<input className="primary-input"/>
                                                    </div>
                                                </div>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                            )}
                            <div
                                className={
                                    `toggle-double-grid ${
                                        panelWidth > 1100 ? 'c4' : panelWidth > 900 ? 'c3' : panelWidth > 600 ? 'c2' : 'c1'
                                    }`
                                }
                            >
                                {dummyData.map((place, index) => <>
                                        <Link className={selectedVehicleOnMap !== place.id ? 'company-product-list-grid' : 'company-product-list-grid is-active'}
                                            onClick={(event) => {
                                                if (selectedVehicleOnMap !== place.id) {
                                                    event.preventDefault();
                                                    setSelectedVehicleOnMap(place.id);
                                                }
                                            }}
                                            to="/car-listing"
                                        >
                                            <div className="company-product-list-img">
                                                <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} className={'carModal-slider mb-5'} style={{borderRadius: '0', height: '100%'}}>
                                                    <div>
                                                        <img src={Mercedes} alt="car-modal-img"/>
                                                    </div>
                                                    <div>
                                                        <img src={Mercedes} alt="car-modal-img"/>
                                                    </div>
                                                    <div>
                                                        <img src={Mercedes} alt="car-modal-img"/>
                                                    </div>
                                                </Slider>
                                            </div>
                                            <div className="comapany-card-body">
                                                <h2>{place.name}</h2>
                                                <ul className="car-grid-tag" style={{paddingLeft: '0'}}>
                                                    <li>ATM</li>
                                                    <li>Electric</li>
                                                    <li>Bluetooth</li>
                                                    <li>+3</li>
                                                </ul>
                                                <div className="comapany-card-footer d-flex justify-content-between mt-4 pt-2">
                                            <span className="heart-review">
                                                <i className="fas fa-heart" style={{fontWeight: 500}}
                                                   onClick={(event) => {
                                                       event.preventDefault();
                                                       event.stopPropagation();
                                                       if (event.currentTarget.style['font-weight'].toString() === '600') {
                                                           event.currentTarget.style.fontWeight = 500;
                                                       } else {
                                                           event.currentTarget.style.fontWeight = 600;
                                                       }
                                                   }}
                                                />
                                            </span>
                                                    <h2 style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-end',
                                                        textAlign: 'right'
                                                    }}>
                                                        <b>
                                                            £24<span style={{fontWeight: '500'}}>/hr</span>
                                                            <span
                                                                style={{fontWeight: '500', marginLeft: '5px'}}>(£100/day)</span>
                                                        </b>
                                                        <small style={{
                                                            opacity: '0.6',
                                                            marginTop: '3px',
                                                            fontSize: '13px',
                                                            textDecoration: 'underline'
                                                        }}>£653 total</small>
                                                    </h2>
                                                </div>
                                            </div>
                                        </Link>
                                </>)}
                            </div>
                        </div>
                        <div className="search-filter-map">
                            {map}
                        </div>
                    </SplitPane>
                </div>
            </div>
        </section>
    );
}
