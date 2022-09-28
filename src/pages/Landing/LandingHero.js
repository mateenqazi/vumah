// material
import { useTheme } from '@mui/material/styles';
import { Link, Typography, createTheme, Box, Container } from '@mui/material';

import image1 from '../../assets/img/car1.png';
import image2 from '../../assets/img/motorbike1.png';
import image3 from '../../assets/img/bike1.png';
import * as React from 'react';
import Slider from 'react-slick';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import BannerSlider1 from '../../assets/img/banner-slider-1.jpg';
import BannerSlider2 from '../../assets/img/banner-slider-2.jpg';
import BannerSlider3 from '../../assets/img/banner-slider-3.jpg';
import { useRef, useState } from 'react';
import moment from 'moment';
import SearchBox from './SearchBox';
import DroidDateRangePicker from '../../components/DateRangePicker';
import { useNavigate } from 'react-router-dom';
import dateRangePicker from '../../components/DateRangePicker';
import { useSelector } from '../../redux/store';
import { getTimeDiffDroid } from '../../utils/TimeCalc';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LandingHero() {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchVehicle, setSearchVehicle] = useState(null);

  const searchRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  const dateRange = useSelector((state) => state.VehicleBookingTime);

  function dropDownToggle() {
    setDropdownOpen((prevState) => !prevState);
  }

  const dropDown = (
    <div className="banner-search-dropdown dropdown" style={{ width: '100%' }}>
      <Dropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
        <DropdownToggle
          caret
          className="btn dropdown-toggle"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {searchVehicle === 'car' ? (
            <div>
              <i className="fas fa-car-side" style={{ marginRight: '5px' }} />
              Car
            </div>
          ) : searchVehicle === 'motorbike' ? (
            <>
              <i className="fas fa-motorcycle" style={{ marginRight: '5px' }} />
              Motorbike
            </>
          ) : searchVehicle === 'bicycle' ? (
            <>
              <i className="fas fa-bicycle" style={{ marginRight: '5px' }} />
              Bicycle
            </>
          ) : searchVehicle === 'campervan' ? (
            <>
              <i className="fas fa-rv" style={{ marginRight: '5px' }} />
              Campervan
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
  );

  return (
    <>
      <section className="banner-slider-main position-relative">
        <div className="banner-overlay-search" data-aos="fade-up">
          <div className="row align-items-center">
            <div className="col-sm-6 col-md-3 col-lg-2 mb-3 mb-md-0">{dropDown}</div>
            <div className="col-sm-6 col-md-4 col-lg-5 mb-3 mb-md-0">
              <div className="banner-search-field">
                <SearchBox searchRef={searchRef} />
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-4 mb-3 mb-sm-0">
              <DroidDateRangePicker />
            </div>
            <div className="col-sm-6 col-md-2 col-lg-1">
              <div
                className="banner-search-icon"
                onClick={() => {
                  if (searchRef?.current?.value === null || searchRef?.current?.value === '') {
                    return enqueueSnackbar('Please enter a city or a postcode', { variant: 'warning' });
                  }
                  if (!(getTimeDiffDroid(dateRange).calcHours > 0) && !(getTimeDiffDroid(dateRange).calcDays > 0)) {
                    return enqueueSnackbar('Please enter date range', { variant: 'warning' });
                  }
                  navigate('search');
                }}
              >
                <input type="submit" value="" className="w-auto" />
                <i className="fas fa-search" />
              </div>
            </div>
          </div>
        </div>

        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={5500}
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
    </>
  );
}
