import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import BannerSlider1 from '../../assets/img/banner-slider-1.jpg';
import BannerSlider2 from '../../assets/img/banner-slider-2.jpg';
import BannerSlider3 from '../../assets/img/banner-slider-3.jpg';
import BlogImage1 from '../../assets/img/blog-img-1.jpg';
import BlogImage2 from '../../assets/img/blog-img-2.jpg';
import classnames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeWhyUsTab, setActiveWhyUsTab] = useState('1');
  const [searchSuggestionsOpen, setSearchSuggestionsOpen] = useState(false);

  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = useGoogle({
    apiKey: 'AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U',
    options: {
      types: ['(regions)'],
      componentRestrictions: { country: 'uk' }
    }
  });

  const [fromDate, setFromDate] = useState(moment().format('M/DD/YYYY (hh:mm)'));
  const [toDate, setToDate] = useState(moment().format('M/DD/YYYY (hh:mm)'));

  const searchRef = useRef(null);
  const [searchVehicle, setSearchVehicle] = useState(null);

  return (
    <>
      <section className="banner-slider-main position-relative">
        <div className="banner-overlay-search" data-aos="fade-up">
          <div className="row align-items-center">
            <div className="col-sm-6 col-md-3 col-lg-2 mb-3 mb-md-0">
              <div className="banner-search-dropdown dropdown">
                <Dropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
                  <DropdownToggle
                    caret
                    className="btn dropdown-toggle"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    {searchVehicle === 'car' ? (
                      <>
                        <i className="fas fa-car-side" style={{ marginRight: '5px' }} /> Cars
                      </>
                    ) : searchVehicle === 'motorbike' ? (
                      <>
                        <i className="fas fa-motorcycle" style={{ marginRight: '5px' }} /> Motorbike
                      </>
                    ) : searchVehicle === 'bicycle' ? (
                      <>
                        <i className="fas fa-bicycle" style={{ marginRight: '5px' }} /> Bicycle
                      </>
                    ) : searchVehicle === 'campervan' ? (
                      <>
                        <i className="fas fa-rv" style={{ marginRight: '5px' }} /> Campervan
                      </>
                    ) : (
                      <>
                        Vehicle
                        <i className="fas fa-caret-down" />
                      </>
                    )}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setSearchVehicle('car')}>
                      <i className="fas fa-car-side" style={{ marginRight: '5px' }} /> Car
                    </DropdownItem>
                    <DropdownItem onClick={() => setSearchVehicle('motorbike')}>
                      <i className="fas fa-motorcycle" style={{ marginRight: '5px' }} /> Motorbike
                    </DropdownItem>
                    <DropdownItem onClick={() => setSearchVehicle('bicycle')}>
                      <i className="fas fa-bicycle" style={{ marginRight: '5px' }} /> Bicycle
                    </DropdownItem>
                    <DropdownItem onClick={() => setSearchVehicle('campervan')}>
                      <i className="fas fa-rv" style={{ marginRight: '5px' }} /> Campervan
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-5 mb-3 mb-md-0">
              <div className="banner-search-field">
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
                                coordinates: [
                                  placeDetails.geometry.location.lat(),
                                  placeDetails.geometry.location.lng()
                                ]
                              }
                            });
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
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-4 mb-3 mb-sm-0">
              <DateRangePicker
                initialSettings={{
                  timePicker: true,
                  timePickerIncrement: 15
                }}
                alwaysShowCalendars={true}
                onEvent={handleEvent}
              >
                <div className="banner-search-field">
                  <input type="text" name="daterange" value={`${fromDate} - ${toDate}`} onChange={() => {}} />
                </div>
              </DateRangePicker>
            </div>
            <Link className="col-sm-6 col-md-2 col-lg-1" to="/search">
              <div
                className="banner-search-icon"
                onClick={() => {
                  navigate('search');
                }}
              >
                <input type="submit" value="" className="w-auto" />
                <i className="fas fa-search" />
              </div>
            </Link>
          </div>
        </div>

        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          className="banner-slider-list"
        >
          <div className="banner-slider">
            <img src={BannerSlider1} alt="banner-slider" />
            <div className="banner-slider-text" data-aos="fade-up">
              <h2>
                Ready for <span>your</span> next Car <br /> <span>Adventure</span>?
              </h2>
            </div>
          </div>
          <div className="banner-slider">
            <img src={BannerSlider2} alt="banner-slider" />
            <div className="banner-slider-text" data-aos="fade-up">
              <h2>
                Start <span>your</span> Motorcycle <br /> <span>Journey</span>!
              </h2>
            </div>
          </div>
          <div className="banner-slider">
            <img src={BannerSlider3} alt="banner-slider" />
            <div className="banner-slider-text" data-aos="fade-up">
              <h2>
                Thinking about <span>your</span> next <br />
                Bike <span>Tour</span>?{' '}
              </h2>
            </div>
          </div>
        </Slider>
      </section>

      <section className="service-main padd-top-60 padd-bottom-60">
        <div className="container">
          <div className="service-header text-center mb-5">
            <h2>Services</h2>
            <span className="header-underline"></span>
          </div>
          <div className="row d-flex justify-content-center mb-4">
            <div className="col-sm-6 col-lg-3 text-center mb-4 mb-lg-0">
              <div className="service-grid" data-aos="fade-up">
                <i className="fas fa-car-side" />
                <h6>Cars</h6>
                <p>A wide range of cars to choose from for your exciting adventures!</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 text-center mb-4 mb-lg-0">
              <div className="service-grid" data-aos="fade-down">
                <i className="fa fa-motorcycle" />
                <h6>Motorcycles</h6>
                <p>Roam around on a motorbike or scooter and explore your travel destinations</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 text-center mb-4 mb-md-0">
              <div className="service-grid" data-aos="fade-up">
                <i className="fa fa-bicycle" />
                <h6>Bicycles</h6>
                <p>From cycling on the challenging mountains to cycling through beautiful cities</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 text-center">
              <div className="service-grid" data-aos="fade-down">
                <i className="fas fa-file-alt" />
                <h6>Insurance</h6>
                <p>
                  Variety of covers to choose from for individual hosts, or get covered straight away by commercial
                  hosts
                </p>
              </div>
            </div>
          </div>

          <div className="service-bottom-sec text-center mt-5" data-aos="zoom-in">
            <h2>Easily Fulfil your travel dreams by booking your preferred vehicle from trusted hosts</h2>
            <p>
              Providing you the freedom of renting a car, motorcycle, or even a bicycle efficiently with ease from our
              trusted hosts. The place to book your vehicle, and start your exciting adventure.
            </p>
            <Link className=" common-btn text-uppercase mt-4" to="/about-us">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="why-us-main mb-5">
        <div className="container">
          <div className="service-header text-center mb-5">
            <h2>Why Us?</h2>
            <span className="header-underline"></span>
          </div>
          <div className="row pb-4" data-aos="fade-down">
            <div className="col-md-6 mb-4 mb-lg-0">
              <div className="why-us-list-main flex-wrap d-flex">
                <Nav tabs style={{ borderBottom: 'none' }}>
                  <NavItem
                    className={classnames({ active: activeWhyUsTab === '1' }) + ' why-us-list'}
                    onClick={() => {
                      toggleWhyUsTab('1');
                    }}
                  >
                    <svg viewBox="0 0 48.997 48.998">
                      <g>
                        <path
                          d="M45.961,18.702c-0.033-0.038-0.061-0.075-0.1-0.112l-1.717-1.657c1.424-0.323,2.957-1.516,2.957-2.74
                                            c0-1.426-1.979-1.932-3.668-1.932c-1.766,0-1.971,1.21-1.992,2.065l-4.43-4.271c-0.9-0.891-2.607-1.592-3.883-1.592H24.5h-0.002
                                            h-8.63c-1.275,0-2.981,0.701-3.882,1.592l-4.429,4.271c-0.023-0.855-0.228-2.065-1.992-2.065c-1.691,0-3.669,0.506-3.669,1.932
                                            c0,1.224,1.534,2.417,2.958,2.74l-1.717,1.657c-0.039,0.037-0.066,0.074-0.1,0.112C1.2,20.272,0,23.184,0,25.297v6.279
                                            c0,1.524,0.601,2.907,1.572,3.938v2.435c0,1.424,1.192,2.585,2.658,2.585h3.214c1.466,0,2.657-1.159,2.657-2.585v-0.623h14.397
                                            H24.5h14.396v0.623c0,1.426,1.19,2.585,2.658,2.585h3.213c1.467,0,2.657-1.161,2.657-2.585v-2.435
                                            c0.972-1.031,1.572-2.414,1.572-3.938v-6.279C48.998,23.184,47.798,20.272,45.961,18.702z M13.613,11.953
                                            c0.623-0.519,1.712-0.913,2.255-0.913h8.63H24.5h8.63c0.543,0,1.632,0.394,2.255,0.913l5.809,5.63H24.5h-0.002H7.805L13.613,11.953
                                            z M1.993,24.347c0-1.546,1.21-2.801,2.704-2.801c1.493,0,6.372,2.864,6.372,4.41s-4.879,1.188-6.372,1.188
                                            C3.203,27.144,1.993,25.894,1.993,24.347z M10.102,34.573H9.587H9.072l-3.055,0.005c-0.848-0.264-1.446-0.572-1.869-0.903
                                            c-0.214-0.167-0.378-0.341-0.506-0.514c-0.129-0.175-0.223-0.347-0.284-0.519c-0.38-1.074,0.405-2.061,0.405-2.061h5.214
                                            l3.476,3.99L10.102,34.573L10.102,34.573z M31.996,34.575H24.5h-0.002h-7.496c-1.563,0-2.832-1.269-2.832-2.831h10.328H24.5h10.328
                                            C34.828,33.308,33.559,34.575,31.996,34.575z M32.654,29.812H24.5h-0.002h-8.154c-1.7,0-3.08-2.096-3.08-4.681h11.234H24.5h11.234
                                            C35.734,27.717,34.354,29.812,32.654,29.812z M45.641,32.644c-0.062,0.172-0.156,0.344-0.285,0.518
                                            c-0.127,0.173-0.291,0.347-0.506,0.514c-0.422,0.331-1.021,0.641-1.869,0.903l-3.055-0.005h-0.515h-0.515h-2.353l3.478-3.99h5.213
                                            C45.234,30.583,46.02,31.568,45.641,32.644z M44.301,27.144c-1.492,0-6.371,0.356-6.371-1.188s4.879-4.41,6.371-4.41
                                            c1.494,0,2.704,1.255,2.704,2.801C47.005,25.892,45.795,27.144,44.301,27.144z"
                        />
                      </g>
                    </svg>
                    <h2>Variety</h2>
                  </NavItem>
                  <NavItem
                    className={classnames({ active: activeWhyUsTab === '2' }) + ' why-us-list'}
                    onClick={() => {
                      toggleWhyUsTab('2');
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="m17.5 24c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm0-11.5c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                      <path d="m16.5 20c-.198 0-.39-.079-.53-.22l-2-2c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l1.434 1.433 2.972-3.396c.274-.313.747-.343 1.059-.071.312.273.343.747.07 1.058l-3.5 4c-.138.157-.334.25-.541.257-.008 0-.017 0-.025 0z" />
                      <path d="m8.5 21c-.048 0-.096-.004-.143-.014-.084-.016-8.357-1.725-8.357-11.056v-6.18c0-.31.19-.587.479-.699l7.75-3c.174-.067.367-.067.541 0l7.75 3c.29.112.48.389.48.699v4.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.986l-7-2.709-7 2.709v5.666c0 7.594 6.01 9.32 7.012 9.555h.002c.406-.086.801.182.882.589.081.406-.183.801-.589.882l-.186.034c-.04.007-.08.01-.121.01z" />
                    </svg>
                    <h2>Trust and Safety</h2>
                  </NavItem>
                  <NavItem
                    className={classnames({ active: activeWhyUsTab === '3' }) + ' why-us-list'}
                    onClick={() => {
                      toggleWhyUsTab('3');
                    }}
                  >
                    <svg x="0px" y="0px" viewBox="0 0 512 512">
                      <g>
                        <g>
                          <path
                            d="M256,0C131.935,0,31,100.935,31,225c0,13.749,0,120.108,0,122c0,24.813,20.187,45,45,45h17.58
                                                c6.192,17.458,22.865,30,42.42,30c24.813,0,45-20.187,45-45V255c0-24.813-20.187-45-45-45c-19.555,0-36.228,12.542-42.42,30H76
                                                c-5.259,0-10.305,0.915-15,2.58V225c0-107.523,87.477-195,195-195s195,87.477,195,195v17.58c-4.695-1.665-9.741-2.58-15-2.58
                                                h-17.58c-6.192-17.458-22.865-30-42.42-30c-24.813,0-45,20.187-45,45v122c0,24.813,20.187,45,45,45
                                                c4.541,0,8.925-0.682,13.061-1.939C383.45,438.523,366.272,452,346,452h-47.58c-6.192-17.458-22.865-30-42.42-30
                                                c-24.813,0-45,20.187-45,45s20.187,45,45,45c19.555,0,36.228-12.542,42.42-30H346c41.355,0,75-33.645,75-75v-15h15
                                                c24.813,0,45-20.187,45-45c0-1.864,0-108.262,0-122C481,100.935,380.065,0,256,0z M121,255c0-8.271,6.729-15,15-15s15,6.729,15,15
                                                v122c0,8.271-6.729,15-15,15s-15-6.729-15-15V255z M76,270h15v92H76c-8.271,0-15-6.729-15-15v-62C61,276.729,67.729,270,76,270z
                                                 M256,482c-8.271,0-15-6.729-15-15s6.729-15,15-15s15,6.729,15,15S264.271,482,256,482z M391,377c0,8.271-6.729,15-15,15
                                                s-15-6.729-15-15V255c0-8.271,6.729-15,15-15s15,6.729,15,15V377z M451,347c0,8.271-6.729,15-15,15h-15v-92h15
                                                c8.271,0,15,6.729,15,15V347z"
                          />
                        </g>
                      </g>
                    </svg>
                    <h2>Customer Support</h2>
                  </NavItem>
                  <NavItem
                    className={classnames({ active: activeWhyUsTab === '4' }) + ' why-us-list'}
                    onClick={() => {
                      toggleWhyUsTab('4');
                    }}
                  >
                    <svg x="0px" y="0px" viewBox="0 0 469.341 469.341">
                      <g>
                        <g>
                          <g>
                            <path
                              d="M448.004,236.639v-65.965c0-22.368-17.35-40.559-39.271-42.323l-61.26-107c-5.677-9.896-14.844-16.969-25.813-19.906
                                                    c-10.917-2.917-22.333-1.385-32.104,4.302L79.553,128.007H42.67c-23.531,0-42.667,19.135-42.667,42.667v256
                                                    c0,23.531,19.135,42.667,42.667,42.667h362.667c23.531,0,42.667-19.135,42.667-42.667v-65.965
                                                    c12.389-4.418,21.333-16.147,21.333-30.035v-64C469.337,252.786,460.393,241.057,448.004,236.639z M383.944,128.007h-92.971
                                                    l69.729-40.596L383.944,128.007z M350.103,68.898l-101.529,59.109h-42.113l133.112-77.5L350.103,68.898z M300.295,24.184
                                                    c4.823-2.823,10.458-3.573,15.844-2.135c5.448,1.458,9.99,4.979,12.813,9.906l0.022,0.039l-164.91,96.013h-42.111L300.295,24.184
                                                    z M426.67,426.674c0,11.76-9.573,21.333-21.333,21.333H42.67c-11.76,0-21.333-9.573-21.333-21.333v-256
                                                    c0-11.76,9.573-21.333,21.333-21.333h362.667c11.76,0,21.333,9.573,21.333,21.333v64h-64c-35.292,0-64,28.708-64,64
                                                    c0,35.292,28.708,64,64,64h64V426.674z M448.004,330.674c0,5.885-4.781,10.667-10.667,10.667H362.67
                                                    c-23.531,0-42.667-19.135-42.667-42.667c0-23.531,19.135-42.667,42.667-42.667h74.667c5.885,0,10.667,4.781,10.667,10.667
                                                    V330.674z"
                            />
                            <path
                              d="M362.67,277.341c-11.76,0-21.333,9.573-21.333,21.333c0,11.76,9.573,21.333,21.333,21.333
                                                    c11.76,0,21.333-9.573,21.333-21.333C384.004,286.914,374.431,277.341,362.67,277.341z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    <h2>Best Prices</h2>
                  </NavItem>
                  <NavItem
                    className={classnames({ active: activeWhyUsTab === '5' }) + ' why-us-list'}
                    onClick={() => {
                      toggleWhyUsTab('5');
                    }}
                  >
                    <svg x="0px" y="0px" viewBox="0 0 512 512">
                      <g>
                        <g>
                          <path
                            d="M469.51,317c7.14-7.97,11.49-18.49,11.49-30c0-24.81-20.19-45-45-45h-87.34c8.65-26.25,12.34-61.08,12.34-76.01V151
                    c0-33.08-26.92-60-60-60h-15c-6.88,0-12.88,4.68-14.55,11.36l-8.17,32.69c-11.45,45.78-47.8,96.29-85.42,105.47
                    C171.27,223.84,155,212,136,212H46c-8.28,0-15,6.72-15,15v270c0,8.28,6.72,15,15,15h90c17.89,0,33.37-10.49,40.62-25.65
                    l51.54,17.18c16.85,5.62,34.41,8.47,52.18,8.47H406c24.81,0,45-20.19,45-45c0-5.85-1.12-11.45-3.16-16.58
                    C466.92,445.21,481,427.72,481,407c0-11.51-4.35-22.03-11.49-30c7.14-7.97,11.49-18.49,11.49-30S476.65,324.97,469.51,317z
                     M151,467c0,8.27-6.73,15-15,15H61V242h75c8.27,0,15,6.73,15,15V467z M406,332h30c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15h-30
                    c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15h30c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15h-30c-8.28,0-15,6.72-15,15
                    c0,8.28,6.72,15,15,15c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15H280.34c-14.54,0-28.91-2.33-42.7-6.93L181,456.19V270.58
                    c23.53-4.47,46.56-19.37,67.35-43.76c20.3-23.82,36.76-55.4,44.03-84.49l5.33-21.33H301c16.54,0,30,13.46,30,30v14.99
                    c0,20.14-6.3,58.77-14.36,76.01H286c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15h150c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15
                    h-30c-8.28,0-15,6.72-15,15C391,325.28,397.72,332,406,332z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="106" cy="437" r="15" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M316,0c-8.284,0-15,6.716-15,15v31c0,8.284,6.716,15,15,15s15-6.716,15-15V15C331,6.716,324.284,0,316,0z" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M252.36,66.148l-21.213-21.213c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l21.213,21.213
                    c5.857,5.857,15.356,5.858,21.213,0C258.218,81.503,258.218,72.006,252.36,66.148z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M422.066,44.935c-5.857-5.858-15.355-5.858-21.213,0L379.64,66.147c-5.858,5.858-5.858,15.355,0,21.213
                    c5.857,5.858,15.355,5.859,21.213,0.001l21.213-21.213C427.924,60.29,427.924,50.793,422.066,44.935z"
                          />
                        </g>
                      </g>
                    </svg>
                    <h2>Convenience</h2>
                  </NavItem>
                  <NavItem
                    className={classnames({ active: activeWhyUsTab === '6' }) + ' why-us-list'}
                    onClick={() => {
                      toggleWhyUsTab('6');
                    }}
                  >
                    <svg viewBox="0 0 467.902 467.902">
                      <g>
                        <path d="m428.642 53.15c-54.05-54.355-143.252-51.653-194.713 4.847-51.465-56.498-140.663-59.203-194.713-4.846-53.748 53.526-51.917 141.667 3.462 193.329-28.332 27.059-12.101 75.683 26.462 80.423-2.31 26.406 20.165 50.621 46.75 50.172 1.63 29.069 30.806 49.877 58.778 42.195 9.177 34.632 53.292 46.466 78.601 20.977 14.374-14.288 25.805-23.298 26.534-44.938 23.751-.662 44.301-21.491 44.663-45.228 23.979-.37 44.871-21.269 45.24-45.241 24.876-.378 46.445-22.83 45.287-48.176l13.647-13.646c52.348-52.347 52.348-137.522.002-189.868zm-365.387 215.179 12.818-12.818c3.313-3.313 7.663-4.969 12.015-4.969 14.922-.099 22.711 18.35 12.013 28.997 0 0-12.818 12.818-12.818 12.818-16.592 15.275-39.305-7.429-24.028-24.028zm35.741 61.78c0-4.539 1.768-8.806 4.977-12.015l12.825-12.824c3.208-3.205 7.472-4.97 12.007-4.97 15.049-.026 22.677 18.38 12.014 29.005 0 0-11.31 11.31-11.31 11.31-3.457 3.918-8.206 6.569-13.523 6.484-9.131.188-17.179-7.857-16.99-16.99zm51.726 55.746c-6.591-6.324-6.591-17.703 0-24.027 0 0 11.31-11.311 11.31-11.311 6.594-7.828 18.17-8.847 25.537-1.508 6.624 6.625 6.624 17.402 0 24.028l-12.819 12.819c-6.624 6.627-17.403 6.626-24.028-.001zm94.153 20.361-12.818 12.818c-3.209 3.209-7.476 4.977-12.014 4.977-4.539 0-8.806-1.768-12.015-4.977-6.59-6.325-6.593-17.704.001-24.028 0 0 12.817-12.818 12.817-12.818 6.624-6.625 17.404-6.625 24.028-.001 6.592 6.325 6.593 17.704.001 24.029zm135.159-136.29c-6.325 6.591-17.704 6.592-24.028 0 0 0-66.757-66.757-66.757-66.757l-21.213 21.213 66.757 66.757c6.624 6.625 6.624 17.403 0 24.028-6.625 6.627-17.403 6.625-24.028 0l-65.625-65.625-1.132-1.132-21.213 21.213 1.132 1.132 65.625 65.625c6.625 6.625 6.625 17.404 0 24.029s-17.404 6.625-24.029 0l-.013.013c-12.189-11.784-29.224-15.664-44.61-11.64-4.898-20.014-25.017-35.166-45.249-34.725-.981-21.542-19.193-41.002-40.715-43.327 2.84-36.96-37.752-62.413-69.786-44.206-44.614-39.852-47.362-109.811-4.719-152.161 42.398-42.695 112.452-39.866 152.287 4.847l-37.086 37.086 29.717 29.717c22.827 22.829 58.003 25.97 84.23 9.426l90.458 90.459c6.621 6.624 6.621 17.403-.003 24.028zm27.395-48.121-4.571 4.57c-.521-.574-1.058-1.138-1.61-1.69l-110.49-110.491-10.607 10.606c-14.774 14.774-38.814 14.776-53.591 0l-8.504-8.504 41.933-41.933c101.861-93.753 241.173 45.647 147.44 147.442z" />
                      </g>
                    </svg>
                    <h2>Hassle Free</h2>
                  </NavItem>
                </Nav>
              </div>
            </div>
            <div className="col-md-6">
              <TabContent activeTab={activeWhyUsTab}>
                <TabPane tabId="1">
                  <div className="customer-support-main">
                    <div className="customer-support-icon">
                      <svg viewBox="0 0 48.997 48.998">
                        <g>
                          <path
                            d="M45.961,18.702c-0.033-0.038-0.061-0.075-0.1-0.112l-1.717-1.657c1.424-0.323,2.957-1.516,2.957-2.74
                                                c0-1.426-1.979-1.932-3.668-1.932c-1.766,0-1.971,1.21-1.992,2.065l-4.43-4.271c-0.9-0.891-2.607-1.592-3.883-1.592H24.5h-0.002
                                                h-8.63c-1.275,0-2.981,0.701-3.882,1.592l-4.429,4.271c-0.023-0.855-0.228-2.065-1.992-2.065c-1.691,0-3.669,0.506-3.669,1.932
                                                c0,1.224,1.534,2.417,2.958,2.74l-1.717,1.657c-0.039,0.037-0.066,0.074-0.1,0.112C1.2,20.272,0,23.184,0,25.297v6.279
                                                c0,1.524,0.601,2.907,1.572,3.938v2.435c0,1.424,1.192,2.585,2.658,2.585h3.214c1.466,0,2.657-1.159,2.657-2.585v-0.623h14.397
                                                H24.5h14.396v0.623c0,1.426,1.19,2.585,2.658,2.585h3.213c1.467,0,2.657-1.161,2.657-2.585v-2.435
                                                c0.972-1.031,1.572-2.414,1.572-3.938v-6.279C48.998,23.184,47.798,20.272,45.961,18.702z M13.613,11.953
                                                c0.623-0.519,1.712-0.913,2.255-0.913h8.63H24.5h8.63c0.543,0,1.632,0.394,2.255,0.913l5.809,5.63H24.5h-0.002H7.805L13.613,11.953
                                                z M1.993,24.347c0-1.546,1.21-2.801,2.704-2.801c1.493,0,6.372,2.864,6.372,4.41s-4.879,1.188-6.372,1.188
                                                C3.203,27.144,1.993,25.894,1.993,24.347z M10.102,34.573H9.587H9.072l-3.055,0.005c-0.848-0.264-1.446-0.572-1.869-0.903
                                                c-0.214-0.167-0.378-0.341-0.506-0.514c-0.129-0.175-0.223-0.347-0.284-0.519c-0.38-1.074,0.405-2.061,0.405-2.061h5.214
                                                l3.476,3.99L10.102,34.573L10.102,34.573z M31.996,34.575H24.5h-0.002h-7.496c-1.563,0-2.832-1.269-2.832-2.831h10.328H24.5h10.328
                                                C34.828,33.308,33.559,34.575,31.996,34.575z M32.654,29.812H24.5h-0.002h-8.154c-1.7,0-3.08-2.096-3.08-4.681h11.234H24.5h11.234
                                                C35.734,27.717,34.354,29.812,32.654,29.812z M45.641,32.644c-0.062,0.172-0.156,0.344-0.285,0.518
                                                c-0.127,0.173-0.291,0.347-0.506,0.514c-0.422,0.331-1.021,0.641-1.869,0.903l-3.055-0.005h-0.515h-0.515h-2.353l3.478-3.99h5.213
                                                C45.234,30.583,46.02,31.568,45.641,32.644z M44.301,27.144c-1.492,0-6.371,0.356-6.371-1.188s4.879-4.41,6.371-4.41
                                                c1.494,0,2.704,1.255,2.704,2.801C47.005,25.892,45.795,27.144,44.301,27.144z"
                          />
                        </g>
                      </svg>
                    </div>
                    <h2>Variety</h2>
                    <p style={{ textAlign: 'justify' }}>
                      You can pick your favorite vehicle from an extensive range of cars, motorcycles, and bicycles for
                      any sort of tourist or traveler activity. We keep growing our fleet of vehicles to provide
                      multiple options so that our customers get exactly what they want.
                    </p>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="customer-support-main">
                    <div className="customer-support-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="m17.5 24c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm0-11.5c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="m16.5 20c-.198 0-.39-.079-.53-.22l-2-2c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l1.434 1.433 2.972-3.396c.274-.313.747-.343 1.059-.071.312.273.343.747.07 1.058l-3.5 4c-.138.157-.334.25-.541.257-.008 0-.017 0-.025 0z" />
                        <path d="m8.5 21c-.048 0-.096-.004-.143-.014-.084-.016-8.357-1.725-8.357-11.056v-6.18c0-.31.19-.587.479-.699l7.75-3c.174-.067.367-.067.541 0l7.75 3c.29.112.48.389.48.699v4.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.986l-7-2.709-7 2.709v5.666c0 7.594 6.01 9.32 7.012 9.555h.002c.406-.086.801.182.882.589.081.406-.183.801-.589.882l-.186.034c-.04.007-.08.01-.121.01z" />
                      </svg>
                    </div>
                    <h2>Trust and Safety</h2>
                    <p style={{ textAlign: 'justify' }}>
                      The driver???s safety and the hosts??? trust are our top priorities. Our hosts are trusted and
                      verified, assuring your comfort and safety. Moreover, we ensure the verification of our guests as
                      well to encourage responsible participation in our rental platform.
                    </p>
                  </div>
                </TabPane>

                <TabPane tabId="3">
                  <div className="customer-support-main">
                    <div className="customer-support-icon">
                      <svg x="0px" y="0px" viewBox="0 0 512 512">
                        <g>
                          <g>
                            <path
                              d="M256,0C131.935,0,31,100.935,31,225c0,13.749,0,120.108,0,122c0,24.813,20.187,45,45,45h17.58
                                                    c6.192,17.458,22.865,30,42.42,30c24.813,0,45-20.187,45-45V255c0-24.813-20.187-45-45-45c-19.555,0-36.228,12.542-42.42,30H76
                                                    c-5.259,0-10.305,0.915-15,2.58V225c0-107.523,87.477-195,195-195s195,87.477,195,195v17.58c-4.695-1.665-9.741-2.58-15-2.58
                                                    h-17.58c-6.192-17.458-22.865-30-42.42-30c-24.813,0-45,20.187-45,45v122c0,24.813,20.187,45,45,45
                                                    c4.541,0,8.925-0.682,13.061-1.939C383.45,438.523,366.272,452,346,452h-47.58c-6.192-17.458-22.865-30-42.42-30
                                                    c-24.813,0-45,20.187-45,45s20.187,45,45,45c19.555,0,36.228-12.542,42.42-30H346c41.355,0,75-33.645,75-75v-15h15
                                                    c24.813,0,45-20.187,45-45c0-1.864,0-108.262,0-122C481,100.935,380.065,0,256,0z M121,255c0-8.271,6.729-15,15-15s15,6.729,15,15
                                                    v122c0,8.271-6.729,15-15,15s-15-6.729-15-15V255z M76,270h15v92H76c-8.271,0-15-6.729-15-15v-62C61,276.729,67.729,270,76,270z
                                                     M256,482c-8.271,0-15-6.729-15-15s6.729-15,15-15s15,6.729,15,15S264.271,482,256,482z M391,377c0,8.271-6.729,15-15,15
                                                    s-15-6.729-15-15V255c0-8.271,6.729-15,15-15s15,6.729,15,15V377z M451,347c0,8.271-6.729,15-15,15h-15v-92h15
                                                    c8.271,0,15,6.729,15,15V347z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h2>Customer support</h2>
                    <p style={{ textAlign: 'justify' }}>
                      We know uncertainties never knock. We provide customer support along with roadside assistance to
                      help you whenever you need it. Our skilled team is trained to understand your problems and provide
                      effective solutions when you need it.
                    </p>
                  </div>
                </TabPane>

                <TabPane tabId="4">
                  <div className="customer-support-main">
                    <div className="customer-support-icon">
                      <svg x="0px" y="0px" viewBox="0 0 469.341 469.341">
                        <g>
                          <g>
                            <g>
                              <path
                                d="M448.004,236.639v-65.965c0-22.368-17.35-40.559-39.271-42.323l-61.26-107c-5.677-9.896-14.844-16.969-25.813-19.906
                                                        c-10.917-2.917-22.333-1.385-32.104,4.302L79.553,128.007H42.67c-23.531,0-42.667,19.135-42.667,42.667v256
                                                        c0,23.531,19.135,42.667,42.667,42.667h362.667c23.531,0,42.667-19.135,42.667-42.667v-65.965
                                                        c12.389-4.418,21.333-16.147,21.333-30.035v-64C469.337,252.786,460.393,241.057,448.004,236.639z M383.944,128.007h-92.971
                                                        l69.729-40.596L383.944,128.007z M350.103,68.898l-101.529,59.109h-42.113l133.112-77.5L350.103,68.898z M300.295,24.184
                                                        c4.823-2.823,10.458-3.573,15.844-2.135c5.448,1.458,9.99,4.979,12.813,9.906l0.022,0.039l-164.91,96.013h-42.111L300.295,24.184
                                                        z M426.67,426.674c0,11.76-9.573,21.333-21.333,21.333H42.67c-11.76,0-21.333-9.573-21.333-21.333v-256
                                                        c0-11.76,9.573-21.333,21.333-21.333h362.667c11.76,0,21.333,9.573,21.333,21.333v64h-64c-35.292,0-64,28.708-64,64
                                                        c0,35.292,28.708,64,64,64h64V426.674z M448.004,330.674c0,5.885-4.781,10.667-10.667,10.667H362.67
                                                        c-23.531,0-42.667-19.135-42.667-42.667c0-23.531,19.135-42.667,42.667-42.667h74.667c5.885,0,10.667,4.781,10.667,10.667
                                                        V330.674z"
                              />
                              <path
                                d="M362.67,277.341c-11.76,0-21.333,9.573-21.333,21.333c0,11.76,9.573,21.333,21.333,21.333
                                                        c11.76,0,21.333-9.573,21.333-21.333C384.004,286.914,374.431,277.341,362.67,277.341z"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h2>Best Prices</h2>
                    <p style={{ textAlign: 'justify' }}>
                      Traveling around is fun! Are you worried that renting will cost you more? Don???t worry! We offer
                      the best prices to let you enjoy your traveling experience without burning a hole in your pocket.
                      We also make sure to regularly improve our platform to enhance the experience of our customers and
                      provide you with the quality you deserve.
                    </p>
                  </div>
                </TabPane>

                <TabPane tabId="5">
                  <div className="customer-support-main">
                    <div className="customer-support-icon">
                      <svg x="0px" y="0px" viewBox="0 0 512 512">
                        <g>
                          <g>
                            <path
                              d="M469.51,317c7.14-7.97,11.49-18.49,11.49-30c0-24.81-20.19-45-45-45h-87.34c8.65-26.25,12.34-61.08,12.34-76.01V151
                        c0-33.08-26.92-60-60-60h-15c-6.88,0-12.88,4.68-14.55,11.36l-8.17,32.69c-11.45,45.78-47.8,96.29-85.42,105.47
                        C171.27,223.84,155,212,136,212H46c-8.28,0-15,6.72-15,15v270c0,8.28,6.72,15,15,15h90c17.89,0,33.37-10.49,40.62-25.65
                        l51.54,17.18c16.85,5.62,34.41,8.47,52.18,8.47H406c24.81,0,45-20.19,45-45c0-5.85-1.12-11.45-3.16-16.58
                        C466.92,445.21,481,427.72,481,407c0-11.51-4.35-22.03-11.49-30c7.14-7.97,11.49-18.49,11.49-30S476.65,324.97,469.51,317z
                         M151,467c0,8.27-6.73,15-15,15H61V242h75c8.27,0,15,6.73,15,15V467z M406,332h30c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15h-30
                        c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15h30c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15h-30c-8.28,0-15,6.72-15,15
                        c0,8.28,6.72,15,15,15c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15H280.34c-14.54,0-28.91-2.33-42.7-6.93L181,456.19V270.58
                        c23.53-4.47,46.56-19.37,67.35-43.76c20.3-23.82,36.76-55.4,44.03-84.49l5.33-21.33H301c16.54,0,30,13.46,30,30v14.99
                        c0,20.14-6.3,58.77-14.36,76.01H286c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15h150c8.27,0,15,6.73,15,15c0,8.27-6.73,15-15,15
                        h-30c-8.28,0-15,6.72-15,15C391,325.28,397.72,332,406,332z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <circle cx="106" cy="437" r="15" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M316,0c-8.284,0-15,6.716-15,15v31c0,8.284,6.716,15,15,15s15-6.716,15-15V15C331,6.716,324.284,0,316,0z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M252.36,66.148l-21.213-21.213c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l21.213,21.213
                        c5.857,5.857,15.356,5.858,21.213,0C258.218,81.503,258.218,72.006,252.36,66.148z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M422.066,44.935c-5.857-5.858-15.355-5.858-21.213,0L379.64,66.147c-5.858,5.858-5.858,15.355,0,21.213
                        c5.857,5.858,15.355,5.859,21.213,0.001l21.213-21.213C427.924,60.29,427.924,50.793,422.066,44.935z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h2>Convenience</h2>
                    <p style={{ textAlign: 'justify' }}>
                      You can rent vehicles with us anytime. The pickup and drop off location are mutually decided by
                      the renter and rentee. Once you book a vehicle, you can reach out to the owner and discuss these
                      terms. Easy and convenient!
                    </p>
                  </div>
                </TabPane>

                <TabPane tabId="6">
                  <div className="customer-support-main">
                    <div className="customer-support-icon">
                      <svg viewBox="0 0 467.902 467.902">
                        <g>
                          <path d="m428.642 53.15c-54.05-54.355-143.252-51.653-194.713 4.847-51.465-56.498-140.663-59.203-194.713-4.846-53.748 53.526-51.917 141.667 3.462 193.329-28.332 27.059-12.101 75.683 26.462 80.423-2.31 26.406 20.165 50.621 46.75 50.172 1.63 29.069 30.806 49.877 58.778 42.195 9.177 34.632 53.292 46.466 78.601 20.977 14.374-14.288 25.805-23.298 26.534-44.938 23.751-.662 44.301-21.491 44.663-45.228 23.979-.37 44.871-21.269 45.24-45.241 24.876-.378 46.445-22.83 45.287-48.176l13.647-13.646c52.348-52.347 52.348-137.522.002-189.868zm-365.387 215.179 12.818-12.818c3.313-3.313 7.663-4.969 12.015-4.969 14.922-.099 22.711 18.35 12.013 28.997 0 0-12.818 12.818-12.818 12.818-16.592 15.275-39.305-7.429-24.028-24.028zm35.741 61.78c0-4.539 1.768-8.806 4.977-12.015l12.825-12.824c3.208-3.205 7.472-4.97 12.007-4.97 15.049-.026 22.677 18.38 12.014 29.005 0 0-11.31 11.31-11.31 11.31-3.457 3.918-8.206 6.569-13.523 6.484-9.131.188-17.179-7.857-16.99-16.99zm51.726 55.746c-6.591-6.324-6.591-17.703 0-24.027 0 0 11.31-11.311 11.31-11.311 6.594-7.828 18.17-8.847 25.537-1.508 6.624 6.625 6.624 17.402 0 24.028l-12.819 12.819c-6.624 6.627-17.403 6.626-24.028-.001zm94.153 20.361-12.818 12.818c-3.209 3.209-7.476 4.977-12.014 4.977-4.539 0-8.806-1.768-12.015-4.977-6.59-6.325-6.593-17.704.001-24.028 0 0 12.817-12.818 12.817-12.818 6.624-6.625 17.404-6.625 24.028-.001 6.592 6.325 6.593 17.704.001 24.029zm135.159-136.29c-6.325 6.591-17.704 6.592-24.028 0 0 0-66.757-66.757-66.757-66.757l-21.213 21.213 66.757 66.757c6.624 6.625 6.624 17.403 0 24.028-6.625 6.627-17.403 6.625-24.028 0l-65.625-65.625-1.132-1.132-21.213 21.213 1.132 1.132 65.625 65.625c6.625 6.625 6.625 17.404 0 24.029s-17.404 6.625-24.029 0l-.013.013c-12.189-11.784-29.224-15.664-44.61-11.64-4.898-20.014-25.017-35.166-45.249-34.725-.981-21.542-19.193-41.002-40.715-43.327 2.84-36.96-37.752-62.413-69.786-44.206-44.614-39.852-47.362-109.811-4.719-152.161 42.398-42.695 112.452-39.866 152.287 4.847l-37.086 37.086 29.717 29.717c22.827 22.829 58.003 25.97 84.23 9.426l90.458 90.459c6.621 6.624 6.621 17.403-.003 24.028zm27.395-48.121-4.571 4.57c-.521-.574-1.058-1.138-1.61-1.69l-110.49-110.491-10.607 10.606c-14.774 14.774-38.814 14.776-53.591 0l-8.504-8.504 41.933-41.933c101.861-93.753 241.173 45.647 147.44 147.442z" />
                        </g>
                      </svg>
                    </div>
                    <h2>Hassle Free</h2>
                    <p style={{ textAlign: 'justify' }}>
                      Our team is devoted to giving you unbeatable value and peace of mind from booking your own vehicle
                      for the entirety of your journey. Our simple and hassle-free approach will provide you the travel
                      experience you???ve always dreamed of.
                    </p>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-main padd-bottom-60" data-aos="fade-up">
        <div className="container">
          <div className="service-header text-center mb-5">
            <h2>Blogs</h2>
            <span className="header-underline"></span>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card blog-card-grid ">
                <div className="home-blog-img">
                  <img src={BlogImage1} alt="blog-image" />
                </div>
                <div className="card-body justify-content-between d-flex flex-column">
                  <div>
                    <h6> Top 5 places to visit in the UK</h6>
                    <p style={{ textAlign: 'justify' }}>
                      Looking for the next adventure in the UK? The UK is an easy place to explore its beautiful
                      diversity, thanks to its size you can be based in any city such as London or Manchester and simply
                      take a car to explore other areas. From the capital, you can drive 2hrs to reach the beautiful
                      beaches of Brighton, or to one of the country's most popular attractions, Stonehenge.
                    </p>
                  </div>
                  <div className="text-center mt-4">
                    <Link className="common-btn" to="/blog-2">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card blog-card-grid">
                <div className="home-blog-img">
                  <img src={BlogImage2} alt="blog-image" />
                </div>
                <div className="card-body justify-content-between d-flex flex-column">
                  <div>
                    <h6>Why Travel Is Important Today More Than Ever</h6>
                    <p style={{ textAlign: 'justify' }}>
                      Traveling is a very important part of life as it is the best way to get out of the busy work life
                      and a good remedy for stress, anxiety and depression. Improving mental and physical health. Not
                      only does travelling provide the opportunity to experience the beauty of nature, different
                      architectures and people, but it allows us to explore new cultures, cuisines and styles of living.
                    </p>
                  </div>
                  <div className="text-center mt-4">
                    <Link className="common-btn" to="/blog-1">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  function dropDownToggle() {
    setDropdownOpen((prevState) => !prevState);
  }

  function toggleWhyUsTab(tab) {
    if (activeWhyUsTab !== tab) setActiveWhyUsTab(tab);
  }

  function handleEvent(event, picker) {
    setFromDate(picker.startDate.format('M/DD/YYYY (hh:mm)'));
    setToDate(picker.endDate.format('M/DD/YYYY (hh:mm)'));
  }
}
