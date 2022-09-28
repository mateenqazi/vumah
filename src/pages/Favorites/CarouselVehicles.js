import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useRef } from 'react';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// utils
import mockData from '../../utils/mock-data';
import CarouselControlsArrows from './CarouselControlsArrows';
import CarouselControlsPaging from './CarouselControlsPaging';

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: mockData.text.title(index),
  image: mockData.image.feed(index),
  description: mockData.text.description(index)
}));

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative'
  // '& .slick-list': {
  //   boxShadow: theme.customShadows.z16
  // }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item, height }) {
  const { url } = item;

  return (
    <Box
      component="img"
      alt={url}
      src={url}
      sx={{
        width: '100%',
        height: height === undefined ? 260 : height,
        objectFit: 'cover'
      }}
    />
  );
}

export default function CarouselVehicles({ images, height }) {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    dots: true,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging({
      sx: { mt: -3, p: 0 }
    })
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    carouselRef.current.slickPrev();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    carouselRef.current.slickNext();
  };

  return (
    <div style={{ minHeight: height === undefined ? 260 : height }}>
      <RootStyle>
        <Slider ref={carouselRef} {...settings}>
          {images?.map((item, index) => (
            <CarouselItem key={index} item={item} height={height} />
          ))}
        </Slider>
        <CarouselControlsArrows onNext={handleNext} onPrevious={handlePrevious} />
      </RootStyle>
    </div>
  );
}
