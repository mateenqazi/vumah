import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import BaseOptionChart from '../../components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 370;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: CHART_HEIGHT,
  top: '-40px',
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    width: '100%',
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    horizontalAlign: 'right'
  }
}));

// ----------------------------------------------------------------------

const trip_data = [44, 55, 13, 43];

export default function EarningsPieChart() {
  const tripChartOptions = merge(BaseOptionChart(), {
    labels: ['Car', 'Motorbike', 'Bicycle', 'Campervan'],
    stroke: { show: false },
    legend: { horizontalAlign: 'center' },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            show: true,
            name: {
              show: true,
              formatter: function (val) {
                return val;
              }
            },
            value: {
              show: true,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: false,
              label: 'Total Bookings',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              }
            }
          }
        }
      }
    }
  });

  return (
    <Card dir="ltr">
      <CardHeader title={'Total Bookings'} />
      <CardContent
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 0,
          pb: 3
        }}
      >
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="donut" series={trip_data} options={tripChartOptions} width={350} />
        </ChartWrapperStyle>
      </CardContent>
    </Card>
  );
}
