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
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
           viewBox="0 0 62.891 41.835">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g transform="matrix(1, 0.017, -0.017, 1, -514.51, -217.073)">
          <path d="M538.428,249.443a2.276,2.276,0,0,0,3.268.352c.094-.142,7.037-8.974,7.037-8.974a2.424,2.424,0,0,0-.425-2.739c0-.047-26.314-28.93-26.314-28.93s-3.124-.872-3.052,2.434Z"
                transform="translate(0 -1)" fill="url(#BG3)"/>
          <path d="M732.933,297.236s1.658,1.535,3.131-.737c.061,0,4.789-11.789,4.789-11.789l-35-21.551s-3.377-.491-2.517,3.131Z"
                transform="translate(-168.763 -50.531)" fill="url(#BG2)"/>
          <path d="M1056.918,230.692a1.119,1.119,0,0,0,0,1.344c.036-.036,8.9,6.1,8.9,6.1a1.917,1.917,0,0,0,2.325-1.054c.036-.073,6.067-15.549,6.067-15.549s.327-3.088-2.979-2.361Z"
                transform="translate(-493.088 -10.271)" fill="url(#BG1)"/>
        </g>
      </svg>
    </Box>
  );
}
