import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import classnames from 'classnames';
import coreStyles from './styles';
import { generateStyles, findNextRangeIndex } from './utils';

const DateRangePickerCustom = (props) => {
  const [focusedRange, setFocusedRange] = useState([findNextRangeIndex(props.ranges), 0]);
  const [styles] = useState(generateStyles([coreStyles, props.classNames]));
  const dateRange = useRef();

  return (
    <div className={classnames(styles.dateRangePickerWrapper, props.className)}>
      <DateRange
        onRangeFocusChange={(focusedRange) => setFocusedRange(focusedRange)}
        focusedRange={focusedRange}
        {...props}
        ref={dateRange}
        className={undefined}
      />
    </div>
  );
};

DateRangePickerCustom.defaultProps = {};

DateRangePickerCustom.propTypes = {
  ...DateRange.propTypes,
  className: PropTypes.string
};

export default DateRangePickerCustom;
