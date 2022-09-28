import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Label } from 'recharts';
import LoadingScreen from '../../../components/LoadingScreen';

export default function EarningsChart({ loading, summary }) {
  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState(4);

  if (loading) return <LoadingScreen />;

  const getData = (type) => {
    return summary?.GetUserSummaryEarning?.filter((e) => e?.VehicleType === type && e?.status === 'PROCESSED');
  };

  const getVehicleTotal = (type) => {
    let t = 0;
    const vehicles = getData(type);
    vehicles?.map((v) => {
      t = t + Number(v?.amount) - Number(v?.fee);
    });
    return t === 0 ? 0.0000000000001 : t;
  };

  const data = [
    { name: 'Car', value: getVehicleTotal('CAR') },
    { name: 'Motorbike', value: getVehicleTotal('MOTORBIKE') },
    { name: 'Bicycle', value: getVehicleTotal('BICYCLE') },
    { name: 'Campervan', value: getVehicleTotal('CAMPERVAN') }
  ];

  const colors = ['#F67810', '#FFE700', '#816AF8', '#2698f6'];

  const total = () => {
    let total = 0;

    for (let i = 0; i < data.length; i++) {
      total += data[i].value;
    }

    return '£' + Math.round(total);
  };

  const renderColorfulLegendText = (value, entry) => {
    return <span style={{ color: theme.palette.text.primary, fontSize: '0.6em' }}>{value}</span>;
  };

  const customToolTip = (props) => {
    const { payload } = props;
    const [data] = payload;

    if (!data) return null;
    return (
      <div
        style={{
          background: data.payload.fill,
          display: 'flex',
          borderRadius: 5,
          minWidth: 100,
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 8
        }}
      >
        <p style={{ color: '#fff', fontSize: '0.8em' }}>
          {'Total Earnings:   '}
          <b>{'£' + Math.round(data.value)}</b>
        </p>
      </div>
    );
  };

  function CustomLabel({ i, viewBox, value1, value2 }) {
    const { cx, cy } = viewBox;

    let thisname = 'Total Earnings';
    let value = '';
    let color = '';

    if (i === 4) {
      value = total();
      color = theme.palette.text.disabled;
    } else {
      thisname = data[i].name;
      value = '£' + Math.round(data[i].value);
      color = colors[i];
    }

    return (
      <svg className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
        <text x={cx} y={cy} fill="#3d405c">
          <tspan x={cx} dy="-1em" alignmentBaseline="middle" fontSize="0.6em" fill={color}>
            {thisname}
          </tspan>
          <tspan x={cx} dy="1em" fontSize="1.2em" fontWeight="bold" fill={theme.palette.text.primary}>
            {value}
          </tspan>
        </text>
      </svg>
    );
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="card"
      style={{
        height: '250px',
        flex: 1,
        padding: 10,
        borderRadius: 15,
        boxShadow: theme.shadows[18],
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#fff'
      }}
    >
      <p style={{ color: theme.palette.text.primary, fontSize: '1.3em', fontWeight: '600' }}>Total Earnings</p>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ResponsiveContainer width="100%">
          <PieChart>
            <Tooltip content={customToolTip} />
            <Legend iconSize={'0.6em'} formatter={renderColorfulLegendText} />
            <Pie
              onMouseLeave={() => {
                setActiveIndex(4);
              }}
              onMouseEnter={onPieEnter}
              stroke="transparent"
              data={data}
              innerRadius={45}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <Label content={<CustomLabel i={activeIndex} />} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
