import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
//
import { Card, CardContent, CardHeader } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import BaseOptionChart from '../../components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 420;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: CHART_HEIGHT,
  top: '-10px',
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
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const earning_data = [4490.5, 550.0, 133, 437];

export default function EarningsPieChart() {
  const earningChartOptions = merge(BaseOptionChart(), {
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
                return `£${val}`;
              }
            },
            total: {
              show: true,
              showAlways: false,
              label: 'Total Earnings',
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return `£${total}`;
              }
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `£${val}`
      }
    }
  });

  return (
    <Card dir="ltr">
      <CardHeader title={'Total earnings'} />
      <CardContent
        sx={{
          height: '380px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 0,
          pb: 3
        }}
      >
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="donut" series={earning_data} options={earningChartOptions} width={450} />
        </ChartWrapperStyle>
      </CardContent>
    </Card>
  );
}
