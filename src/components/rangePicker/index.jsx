import React from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default function RangePickerComponent(props) {
  return (
    <RangePicker
      className={props.className}
      showTime={{ use12Hours: true, format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm a"
      onChange={onChange}
      onOk={onOk}
    />
  );

  function onChange(value, dateString) {
  }

  function onOk(value) {
  }
}
