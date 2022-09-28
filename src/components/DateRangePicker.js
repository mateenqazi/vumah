import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

function DroidDateRangePicker({ searchBar = false, unavailableDays }) {
  const dispatch = useDispatch();

  const dateRange = useSelector((state) => state.VehicleBookingTime);

  const date = new Date();

  function handleEvent(event, picker) {
    dispatch({
      type: 'VehicleBookingTime',
      payload: {
        fromDate: picker.startDate,
        toDate: picker.endDate
      }
    });
  }

  return (
    <>
      <DateRangePicker
        initialSettings={{
          minDate: moment(),
          timePicker: true,
          autoApply: searchBar,
          timePickerIncrement: 15
        }}
        autoApply={searchBar}
        alwaysShowCalendars={true}
        onEvent={handleEvent}
      >
        <div className="banner-search-field" style={{ textAlignLast: 'center' }}>
          <input
            type="text"
            name="daterange"
            value={`${dateRange.fromDate.format('ddd-MMM-YY (hh:mm A)')} - ${dateRange.toDate.format(
              'ddd-MMM-YY (hh:mm A)'
            )}`}
            onChange={() => {}}
          />
        </div>
      </DateRangePicker>
    </>
  );
}

export default DroidDateRangePicker;
