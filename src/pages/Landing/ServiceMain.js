import React from 'react';
import { Box, Button, Card, CardActionArea, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MotionInView, varFadeInDown, varFadeInUp } from '../../components/animate';
import { motion } from 'framer-motion';

import { Link, Link as RouterLink } from 'react-router-dom';
import image1 from '../../assets/img/car1.png';
import image2 from '../../assets/img/motorbike1.png';
import image3 from '../../assets/img/bike1.png';
import Slider from 'react-slick';
import { Assignment, ElectricCar, PedalBike, TwoWheeler } from '@mui/icons-material';

const ServiceStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center'
  }
}));

const HeaderUnderline = styled('span')(({ theme }) => ({
  width: '50px',
  height: '2px',
  backgroundColor: theme.palette.primary.main,
  display: 'inline-block'
}));

const SubUnderline = styled('span')(({ theme }) => ({
  width: '50px',
  height: '2px',
  backgroundColor: theme.palette.grey[400],
  display: 'inline-block'
}));

const SliderDiv = styled(Paper)(({ theme }) => ({
  width: { xs: '100%', md: '200px', lg: '300px' },
  backgroundColor: '#ffffff00'
}));

const services = [
  {
    title: 'Cars',
    icon: <ElectricCar color="primary" sx={{ mb: 2, width: '60px', height: '60px' }} />,
    desc: 'A wide range of cars to choose from for your exciting adventures!'
  },
  {
    title: 'Motorcycles',
    icon: <TwoWheeler color="primary" sx={{ mb: 2, width: '60px', height: '60px' }} />,
    desc: 'Roam around on a motorbike or scooter and explore your travel destinations'
  },
  {
    title: 'Bicycles',
    icon: <PedalBike color="primary" sx={{ mb: 2, width: '60px', height: '60px' }} />,
    desc: 'From cycling on the challenging mountains to cycling through beautiful cities'
  },
  {
    title: 'Insurance',
    icon: <Assignment color="primary" sx={{ mb: 2, width: '60px', height: '60px' }} />,
    desc: 'Variety of covers to choose from for individual hosts, or get covered straight away by commercial hosts'
  }
];

const slider = [image1, image2, image3];

const settings = {
  centerMode: true,
  arrows: false,
  centerPadding: '0',
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  speed: 200
};

function ServiceMain(props) {
  return (
    <>
      <section className="service-main padd-top-60 padd-bottom-60">
        <div className="container">
          <div className="service-header text-center mb-5">
            <h2>Services</h2>
            <span className="header-underline"></span>
          </div>
          <div className="row d-flex justify-content-center mb-4">
            <div className="col-sm-6 col-lg-3 text-center mb-4 mb-lg-0">
              <div className="service-grid" data-aos="fade-up">
                <i className="fas fa-car-side" />
                <h6>Cars</h6>
                <p>A wide range of cars to choose from for your exciting adventures!</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 text-center mb-4 mb-lg-0">
              <div className="service-grid" data-aos="fade-down">
                <i className="fa fa-motorcycle" />
                <h6>Motorcycles</h6>
                <p>Roam around on a motorbike or scooter and explore your travel destinations</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 text-center mb-4 mb-md-0">
              <div className="service-grid" data-aos="fade-up">
                <i className="fa fa-bicycle" />
                <h6>Bicycles</h6>
                <p>From cycling on the challenging mountains to cycling through beautiful cities</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 text-center">
              <div className="service-grid" data-aos="fade-down">
                <i className="fas fa-file-alt" />
                <h6>Insurance</h6>
                <p>
                  Variety of covers to choose from for individual hosts, or get covered straight away by commercial
                  hosts
                </p>
              </div>
            </div>
          </div>

          <div className="service-bottom-sec text-center mt-5" data-aos="zoom-in">
            <h2>Easily Fulfil your travel dreams by booking your preferred vehicle from trusted hosts</h2>
            <p>
              Providing you the freedom of renting a car, motorcycle, or even a bicycle efficiently with ease from our
              trusted hosts. The place to book your vehicle, and start your exciting adventure.
            </p>
            <Link className=" common-btn text-uppercase mt-4" to="/about-us">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceMain;
