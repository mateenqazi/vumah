import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useRef } from 'react';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
// utils
import mockData from '../../utils/mock-data';
//
import { CarouselControlsPaging2 } from '../../components/carousel/controls';
import CarouselControls from './CarouselControls';

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  p: 1
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return <Box component="img" alt={title} src={image} sx={{ width: '100%', height: 480, objectFit: 'cover' }} />;
}

export default function CarouselProfile({ reviews }) {
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
    ...CarouselControlsPaging2({
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
        {reviews.map((item) => (
          <>{item}</>
        ))}
      </Slider>
      {reviews?.length > 1 && <CarouselControls onNext={handleNext} onPrevious={handlePrevious} />}
    </RootStyle>
  );
}
