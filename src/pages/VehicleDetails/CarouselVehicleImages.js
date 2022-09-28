import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useRef } from 'react';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
// utils
import mockData from '../../utils/mock-data';
//
import CarouselControlsPaging from './CarouselControlsPaging';
import CarouselControls from './CarouselControls';

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  p: 1,
  borderRadius: '12px 12px 0 0',
  overflow: 'hidden'
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  return (
    <Box
      component="img"
      alt={'vumah'}
      src={item.url}
      sx={{ borderRadius: '12px', width: '100%', height: 480, objectFit: 'cover' }}
    />
  );
}

export default function CarouselVehicleImages({ images }) {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    autoplaySpeed: 6000,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging({
      sx: { mt: 3 }
    })
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {images.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Slider>
      {images?.length > 1 && <CarouselControls onNext={handleNext} onPrevious={handlePrevious} />}
    </RootStyle>
  );
}
