import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
  LabelList,
  Text,
  CartesianGrid
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

export default function LineChartCustom({ bookingLine, earningLine, trips, earnings }) {
  const customToolTip = (props) => {
    const { payload } = props;

    const [data] = payload;

    if (!data) return null;
    return (
      <div
        style={{
          background: theme.palette.mode === 'dark' ? '#2F2F2F' : '#fff',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 5,
          minWidth: 110,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 8,
          paddingBottom: 8
        }}
      >
        {payload.map((item) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ height: '0.8em', width: '0.8em', background: item.color, marginRight: '0.3em' }}></div>
            <p style={{ color: theme.palette.text.primary, fontSize: '0.8em' }}>
              {item.name + ':   '}
              <b>
                {item.name === 'Earnings' && '£'}
                {item.value}
              </b>
            </p>
          </div>
        ))}
      </div>
    );
  };

  const theme = useTheme();

  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataItems = [];
    month.map((m, index) => {
      let totalEarnings = 0;
      let totalTrips = 0;
      earnings?.GetUserSummaryEarning?.map((t) => {
        const d = new moment(t?.date).format('M');
        if (index + 1 === Number(d)) {
          totalEarnings = totalEarnings + Number(t?.amount);
        }
      });
      trips?.GetUserSummaryTrips?.map((t) => {
        const d = new moment(t?.date).format('M');
        if (index + 1 === Number(d)) {
          totalTrips = totalTrips + 1;
        }
      });
      dataItems.push({ name: m, Bookings: totalTrips, Earnings: totalEarnings });
    });
    setData(dataItems);
  }, []);

  useEffect(() => {
    const dataItems = [];
    earnings?.GetUserSummaryEarning?.map((t) => {
      const d = new moment(t?.date);
      dataItems.push({
        fullDate: d,
        year: d.format('YYYY'),
        month: d.format('MMM'),
        date: d.format('D'),
        day: d.format('ddd'),
        Earnings: t?.amount
      });
    });
    trips?.GetUserSummaryTrips?.map((t) => {
      const d = new moment(t?.date);
      dataItems.push({
        fullDate: d,
        year: d.format('YYYY'),
        month: d.format('MMM'),
        date: d.format('D'),
        day: d.format('ddd'),
        Bookings: 1
      });
    });
    setDatas(dataItems);
  }, []);

  return (
    <div>
      <p style={{ color: theme.palette.text.primary, fontSize: '1.3em', fontWeight: '600' }}>Statistics</p>
      <ResponsiveContainer height={450} width="100%">
        <LineChart
          data={data}
          width={500}
          height={300}
          margin={{
            top: 8,
            right: 16,
            left: 16,
            bottom: 8
          }}
        >
          {/*<CartesianGrid strokeDasharray="3 3" />*/}
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={customToolTip} />
          <Legend verticalAlign="top" />

          {bookingLine && (
            <Line yAxisId="left" type="monotone" dataKey="Bookings" stroke="#FEA022" activeDot={{ r: 8 }} />
          )}
          {earningLine && (
            <Line yAxisId="right" type="monotone" dataKey="Earnings" stroke={theme.palette.text.primary} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
