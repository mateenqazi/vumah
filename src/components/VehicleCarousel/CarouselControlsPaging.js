import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'center',
  '& li': {
    width: 24,
    height: 24,
    opacity: 0.7,
    cursor: 'pointer',
    '&.slick-active': {
      opacity: 0.9,
      '& .dotActive': {
        width: 18,
        borderRadius: 8
      }
    }
  }
});

const DotStyle = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.easeInOut,
    duration: 360
  })
}));

// ----------------------------------------------------------------------

CarouselControlsPaging.propTypes = {
  color: PropTypes.string
};

export default function CarouselControlsPaging({ color, ...other }) {
  return {
    appendDots: (dots) => (
      <>
        <RootStyle {...other}>{dots}</RootStyle>
      </>
    ),
    customPaging: () => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <DotStyle
          className="dotActive"
          sx={{
            bgcolor: color || 'primary.main'
          }}
        />
      </Box>
    )
  };
}
