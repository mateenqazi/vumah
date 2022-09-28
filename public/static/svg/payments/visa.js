// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function PageNotFoundIllustration({ ...other }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg id="visa-color_large" xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32">
        <rect id="card_bg" width="48" height="32" rx="4" fill="#2a2a6c" />
        <path
          id="visa-logo"
          d="M17.014,9.52a7.127,7.127,0,0,1-2.6-.491l.43-2a5.019,5.019,0,0,0,2.377.6h.063c.712-.01,1.43-.3,1.43-.91.01-.392-.326-.7-1.24-1.15-.9-.439-2.09-1.176-2.09-2.51,0-1.8,1.645-3.06,4-3.06a6.414,6.414,0,0,1,2.24.41l-.419,2a4.512,4.512,0,0,0-1.92-.432c-.147,0-.295.007-.441.022-.691.091-1,.453-1,.77,0,.388.5.647,1.123.975,1,.521,2.234,1.17,2.227,2.695l.05-.08c-.01,1.92-1.647,3.16-4.17,3.16Zm6.626-.08H21.12L24.71.87a1.087,1.087,0,0,1,1-.68h2l1.939,9.249H27.43l-.29-1.38H24.13l-.49,1.38ZM26.02,2.69,24.76,6.16h1.99ZM12.7,9.41H10.3l2-9.25h2.4l-2,9.249ZM7.45,9.38H4.84L2.93,1.99a1,1,0,0,0-.571-.81A9.917,9.917,0,0,0,0,.4L.06.13H4.13a1.118,1.118,0,0,1,1.11.941l1,5.35L8.73.13h2.6L7.45,9.379Z"
          transform="translate(9.16 11.23)"
          fill="#fff"
        />
      </svg>
    </Box>
  );
}
