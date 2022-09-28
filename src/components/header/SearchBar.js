// material
import { Box } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useSelector } from '../../redux/store';
import { useSnackbar } from 'notistack';
import { getTimeDiffDroid } from '../../utils/TimeCalc';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  parentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }
});

export default function SearchBar({ onClose, setIsDatePickerOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchVehicle, setSearchVehicle] = useState(null);
  const classes = useStyles();

  const dateRange = useSelector((state) => state.VehicleBookingTime);

  const searchRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  function dropDownToggle() {
    setDropdownOpen((prevState) => !prevState);
  }

  function handleEvent(event, picker) {
    dispatch({
      type: 'VehicleBookingTime',
      payload: {
        fromDate: picker.startDate,
        toDate: picker.endDate
      }
    });
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
        <DropdownMenu style={{ marginTop: '20px' }}>
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
      <Box className={classes.parentBox}>
        <div className="col-sm-6 col-md-3 col-lg-2 mb-3 mb-md-0" style={{ marginLeft: '2rem' }}>
          {dropDown}
        </div>
        <div className="col-sm-6 col-md-4 col-lg-5 mb-3 mb-md-0 mr-20">
          <div className="banner-search-field" style={{ marginLeft: '2rem' }}>
            <SearchBox searchRef={searchRef} />
          </div>
        </div>
        <div className="banner-search-field col-sm-6 col-md-3 col-lg-4 mb-3 mb-sm-0" style={{ marginLeft: '2rem' }}>
          <DateRangePicker
            initialSettings={{
              timePicker: true,
              timePickerIncrement: 15
            }}
            alwaysShowCalendars={true}
            onEvent={handleEvent}
            onApply={(event, picker) => {
              dispatch({
                type: 'VehicleBookingTime',
                payload: {
                  fromDate: picker.startDate,
                  toDate: picker.endDate
                }
              });
              setTimeout(function () {
                setIsDatePickerOpen(false);
              }, 500);
            }}
            onShow={() => {
              setIsDatePickerOpen(true);
            }}
          >
            <div className="banner-search-field" style={{ textAlignLast: 'center' }}>
              <input
                type="text"
                name="daterange"
                value={`${dateRange.fromDate.format('ddd-MMM-YY (hh:mm)')} - ${dateRange.toDate.format(
                  'ddd-MMM-YY (hh:mm)'
                )}`}
                onChange={() => {}}
              />
            </div>
          </DateRangePicker>
        </div>
        <div className="col-sm-6 col-md-2 col-lg-1" style={{ marginLeft: '2rem' }}>
          <div
            className="banner-search-icon"
            onClick={() => {
              if (searchRef?.current?.value === null || searchRef?.current?.value === '') {
                return enqueueSnackbar('Please enter a city or a postcode', { variant: 'warning' });
              }
              if (!(getTimeDiffDroid(dateRange).calcHours > 0) && !(getTimeDiffDroid(dateRange).calcDays > 0)) {
                return enqueueSnackbar('Please enter date range', { variant: 'warning' });
              }
              onClose();
              navigate('search');
            }}
          >
            <input type="submit" value="" className="w-auto" />
            <i className="fas fa-search" />
          </div>
        </div>
      </Box>
    </>
  );
}
