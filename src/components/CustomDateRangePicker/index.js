import React, { useEffect, useState, useRef } from 'react';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import DateRangePickerCustom from './DateRangePicker';
import { format, getDay } from 'date-fns';
import moment from 'moment';
import TimeSelector from './TimeSelector';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export default function DateRangePicker({ onChange, unavailableDays, initialDateRange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const [state, setState] = useState({
    startDate: initialDateRange?.fromDate || new Date(),
    endDate: initialDateRange?.toDate || new Date(),
    key: 'selection'
  });

  useEffect(() => {
    onChange(state);
  }, [state]);

  const [unavailableDow, setUnavailableDow] = useState([]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState(selection);
  };

  const handleTimeOnChange = (type, value) => {
    const currentDate = moment(state[type])?.format('DD-MMM-YYYY');
    const newDateStr = currentDate.concat(' ').concat(value);

    console.log(newDateStr, moment(newDateStr, 'DD-MMM-YYYY hh:mm A').toDate(), 'here');

    setState({
      ...state,
      [type]: moment(newDateStr, 'DD-MMM-YYYY hh:mm A').toDate()
    });
  };

  useEffect(() => {
    if (unavailableDays) {
      const dows = unavailableDays.map((d) => getDay(new Date(d.dayStart)));
      setUnavailableDow(dows);
    }
  }, [unavailableDays]);

  const checkDisabled = (date) => {
    return unavailableDow.some((d) => d === getDay(new Date(date)));
  };

  const popoverBody = (
    <Popover id="date-selector">
      <Popover.Body>
        <DateRangePickerCustom
          ref={ref}
          onChange={handleOnChange}
          showSelectionPreview={false}
          moveRangeOnFirstSelection={false}
          months={2}
          className="test"
          ranges={[state]}
          direction="horizontal"
          rangeColors={['#f67810']}
          disabledDay={checkDisabled}
          minDate={new Date()}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <TimeSelector time={state.startDate} onChange={(v) => handleTimeOnChange('startDate', v)} />
          <TimeSelector time={state.endDate} onChange={(v) => handleTimeOnChange('endDate', v)} />
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverBody}>
        <div className="banner-search-field" style={{ textAlignLast: 'center' }} id="daterange-popover">
          <input
            value={`${format(state.startDate, 'iii-MMM-yy (hh:mm)')} - ${format(state.endDate, 'iii-MMM-yy (hh:mm)')}`}
          />
        </div>
      </OverlayTrigger>
    </>
  );
}
