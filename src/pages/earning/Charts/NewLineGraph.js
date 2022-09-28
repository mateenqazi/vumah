import React, { useEffect, useState } from 'react';
import ReactApexChart, { BaseOptionChart } from '../../../components/chart';
import moment from 'moment';
import merge from 'lodash/merge';
import { useTheme } from '@mui/material/styles';

export default function NewLineGraph({ trips, earnings, bookingLine, earningLine }) {
  const theme = useTheme();
  const [dataEarnings, setDataEarnings] = useState([]);
  const [dataTrips, setDataTrips] = useState([]);

  useEffect(async () => {
    const dataItems = [];
    const dates = [];
    trips?.map((t) => {
      const d = moment(t?.date).startOf('date').format('x');
      dataItems.push([Number(d), 1]);
      if (!dates.includes(Number(d))) dates?.push(Number(d));
    });
    dates.sort(function (a, b) {
      return a - b;
    });

    const newDataItems = [];

    // newDataItems.push([Number(moment(dates[0])) - 860000000, 0]);

    dates.map((d) => {
      let data = 0;
      dataItems?.map((f) => {
        if (d === f[0]) data = data + f[1];
      });
      newDataItems.push([d, data]);
    });

    // newDataItems.push([Number(moment(dates[dates.length - 1])) + 86000, 0]);

    setDataTrips(newDataItems);
  }, [trips]);

  useEffect(async () => {
    const dataItems = [];
    const dates = [];
    earnings?.map((t) => {
      const d = moment(t?.date).startOf('date').format('x');
      dataItems.push([Number(d), t?.amount]);
      if (!dates.includes(Number(d))) dates?.push(Number(d));
    });
    dates.sort(function (a, b) {
      return a - b;
    });

    const newDataItems = [];

    // newDataItems.push([Number(moment(dates[0])) - 860000000, 0]);

    dates.map((d) => {
      let data = 0;
      dataItems?.map((f) => {
        if (d === f[0]) data = data + f[1];
      });
      newDataItems.push([d, data]);
    });

    // newDataItems.push([Number(moment(dates[dates.length - 1])) + 86000, 0]);

    setDataEarnings(newDataItems);
  }, [earnings]);

  // const color = '#2698f6';
  const color = theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.disabled;

  const series = [
    {
      name: 'Earnings',
      data: dataEarnings
    },
    {
      name: 'Trips',
      data: dataTrips
    }
  ];

  const tripsSeries = [
    {
      name: 'Trips',
      data: dataTrips
    }
  ];

  const earningsSeries = [
    {
      name: 'Earnings',
      data: dataEarnings
    }
  ];

  const options = merge(BaseOptionChart(), {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: false,
        autoScaleYaxis: true
      },
      toolbar: {
        show: false,
        tools: {
          download:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/receive-square-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/receive-square.svg" width="20" alt="reset">`,
          selection: false,
          zoom:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/search-zoom-in-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/search-zoom-in.svg" width="20" alt="reset">`,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/refresh-2-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/refresh-2.svg" width="20" alt="reset">`
        },
        export: {
          svg: {
            filename: 'Vehicle-Listing'
          },
          png: {
            filename: 'Vehicle-Listing'
          }
        },
        autoSelected: 'zoom'
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    title: {
      text: 'Statistics',
      align: 'left',
      offsetY: 20,
      style: {
        fontSize: '1.3em',
        fontWeight: '600',
        color: theme.palette.text.primary
      }
    },
    colors: ['#FEA022', color],
    stroke: {
      width: 2,
      curve: 'smooth',
      lineCap: 'round'
    },
    yaxis: [
      {
        seriesName: 'Earnings',
        // opposite: true,
        axisBorder: {
          show: true,
          color: '#FEA022'
        },
        labels: {
          style: {
            colors: '#FEA022'
          }
        },
        axisTicks: {
          show: true
        },
        title: {
          text: 'Earnings',
          style: {
            color: '#FEA022'
          }
        }
      },
      {
        seriesName: 'Trips',
        opposite: true,
        // opposite: location,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: color
        },
        labels: {
          style: {
            colors: color
          }
        },
        title: {
          text: 'Trips',
          style: {
            color: color
          }
        }
      }
    ],
    xaxis: {
      type: 'datetime'
    }
  });

  const optionsTrips = merge(BaseOptionChart(), {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: false,
        autoScaleYaxis: true
      },
      toolbar: {
        show: false,
        tools: {
          download:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/receive-square-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/receive-square.svg" width="20" alt="reset">`,
          selection: false,
          zoom:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/search-zoom-in-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/search-zoom-in.svg" width="20" alt="reset">`,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/refresh-2-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/refresh-2.svg" width="20" alt="reset">`
        },
        export: {
          svg: {
            filename: 'Vehicle-Listing'
          },
          png: {
            filename: 'Vehicle-Listing'
          }
        },
        autoSelected: 'zoom'
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    title: {
      text: 'Statistics',
      align: 'left',
      offsetY: 20,
      style: {
        fontSize: '1.3em',
        fontWeight: '600',
        color: theme.palette.text.primary
      }
    },
    colors: [color],
    stroke: {
      width: 2,
      curve: 'smooth',
      lineCap: 'round'
    },
    yaxis: [
      {
        seriesName: 'Trips',
        opposite: false,
        // opposite: location,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: color
        },
        labels: {
          style: {
            colors: color
          }
        },
        title: {
          text: 'Trips',
          style: {
            color: color
          }
        }
      }
    ],
    xaxis: {
      type: 'datetime'
    }
  });

  const optionsEarnings = merge(BaseOptionChart(), {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: false,
        autoScaleYaxis: true
      },
      toolbar: {
        show: false,
        tools: {
          download:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/receive-square-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/receive-square.svg" width="20" alt="reset">`,
          selection: false,
          zoom:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/search-zoom-in-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/search-zoom-in.svg" width="20" alt="reset">`,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset:
            theme.palette.mode === 'dark'
              ? `<img src="/static/svg/refresh-2-light.svg" width="20" alt="reset">`
              : `<img src="/static/svg/refresh-2.svg" width="20" alt="reset">`
        },
        export: {
          svg: {
            filename: 'Vehicle-Listing'
          },
          png: {
            filename: 'Vehicle-Listing'
          }
        },
        autoSelected: 'zoom'
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    title: {
      text: 'Statistics',
      align: 'left',
      offsetY: 20,
      style: {
        fontSize: '1.3em',
        fontWeight: '600',
        color: theme.palette.text.primary
      }
    },
    colors: ['#FEA022'],
    stroke: {
      width: 2,
      curve: 'smooth',
      lineCap: 'round'
    },
    yaxis: [
      {
        seriesName: 'Earnings',
        // opposite: true,
        axisBorder: {
          show: true,
          color: '#FEA022'
        },
        labels: {
          style: {
            colors: '#FEA022'
          }
        },
        axisTicks: {
          show: true
        },
        title: {
          text: 'Earnings',
          style: {
            color: '#FEA022'
          }
        }
      }
    ],
    xaxis: {
      type: 'datetime'
    }
  });

  const getOptions = () => {
    if (earningLine && !bookingLine)
      return {
        series: earningsSeries,
        options: optionsEarnings
      };
    if (bookingLine && !earningLine)
      return {
        series: tripsSeries,
        options: optionsTrips
      };
    if (earningLine && bookingLine)
      return {
        series: series,
        options: options
      };
    return {
      series: [
        {
          name: 'Earnings',
          data: []
        },
        {
          name: 'Trips',
          data: []
        }
      ],
      options: options
    };
  };

  return (
    <div id="chart">
      <ReactApexChart options={getOptions().options} series={getOptions().series} type="area" height={450} />
    </div>
  );
}
