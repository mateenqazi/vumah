import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 130, height: 40, ...sx }}>
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'
           viewBox='0 0 369.059 110.482'>
        <defs>
          <linearGradient id='BG1' x1='100%' x2='50%' y1='9.946%' y2='50%'>
            <stop offset='0%' stopColor={PRIMARY_DARK} />
            <stop offset='100%' stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id='BG2' x1='50%' x2='50%' y1='0%' y2='100%'>
            <stop offset='0%' stopColor={PRIMARY_LIGHT} />
            <stop offset='100%' stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id='BG3' x1='50%' x2='50%' y1='0%' y2='100%'>
            <stop offset='0%' stopColor={PRIMARY_LIGHT} />
            <stop offset='100%' stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g id='Group_3' transform='translate(-518.941 -612.518)'>
          <g id='Group_1' transform='translate(0 404.47)'>
            <path id='Path_1'
                  d='M563.673,301.776s3.382,4.168,7.5.807c.217-.325,16.154-20.6,16.154-20.6s1.735-2.71-.976-6.288c0-.108-60.405-66.41-60.405-66.41s-7.172-2-7.005,5.588Z'
                  transform='translate(0 -1)' fill='url(#BG3)' />
            <path id='Path_2'
                  d='M771.455,341.411s3.805,3.524,7.188-1.691c.141,0,10.993-27.061,10.993-27.061L709.3,263.188s-7.752-1.128-5.779,7.188Z'
                  transform='translate(-148.688 -44.625)' fill='url(#BG2)' />
            <path id='Path_3'
                  d='M1057.211,245.756a2.568,2.568,0,0,0,0,3.086c.083-.083,20.432,14.011,20.432,14.011s3.169,1.251,5.338-2.419c.083-.167,13.927-35.694,13.927-35.694s.751-7.089-6.839-5.421Z'
                  transform='translate(-435.225 -9.304)' fill='url(#BG1)' />
          </g>
          <text id='eb_Droid' transform='translate(643 708)' fill={PRIMARY_DARK} font-size='60'
                font-family='SegoeUI-Bold, Segoe UI' font-weight='700'>
            <tspan x='0' y='0'>ebDroid</tspan>
          </text>
        </g>
      </svg>
    </Box>
  );
}
