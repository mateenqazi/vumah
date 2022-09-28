import React, { useState } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
// import "react-edit-text/dist/index.css";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';
import ReviewBg from '../../assets/img/public-review-bg.jpg';
import CompanyReview from '../../assets/img/company-review-img.jpg';
import Mercedes from '../../assets/img/Mercedes-car.jpg';
import CustomerReview from '../../assets/img/customer-review-img-1.png';
import SecurityImage from '../../assets/img/security.png';
import { Box, ClickAwayListener, Container, List, Pagination, Rating, Stack, Typography } from '@mui/material';
import CopyClipboard from '../../components/CopyClipboard';
import { useQuery } from '@apollo/client';
import { GET_USER_REVIEWS_BY_ID, GET_USER_VEHICLES_BY_ID } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import Masonry from 'react-masonry-css';
import VehicleProfileCard from '../../components/Cards/VehicleProfileCard';
import { MotionContainer, varBounceIn } from '../../components/animate';
import { motion } from 'framer-motion';
import moment from 'moment';
import { fShortenNumber } from '../../utils/formatNumber';
import ReviewItem from '../../components/ReviewItem';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CarouselProfile from '../Profile/CarouselProfile';

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: 120,
  margin: 'auto'
}));

const RootStyleHost = styled('div')(({ theme }) => ({
  width: '100%',
  height: 150,
  margin: 'auto'
}));

const RootStyleProfile = styled('div')(({ theme }) => ({
  width: 150,
  height: 110,
  margin: 'auto'
}));

export default function PrivateReview({ profile, loadingReviews, reviews }) {
  const navigate = useNavigate();
  const [openSharePopover, setOpenSharePopover] = useState(false);

  const { loading: loadingVehicles, data: vehicles } = useQuery(GET_USER_VEHICLES_BY_ID, {
    variables: { id: profile.id }
  });

  const toggleSharePopover = () => {
    setOpenSharePopover(!openSharePopover);
  };

  const getReviews = (reviews) => {
    let total = 0.0;
    reviews?.GetUserByIdReviews?.map((review) => {
      const t = Number(review?.communicationRating) + Number(review?.vehicleRating) + Number(review?.experienceRating);
      total = total + t;
    });
    return reviews?.GetUserByIdReviews?.length > 0
      ? (total / (reviews?.GetUserByIdReviews?.length * 3)).toFixed(1)
      : '0.0';
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  const getViews = () => {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < reviews?.GetUserByIdReviews?.length; i += chunkSize) {
      const chunk = reviews?.GetUserByIdReviews?.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    let r = [];
    chunks?.map((item, index) => {
      r.push(
        <List disablePadding>
          {item?.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </List>
      );
    });
    return r;
  };

  return (
    <>
      <section className="public-review-main padd-top-60 padd-bottom-60">
        <div className="container">
          <div className="company-product-info mb-5">
            <div className="public-review-bg position-relative">
              {/*<img src={profile?.cover ? profile?.cover : ReviewBg} alt="review-bg" className="profile-pic" />*/}
              <RootStyle>
                <Box
                  component="img"
                  alt="avatar"
                  src={profile?.cover ? profile?.cover : ReviewBg}
                  sx={{ zIndex: 8, objectFit: 'cover' }}
                />
              </RootStyle>
            </div>
            <div className="p-4 mx-2 mb-2">
              <div className="row">
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="company-review d-flex mb-3 justify-content-center justify-content-md-start align-items-center">
                    <Stack direction="row" spacing={1}>
                      <h2>{reviews?.GetUserByIdReviews?.length || 0} Reviews</h2>
                      <Rating
                        name="half-rating"
                        value={loadingReviews ? 0.0 : getReviews(reviews)}
                        precision={0.5}
                        size="small"
                      />
                    </Stack>
                  </div>
                  <div className="level-four d-flex justify-content-center justify-content-md-start align-items-center">
                    <img src={SecurityImage} alt="Security Image" className="margin-right-ten" />
                    <h2>Host level {profile?.hostLevel || 0}</h2>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="company-info-center">
                    <div className="company-review-img mb-3 position-relative">
                      <RootStyleHost>
                        <Box
                          component="img"
                          alt="avatar"
                          src={profile?.avatarUrl ? profile?.avatarUrl : CompanyReview}
                          sx={{ zIndex: 8, objectFit: 'cover' }}
                          className="cimage"
                        />
                      </RootStyleHost>
                      {/*<img*/}
                      {/*  src={profile?.avatarUrl ? profile?.avatarUrl : CompanyReview}*/}
                      {/*  alt="company-review-img"*/}
                      {/*  className="profile-car"*/}
                      {/*/>*/}
                    </div>
                    <h2>{profile?.businessName}</h2>
                  </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
                  <div className="company-info-right pl-5 ">
                    <p style={{ fontSize: 14 }}>
                      <i className="fas fa-check-circle margin-right-five" /> Avg response time{' '}
                      {profile?.responseTime || 0}hrs
                    </p>
                    <p style={{ fontSize: 14 }}>
                      <i className="fas fa-clock margin-right-five" />
                      {profile?.responseRate || 0}% response rate
                    </p>
                    <p id="share-popover" className="pointer" style={{ fontSize: 14 }}>
                      <i className="fas fa-share-alt margin-right-five pointer" />
                      Share Profile
                    </p>
                    <Popover
                      placement="bottom"
                      isOpen={openSharePopover}
                      target="share-popover"
                      toggle={toggleSharePopover}
                      className="blog-card-grid blog-card-grid--popover"
                      style={{ maxWidth: '500px' }}
                    >
                      <PopoverBody>
                        <ClickAwayListener
                          onClickAway={() => {
                            setOpenSharePopover(false);
                          }}
                        >
                          <Stack spacing={1} sx={{ width: '100%', flexDirection: 'column', pb: 2 }}>
                            <Typography
                              component="snap"
                              variant="subtitle1"
                              align="left"
                              sx={{ mx: 0.5, color: 'text.primary' }}
                            >
                              Share Profile
                            </Typography>
                            <Stack spacing={2} sx={{ flexGrow: 1, width: '100%', flexDirection: 'row' }}>
                              <WhatsappShareButton
                                url={`${window.location}`}
                                style={{ marginRight: '16px', marginTop: '16px', minWidth: '84px' }}
                              >
                                <WhatsappIcon size={50} round />
                                <Typography
                                  component="snap"
                                  variant="body2"
                                  align="center"
                                  sx={{ pb: 0.5, mx: 1, color: 'text.secondary' }}
                                >
                                  WhatsApp
                                </Typography>
                              </WhatsappShareButton>
                              <FacebookShareButton
                                url={`${window.location}`}
                                style={{ marginRight: '16px', minWidth: '84px' }}
                              >
                                <FacebookIcon size={50} round />
                                <Typography
                                  component="snap"
                                  variant="body2"
                                  align="center"
                                  sx={{ pb: 0.5, mx: 1, color: 'text.secondary' }}
                                >
                                  Facebook
                                </Typography>
                              </FacebookShareButton>
                              <TwitterShareButton
                                url={`${window.location}`}
                                style={{ marginRight: '16px', minWidth: '84px' }}
                              >
                                <TwitterIcon size={50} round />
                                <Typography
                                  component="snap"
                                  variant="body2"
                                  align="center"
                                  sx={{ pb: 0.5, mx: 1, color: 'text.secondary' }}
                                >
                                  Twitter
                                </Typography>
                              </TwitterShareButton>
                              <EmailShareButton url={`${window.location}`} style={{ minWidth: '84px' }}>
                                <EmailIcon size={50} round />
                                <Typography
                                  component="snap"
                                  variant="body2"
                                  align="center"
                                  sx={{ pb: 0.5, mx: 1, color: 'text.secondary' }}
                                >
                                  Email
                                </Typography>
                              </EmailShareButton>
                            </Stack>
                            <CopyClipboard value={`${window.location}`} />
                          </Stack>
                        </ClickAwayListener>
                      </PopoverBody>
                    </Popover>
                  </div>
                </div>
              </div>
              <div className="company-info">
                {profile?.description ? (
                  <Typography>{profile?.description}</Typography>
                ) : (
                  <Typography>Company description not provided</Typography>
                )}
              </div>
            </div>
          </div>
          <div className="service-header  mb-4">
            <h2>Listings</h2>
          </div>
          <div className="company-product-listing mb-5">
            <>
              {loadingVehicles ? (
                <LoadingScreen />
              ) : (
                <>
                  {vehicles && (
                    <Box sx={{ px: 3, py: 1 }}>
                      {vehicles?.GetUserByIdVehicles?.length > 0 ? (
                        <Masonry
                          breakpointCols={breakpoints}
                          className="my-masonry-grid"
                          columnClassName="my-masonry-grid_column"
                        >
                          {vehicles?.GetUserByIdVehicles?.map((vehicle, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                navigate(`/vehicle/${vehicle.id}`);
                              }}
                            >
                              <VehicleProfileCard vehicle={vehicle} />
                            </div>
                          ))}
                        </Masonry>
                      ) : (
                        <>
                          <Container>
                            <MotionContainer initial="initial" open>
                              <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                                <motion.div variants={varBounceIn}>
                                  <Typography component="snap" variant="body1" sx={{ color: 'text.primary' }}>
                                    You currently have nothing in your listings
                                  </Typography>
                                </motion.div>
                              </Box>
                            </MotionContainer>
                          </Container>
                        </>
                      )}
                    </Box>
                  )}
                </>
              )}
            </>
          </div>
          <Stack spacing={4}>
            <Stack spacing={0}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <Typography component="snap" variant="h4">
                  {profile?.businessName}'s ratings
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <RatingStyle readOnly value={getReviews(reviews)} precision={0.1} sx={{ mb: 0 }} />
                  <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                    ({fShortenNumber(getReviews(reviews))}
                    &nbsp;ratings)
                  </Typography>
                </Stack>
              </Stack>
              <Typography component="snap" variant="h5" sx={{ color: 'primary.main' }}>
                ({reviews?.GetUserByIdReviews?.length || 0} Reviews)
              </Typography>
            </Stack>
            <List disablePadding>
              <CarouselProfile reviews={getViews()} />
            </List>
          </Stack>
        </div>
      </section>
    </>
  );
}
