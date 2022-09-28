import React, { useState } from 'react';
import { Popover, PopoverBody } from 'reactstrap';

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
import CustomerReview from '../../assets/img/customer-review-img-1.png';
import SecurityImage from '../../assets/img/security.png';
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Container,
  LinearProgress,
  List,
  ListItem,
  Pagination,
  Rating,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CopyClipboard from '../../components/CopyClipboard';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_REVIEWS_BY_ID, GET_USER_VEHICLES, UPDATE_USER } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';
import Masonry from 'react-masonry-css';
import VehicleProfileCard from '../../components/Cards/VehicleProfileCard';
import { UploadImage } from '../../utils/UploadImage';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../../components/@material-extend';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../../components/animate';
import moment from 'moment';
import { fDate } from '../../utils/formatTime';
import { styled } from '@mui/material/styles';
import { fShortenNumber } from '../../utils/formatNumber';
import ReviewItem from '../../components/ReviewItem';
import { useNavigate } from 'react-router-dom';

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: 120,
  margin: 'auto'
}));

const RootStyleProfile = styled('div')(({ theme }) => ({
  width: 150,
  height: 110,
  margin: 'auto'
}));

export default function PrivateReview({ loadingReviews, reviews }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USER_VEHICLES);

  const [UpdateUserInfo] = useMutation(UPDATE_USER);
  const { enqueueSnackbar } = useSnackbar();

  const [loadingUpdateDesc, setLoadingUpdateDesc] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [coverImage, setCoverImage] = useState(user?.cover || null);
  const [profileImage, setProfileImage] = useState(user?.avatarUrl || null);
  const [openSharePopover, setOpenSharePopover] = useState(false);
  const [description, setDescription] = useState(user?.description || '');

  const onCoverImageChange = async (e) => {
    setLoadingUpdate(true);
    const fileUp = await UploadImage(e.target.files[0]);
    await UpdateUserInfo({
      variables: {
        user: {
          id: user.id,
          businessName: user.businessName,
          address: user.address,
          address2: user.address2,
          city: user.city,
          country: user.country,
          description: user.description,
          postalCode: user.postalCode,
          avatarUrl: user.avatarUrl,
          cover: fileUp
        }
      }
    })
      .then((res) => {
        setCoverImage(fileUp);
        enqueueSnackbar('User cover photo updated successfully', {
          variant: 'success'
        });
      })
      .catch((error) => {
        enqueueSnackbar('User cover photo updated failed', {
          variant: 'error'
        });
      });
    setLoadingUpdate(false);
  };

  const onProfileImageChange = async (e) => {
    setLoadingUpdate(true);
    const fileUp = await UploadImage(e.target.files[0]);
    await UpdateUserInfo({
      variables: {
        user: {
          id: user.id,
          businessName: user.businessName,
          address: user.address,
          address2: user.address2,
          city: user.city,
          country: user.country,
          description: user.description,
          postalCode: user.postalCode,
          cover: user.cover,
          avatarUrl: fileUp
        }
      }
    })
      .then((res) => {
        setProfileImage(fileUp);
        enqueueSnackbar('User cover photo updated successfully', {
          variant: 'success'
        });
      })
      .catch((error) => {
        enqueueSnackbar('User cover photo updated failed', {
          variant: 'error'
        });
      });
    setLoadingUpdate(false);
  };

  function toggleSharePopover() {
    setOpenSharePopover(!openSharePopover);
  }

  const changeTextArea = async () => {
    setLoadingUpdateDesc(true);
    await UpdateUserInfo({
      variables: {
        user: {
          id: user.id,
          businessName: user.businessName,
          address: user.address,
          address2: user.address2,
          city: user.city,
          country: user.country,
          description: description,
          postalCode: user.postalCode,
          avatarUrl: user.avatarUrl,
          cover: user.cover
        }
      }
    })
      .then((res) => {
        setCoverImage(fileUp);
        enqueueSnackbar('User cover photo updated successfully', {
          variant: 'success'
        });
      })
      .catch((error) => {
        enqueueSnackbar('User cover photo updated failed', {
          variant: 'error'
        });
      });
    setLoadingUpdateDesc(false);
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

  return (
    <>
      <section className="public-review-main padd-top-60 padd-bottom-60">
        {loadingUpdate && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
        <div className="container">
          <div className="company-product-info mb-5">
            <div className="public-review-bg position-relative">
              <RootStyle>
                <Box
                  component="img"
                  alt="avatar"
                  src={coverImage ? coverImage : ReviewBg}
                  sx={{ zIndex: 8, objectFit: 'cover' }}
                />
              </RootStyle>
              {/*<img src={coverImage ? coverImage : ReviewBg} alt="review-bg" className="profile-pic" />*/}
              <div className="p-image">
                <label htmlFor="cover-image" className="mb-0 pointer">
                  <i className="fa fa-camera upload-button" />
                </label>
                <input
                  id="cover-image"
                  className="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={onCoverImageChange}
                />
              </div>
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
                        precision={0.1}
                        size="small"
                      />
                    </Stack>
                  </div>
                  <div className="level-four d-flex justify-content-center justify-content-md-start align-items-center">
                    <img src={SecurityImage} alt="Security Image" className="margin-right-ten" />
                    <h2>Level {user?.hostLevel || 0} host</h2>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="company-info-center">
                    <div className="company-review-img mb-3 position-relative">
                      <RootStyleProfile>
                        <Box
                          component="img"
                          alt="avatar"
                          src={profileImage ? profileImage : CompanyReview}
                          sx={{ zIndex: 8, objectFit: 'cover' }}
                        />
                      </RootStyleProfile>
                      <div className="p-image">
                        <label htmlFor="profile-image" className="mb-0 pointer">
                          <i className="fa fa-camera car-upload-button" />
                        </label>
                        <input
                          id="profile-image"
                          className="car-file-upload"
                          type="file"
                          accept="image/*"
                          onChange={onProfileImageChange}
                        />
                      </div>
                    </div>
                    <h2>{user?.businessName}</h2>
                  </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
                  <div className="company-info-right pl-5 ">
                    <p style={{ fontSize: 14 }}>
                      <i className="fas fa-check-circle margin-right-five" /> Avg response time{' '}
                      {user?.responseTime || 0}hrs
                    </p>
                    <p style={{ fontSize: 14 }}>
                      <i className="fas fa-clock margin-right-five" />
                      {user?.responseRate || 0}% response rate
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
                              Share your profile
                            </Typography>
                            <Stack spacing={2} sx={{ flexGrow: 1, width: '100%', flexDirection: 'row' }}>
                              <WhatsappShareButton
                                url={`${window.location}/${user.id}`}
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
                                url={`${window.location}/${user.id}`}
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
                                url={`${window.location}/${user.id}`}
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
                              <EmailShareButton url={`${window.location}/${user.id}`} style={{ minWidth: '84px' }}>
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
                            <CopyClipboard value={`${window.location}/${user.id}`} />
                          </Stack>
                        </ClickAwayListener>
                      </PopoverBody>
                    </Popover>
                  </div>
                </div>
              </div>

              <Stack spacing={2} sx={{ width: '100%', pt: 4 }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Business description"
                  fullWidth
                  multiline
                  rows={3}
                  value={description}
                  placeholder="Enter your company description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <LoadingButton
                  loading={loadingUpdateDesc}
                  variant="contained"
                  disabled={description === user?.description || description === ''}
                  onClick={changeTextArea}
                  sx={{ maxWidth: '250px' }}
                >
                  Save Description
                </LoadingButton>
              </Stack>
            </div>
          </div>
          <div className="service-header  mb-4">
            <h2>Listings</h2>
          </div>
          <div className="company-product-listing mb-5">
            <>
              {loading ? (
                <LoadingScreen />
              ) : (
                <>
                  {data && (
                    <Box sx={{ px: 3, py: 1 }}>
                      {data?.GetUserVehicles?.length > 0 ? (
                        <Masonry
                          breakpointCols={breakpoints}
                          className="my-masonry-grid"
                          columnClassName="my-masonry-grid_column"
                        >
                          {data?.GetUserVehicles?.map((vehicle, index) => (
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
          {/*<div className="car-rating-main">*/}
          {/*  {!loadingReviews && <>*/}
          {/*    <h2>*/}
          {/*      <i className="fas fa-star mr-2" />*/}
          {/*      {getReviews(reviews)} ({reviews?.GetUserByIdReviews?.length || 0} Reviews)*/}
          {/*    </h2>*/}
          {/*    {reviews?.GetUserByIdReviews?.length > 0 ? <>*/}
          {/*      {reviews?.GetUserByIdReviews?.map((review) => (<>*/}
          {/*        <div className="car-people-rating mb-4">*/}
          {/*          <div className="rated-person-info d-flex mb-2 align-items-center">*/}
          {/*            <div className="rated-person-img margin-right-ten">*/}
          {/*              <img src={review?.user?.avatarUrl ? review?.user?.avatarUrl : CustomerReview}*/}
          {/*                   alt="rated-person" />*/}
          {/*            </div>*/}
          {/*            <div className="rated-person-info">*/}
          {/*              <h2>{review?.user?.firstName} {review?.user?.lastName}</h2>*/}
          {/*              <p>{moment(review?.postedAt).format("MMMM YYYY")}</p>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <p>{review?.comment}</p>*/}
          {/*        </div>*/}
          {/*      </>))}*/}
          {/*    </> : <>*/}
          {/*      <Container>*/}
          {/*        <MotionContainer initial="initial" open>*/}
          {/*          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>*/}
          {/*            <motion.div variants={varBounceIn}>*/}
          {/*               <Typography component="snap" variant="body1" sx={{ color: "text.primary" }}>*/}
          {/*                You currently have nothing in your reviews*/}
          {/*              </Typography>*/}
          {/*            </motion.div>*/}
          {/*          </Box>*/}
          {/*        </MotionContainer>*/}
          {/*      </Container>*/}
          {/*    </>*/}
          {/*    }*/}
          {/*  </>}*/}
          {/*</div>*/}

          <Stack spacing={4}>
            <Stack spacing={0}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <Typography component="snap" variant="h4">
                  {user?.businessName}'s ratings
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <RatingStyle readOnly value={getReviews(reviews)} precision={0.1} sx={{ mb: 0 }} />
                  <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                    ({fShortenNumber(getReviews(reviews))}
                    &nbsp;reviews)
                  </Typography>
                </Stack>
              </Stack>
              <Typography component="snap" variant="h5" sx={{ color: 'primary.main' }}>
                ({reviews?.GetUserByIdReviews?.length || 0} Reviews)
              </Typography>
            </Stack>
            <List disablePadding>
              {reviews?.GetUserByIdReviews?.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Pagination count={10} color="primary" />
            </Box>
          </Stack>
        </div>
      </section>
    </>
  );
}
