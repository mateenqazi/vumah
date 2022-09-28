import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
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
  Text
} from 'recharts';

export default function PieChartCustom({ name, data, colors, total }) {
  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState(4);

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
          {data.name + ':   '}
          {name == 'Total Earnings' ? <b>{'£' + data.value}</b> : <b>{data.value}</b>}
        </p>
      </div>
    );
  };

  function CustomLabel({ i, viewBox, value1, value2 }) {
    const { cx, cy } = viewBox;

    let thisname = name;
    let value = '';
    let color = '';

    if (i == 4) {
      thisname = name;
      value = total;
      color = theme.palette.text.disabled;
    } else {
      thisname = data[i].name;
      if (name == 'Total Earnings') value = '£' + data[i].value;
      else value = data[i].value;
      color = colors[i];
    }

    return (
      <svg
        // width="500"
        // height="200"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <text x={cx} y={cy} fill="#3d405c">
          <tspan x={cx} dy="-1em" alignmentBaseline="middle" fontSize="0.6em" fill={color}>
            {thisname}
          </tspan>
          <tspan x={cx} dy="1em" fontSize="1.2em" fontWeight="bold" fill={theme.palette.text.primary}>
            {value}
          </tspan>
        </text>
      </svg>
      //  <text x={cx} y={cy} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
      //     <tspan alignmentBaseline="middle" fontSize="26">{value1}</tspan>
      //     <tspan fontSize="14">{value2}</tspan>
      //  </text>
    );
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="card"
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 15,
        boxShadow: theme.shadows[18],
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#fff'
      }}
    >
      <p style={{ color: theme.palette.text.primary, fontSize: '1.3em', fontWeight: '600' }}>{name}</p>
      {/* <div
        style={{
          color: theme.palette.text.primary,
          position: 'absolute',
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <p style={{ fontSize: '0.6em', color: theme.palette.text.disabled }}>{name}</p>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: theme.palette.text.primary }}>{total}</p>
      </div> */}
      <ResponsiveContainer width="100%">
        <PieChart>
          <Tooltip content={customToolTip}></Tooltip>
          <Legend iconSize={'0.6em'} formatter={renderColorfulLegendText}></Legend>
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
            <Label content={<CustomLabel i={activeIndex} />}></Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
