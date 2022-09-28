import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const TimeSelector = ({ time = new Date(), onChange }) => {
  const [amPm, setAmPm] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();

  useEffect(() => {
    if (time) {
      const m = moment(time);
      setAmPm(m.format('A'));
      setHour(m.format('hh'));
      setMinute(moment(roundToNearest15(time)).format('mm'));
    }
  }, [time]);

  const setValue = (type, value) => {
    if (type === 'h') {
      setHour(value);
      onChange(`${value}:${minute} ${amPm}`);
    }
    if (type === 'm') {
      setMinute(value);
      onChange(`${hour}:${value} ${amPm}`);
    }
    if (type === 'a') {
      setAmPm(value);
      onChange(`${hour}:${minute} ${value}`);
    }
  };

  console.log(hour, moment(time).format('hh'));

  return (
    <Stack direction="horizontal" gap={1} style={{ width: '100%', marginLeft: '10px', marginRight: '10px' }}>
      <Form.Select aria-label="Hour" size="sm" value={hour} onChange={(e) => setValue('h', e.target.value)}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
          <option value={h.toLocaleString('en-US', { minimumIntegerDigits: 2 })}>
            {h.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
          </option>
        ))}
      </Form.Select>
      <Form.Select aria-label="Minute" size="sm" value={minute} onChange={(e) => setValue('m', e.target.value)}>
        {[0, 15, 30, 45].map((m) => (
          <option value={m.toLocaleString('en-US', { minimumIntegerDigits: 2 })}>
            {m.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
          </option>
        ))}
      </Form.Select>
      <Form.Select aria-label="AM/PM" size="sm" value={amPm} onChange={(e) => setValue('a', e.target.value)}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </Form.Select>
    </Stack>
  );
};

function roundToNearest15(date = new Date()) {
  const minutes = 15;
  const ms = 1000 * 60 * minutes;

  // 👇️ replace Math.round with Math.ceil to always round UP
  return new Date(Math.round(date.getTime() / ms) * ms);
}

export default TimeSelector;
