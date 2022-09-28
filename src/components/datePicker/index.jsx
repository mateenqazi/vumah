import React from 'react';
import { DatePicker } from 'antd';

export default function DatePickerComponent() {
  return (
    <DatePicker onChange={onChange} />
  );

  function onChange(date, dateString) {
  }
}
