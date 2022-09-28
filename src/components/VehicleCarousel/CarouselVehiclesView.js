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
  name: mockData.text.title(index),
  preview: mockData.image.feed(index)
}));

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  '& .slick-list': {
    boxShadow: theme.customShadows.z16
  }
}));

function CarouselItem({ item }) {
  const { name, preview } = item;

  return <Box component="img" alt={name} src={preview} sx={{ width: '100%', height: 260, objectFit: 'cover' }} />;
}

export default function CarouselVehiclesView() {
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

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {MOCK_CAROUSELS.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrows onNext={handleNext} onPrevious={handlePrevious} />
    </RootStyle>
  );
}
