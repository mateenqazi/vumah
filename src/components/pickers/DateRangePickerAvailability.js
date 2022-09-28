import React, { useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';

export default function DateRangePickerAvailability({ endDate, setEndDate, startDate, setStartDate }) {
  function handleEvent(event, picker) {
    console.log('Date functionality: ');

    const dateeeStart = moment(picker.startDate.unix() * 1000 - 1000 * 60 * 60 * 24 * picker.startDate.day());
    picker.setStartDate(dateeeStart);

    const dateeeEnd = moment(
      picker.startDate.unix() * 1000 - 1000 * 60 * 60 * 24 * picker.startDate.day() + 1000 * 60 * 60 * 24 * 6
    );
    picker.setEndDate(dateeeEnd);

    setStartDate(dateeeStart);
    setEndDate(dateeeEnd);
  }

  return (
    <>
      <DateRangePicker
        initialSettings={{
          singleDatePicker: true,
          autoApply: true,
          parentEl: '#my-week-selector',
          timePicker: false,
          // showDropdowns: true,
          endDate: endDate,
          startDate: startDate
        }}
        autoApply={true}
        onEvent={handleEvent}
        onChange={handleEvent}
        onClick={handleEvent}
      >
        <div className="banner-search-field" style={{ textAlignLast: 'center' }}>
          <input
            type="text"
            name="daterange"
            value={`${startDate.format('DD/M/YYYY')} - ${endDate.format('DD/M/YYYY')}`}
            style={{
              borderColor: '#f67810',
              height: '30px',
              textAlign: 'center',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
          />
        </div>
      </DateRangePicker>
    </>
  );
}
