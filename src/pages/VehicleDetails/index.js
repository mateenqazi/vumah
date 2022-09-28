import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  Api,
  Bluetooth,
  DirectionsCar,
  ElectricCar,
  Favorite,
  FavoriteBorder,
  GpsFixed,
  HdrAuto,
  Share,
  Usb
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Container,
  Divider,
  IconButton,
  List,
  Rating,
  Stack,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import Slider from 'react-slick';
import { Popover, PopoverBody } from 'reactstrap';
import useDroidDialog from 'src/hooks/useDroidDialog';
import LoginForm from 'src/layouts/authGuard/LoginForm';
import RegisterForm from 'src/layouts/authGuard/RegisterForm';
import { MAvatar } from '../../components/@material-extend';
import { varFadeInDown } from '../../components/animate';
import VehicleCardSingleImage from '../../components/Cards/VehicleCardSingleImage';
import CopyClipboard from '../../components/CopyClipboard';
// import DroidDateRangePicker from '../../components/DateRangePicker';
import LoadingScreen from '../../components/LoadingScreen';
import ReviewItem from '../../components/ReviewItem';
import {
  CREATE_VEHICLE_CONTACT,
  GET_VEHICLES_IN_RANGE,
  GET_VEHICLE_BY_ID,
  GET_VEHICLE_REVIEWS_BY_ID,
  VEHICLE_ADD_TO_FAVOURITES,
  VEHICLE_REMOVE_FROM_FAVOURITES,
  GET_INSURANCE_POLICY_BY_USERNAME
} from '../../graphql/Queries';
import useAuth from '../../hooks/useAuth';
import { useSelector } from '../../redux/store';
import createAvatar from '../../utils/createAvatar';
import { fCurrency, fNumber } from '../../utils/formatNumber';
import { getCostsDroid, getTimeDiffDroid } from '../../utils/TimeCalc';
import CarouselVehicleImages from './CarouselVehicleImages';
import QuestionsAndAnswers from './QuestionsAndAnswers/index';
import VehicleLocation from './VehicleLocation';
import { LoadingButton } from '@mui/lab';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import DateRangePicker from '../../components/CustomDateRangePicker';

export default function CarListing({ hideSimilarCar, sliderClassName }) {
  const { onOpen } = useDroidDialog();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openSharePopover, setOpenSharePopover] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [discount, setDiscount] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0.2);
  const [isCurrentUserVehicleOwner, setIsCurrentUserVehicleOwner] = useState(false);
  const [nearbyVehicles, setNearbyVehicles] = useState([]);
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const dateRange = useSelector((state) => state.VehicleBookingTime);

  const selectedVehicleOnMap = useSelector((state) => state.SelectedVehicleOnMap);

  const setSelectedVehicleOnMap = (key) => {
    dispatch({
      type: 'SelectedVehicleOnMap',
      payload: key
    });
  };

  useEffect(() => setSelectedVehicleOnMap(0), []);

  const { id } = useParams();

  const {
    loading: loadingReviews,
    data: reviews,
    error: reviewsError
  } = useQuery(GET_VEHICLE_REVIEWS_BY_ID, {
    variables: { id: id }
  });

  const [getVehicle, { loading, error }] = useLazyQuery(GET_VEHICLE_BY_ID, {
    variables: { id: id }
  });

  const [getNearbyVehicles] = useLazyQuery(GET_VEHICLES_IN_RANGE, {
    variables: {
      lng: -0.118092, // London
      lat: 51.509865,
      radius: 10000 // 10KM range
    }
  });

  const [CreateVehicleContact, { loading: contactLoading }] = useMutation(CREATE_VEHICLE_CONTACT);

  const [getUserPolicy, { loading: policyLoading }] = useLazyQuery(GET_INSURANCE_POLICY_BY_USERNAME, {
    variables: { username: vehicle?.user?.userName || vehicle?.user?.email }
  });

  const [openSelectPolicy, setOpenSelectPolicy] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [insurancePolicies, setInsurancePolicies] = useState([]);
  const onSelectPolicy = (id) => {
    const policySelected = insurancePolicies.filter((policy) => policy.id === id)[0];
    setSelectedPolicy(policySelected);
  };

  useEffect(() => {
    if (id !== undefined) {
      getVehicle()
        .then((res) => {
          setVehicle(res.data.VehicleById);
          user?.id && setIsCurrentUserVehicleOwner(user?.id === res.data.VehicleById.user?.id);
          const location = res.data.VehicleById.location;
          getNearbyVehicles({
            variables: {
              lat: location.lat,
              lng: location.lng,
              radius: 10000 // 10KM range
            }
          })
            .then((data) => {
              setNearbyVehicles(data.data.VehiclesWithInRange);

              getUserPolicy({
                variables: { username: res?.data?.VehicleById?.user?.userName || res?.data?.VehicleById?.user?.email }
              }).then((policy) => {
                setInsurancePolicies(policy?.data?.GetInsurancePolicyByUsername);
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  function toggleSharePopover() {
    setOpenSharePopover(!openSharePopover);
  }

  const featureIcons = [
    {
      name: 'Bluetooth',
      icon: <Bluetooth sx={{ m: 1 }} />
    },
    {
      name: 'Automatic gearbox',
      icon: <DirectionsCar sx={{ m: 1 }} />
    },
    {
      name: 'Autopilot',
      icon: <HdrAuto sx={{ m: 1 }} />
    },
    {
      name: 'USB input',
      icon: <Usb sx={{ m: 1 }} />
    },
    {
      name: 'Electric',
      icon: <ElectricCar sx={{ m: 1 }} />
    },
    {
      name: 'GPS',
      icon: <GpsFixed sx={{ m: 1 }} />
    }
  ];

  const getFeatureIcon = (name) => {
    let icon = <Api sx={{ m: 1 }} />;
    featureIcons.map((item) => {
      if (item.name === name) {
        icon = item.icon;
        return icon;
      }
    });
    return icon;
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const [AddFavoritesToUser] = useMutation(VEHICLE_ADD_TO_FAVOURITES, {
    variables: { vehicleID: vehicle?.id }
  });

  const [RemoveFavoritesFromUser] = useMutation(VEHICLE_REMOVE_FROM_FAVOURITES, {
    variables: { vehicleID: vehicle?.id }
  });

  const getReviews = (reviews) => {
    let total = 0.0;
    reviews?.GetVehicleByIdReviews?.map((review) => {
      const t = Number(review?.communicationRating) + Number(review?.vehicleRating) + Number(review?.experienceRating);
      total = total + t;
    });
    return reviews?.GetVehicleByIdReviews?.length > 0
      ? (total / (reviews?.GetVehicleByIdReviews?.length * 3)).toFixed(1)
      : '0.0';
  };

  const onFavoriteClick = () => {
    if (isFavorite) {
      RemoveFavoritesFromUser().then(() => {
        setIsFavorite(false);
        enqueueSnackbar('Vehicle removed from favorites', {
          variant: 'success'
        });
      });
    } else {
      AddFavoritesToUser().then(() => {
        setIsFavorite(true);
        enqueueSnackbar('Vehicle added to favorites', {
          variant: 'success'
        });
      });
    }
  };

  if (error) {
    return <>Error while fetching vehicle</>;
  }

  const bookVehicle = (vehicle) => {
    if (vehicle?.user?.id === user?.id) {
      enqueueSnackbar('Please you can not rent your own vehicle', {
        variant: 'error'
      });
    } else {
      if (vehicle?.vehicleType === 'MOTORCYCLE') {
        if (
          user?.licenseType === vehicle?.licenseType ||
          user?.licenseType === 'A2' ||
          (user?.licenseType === 'A1' && user?.licenseType !== 'A2')
        ) {
          navigate(`/request-booking/${vehicle.id}`);
        } else {
          enqueueSnackbar(`Please you are required to be with an ${vehicle?.licenseType} license`, {
            variant: 'error'
          });
        }
      } else {
        navigate(`/request-booking/${vehicle.id}`);
      }
    }
  };

  const getValuesHere = () => {
    if (vehicle?.freeCancellation) {
      return '';
    } else {
      if (vehicle?.isFixedPrice) {
        return `£${vehicle?.cancellationPercentage}`;
      } else {
        return `${vehicle?.cancellationPercentage}%`;
      }
    }
  };

  function handleDateRangeEvent(value) {
    dispatch({
      type: 'VehicleBookingTime',
      payload: {
        fromDate: moment(value.startDate),
        toDate: moment(value.endDate)
      }
    });
  }

  console.log(dateRange, 'range');

  return (
    <section className="carModal-full-detail padd-bottom-60 padd-top-30">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <Stack direction={'row'} sx={{ mb: 2, justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography component="snap" variant="h5">
                {vehicle?.make} {vehicle?.model}
              </Typography>
              <Typography component="snap" variant="body2">
                Model year - {vehicle?.year}
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex' }}>
              <Typography
                onClick={onFavoriteClick}
                component="snap"
                variant="body2"
                sx={{ color: isFavorite ? 'primary' : null, mr: 1, cursor: 'pointer' }}
              >
                <IconButton aria-label="add to favourites" sx={{ color: isFavorite ? 'primary.main' : '' }}>
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                {isFavorite ? 'Added to favourites' : 'Add to favourites'}
              </Typography>
              <Typography
                component="snap"
                id="share-popover"
                variant="body2"
                sx={{ color: isFavorite ? 'primary' : null, mr: 1, cursor: 'pointer' }}
              >
                <IconButton aria-label="add to favourites" sx={{ ml: 2 }}>
                  <Share />
                </IconButton>
                Share Vehicle
              </Typography>
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
                        Share Vehicle
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
            </Box>
          </Stack>
          {vehicle?.images !== undefined && <CarouselVehicleImages images={vehicle?.images} />}
          <div className="row mb-5 mb-lg-0">
            <div className="col-md-7 ">
              {vehicle?.user !== undefined && (
                <Stack direction="row" sx={{ mb: 0.5, alignItems: 'center', pt: 3 }} spacing={1}>
                  <MAvatar
                    src={vehicle?.user?.avatarUrl}
                    alt={vehicle?.user?.firstName}
                    color="default"
                    sx={{ m: 2, mr: 3, ml: 0, width: 64, height: 64 }}
                  >
                    {createAvatar(vehicle?.user?.firstName).name}
                  </MAvatar>
                  <Stack>
                    <Typography component="snap" variant="body2">
                      Hosted by{' '}
                      <snap style={{ fontWeight: '700' }}>
                        {vehicle?.user?.firstName} {vehicle?.user?.lastName}
                      </snap>
                    </Typography>
                    <Typography component="snap" variant="caption" sx={{ pt: 1 }}>
                      Level 1 host
                    </Typography>
                    <Link to={`/profile/${vehicle?.user?.id}`}>
                      <Typography component="snap" variant="caption" color="primary" sx={{ pt: 2 }}>
                        View Profile
                      </Typography>
                    </Link>
                  </Stack>
                </Stack>
              )}
              <div className="feature-list mb-4">
                <div className="carModal-header mb-4">
                  <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
                    Features
                  </Typography>
                </div>
                <ul className="d-flex flex-wrap padding-left-zero">
                  {vehicle?.features !== undefined && (
                    <>
                      {vehicle?.features.map((feature, index) => (
                        <li key={index}>
                          {getFeatureIcon(feature.name)}
                          {feature.name}
                        </li>
                      ))}
                    </>
                  )}
                </ul>
                <Stack spacing={2} sx={{ p: 1, pt: 4 }}>
                  <Typography component="snap" variant="h5">
                    Cancellation Policy
                  </Typography>
                  <Typography component="snap" variant="body2" sx={{ pt: 1 }}>
                    Cancellation Fee: {getValuesHere()}
                  </Typography>
                  {vehicle?.freeCancellation ? (
                    <Typography component="snap" variant="body2" sx={{ maxWidth: '450px' }}>
                      *When booking a vehicle on the Vumah platform we allow free cancellations up to 24hrs before the
                      trip start to allow flexibility for our guests.
                      <br />
                      If the guest chooses to cancel for any reason within the 24 hours period of the trip start, the
                      guest will be subject to a late cancellation fee and will be refunded the remainder that is on
                      hold.
                    </Typography>
                  ) : (
                    <Typography component="snap" variant="body2" sx={{ maxWidth: '400px' }}>
                      {vehicle?.cancellationDescription}
                    </Typography>
                  )}
                </Stack>
              </div>

              <div className="carModal-header mb-4">
                <Stack spacing={1}>
                  <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
                    Description
                  </Typography>
                  <Typography component="snap" variant="body2">
                    {vehicle?.description}
                  </Typography>
                </Stack>
              </div>

              {!loadingReviews && (
                <Stack spacing={2} sx={{ pt: 2, mb: 2 }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Typography component="snap" variant="h5">
                      {vehicle?.make}'s ratings
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Rating readOnly value={getReviews(reviews)} precision={0.1} sx={{ mb: 0 }} />
                      <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                        ({reviews?.GetVehicleByIdReviews?.length || 0} &nbsp;reviews)
                      </Typography>
                    </Stack>
                  </Stack>
                  {reviews?.GetVehicleByIdReviews?.length > 0 ? (
                    <List disablePadding>
                      {reviews?.GetVehicleByIdReviews?.map((review) => (
                        <ReviewItem key={review?.id} review={review} />
                      ))}
                    </List>
                  ) : (
                    <>
                      <>
                        <Box sx={{ position: 'relative' }}>
                          <Container
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 1, pb: 3 }}
                          >
                            <motion.div variants={varFadeInDown}>
                              <Typography component="snap" variant="body2" sx={{ color: 'text.primary' }}>
                                There are no reviews for this vehicle yet
                              </Typography>
                            </motion.div>
                          </Container>
                        </Box>
                      </>
                    </>
                  )}
                </Stack>
              )}

              <div className="location-map mb-4">
                <div className="carModal-header mb-4">
                  <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
                    Location
                  </Typography>
                </div>
                <div className="location-map-inner">
                  <Card>
                    <CardContent sx={{ height: '300px', p: 0 }} style={{ paddingBottom: 0 }}>
                      {vehicle?.location !== undefined && <VehicleLocation map={vehicle?.location} />}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {isAuthenticated ? (
                <QuestionsAndAnswers id={vehicle?.id} />
              ) : (
                <div className="carModal-header mb-4">
                  <div className="row align-items-center mb-3">
                    <div className="col-md-6">
                      <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
                        Questions & Answers
                      </Typography>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end Answers-lock">
                      <span title="Please login first to post">
                        <i className="fas fa-lock" style={{ color: 'var(--secondary-color)' }}></i>
                      </span>
                      <button
                        className="qna-arrow"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        <i className="fas fa-chevron-down" style={{ color: 'var(--secondary-color)' }}></i>
                      </button>
                    </div>
                  </div>
                  <p className="unlock-text" style={{ display: 'flex' }}>
                    <div
                      style={{ color: 'var(--secondary-color)', cursor: 'pointer', margin: '0px 5px 0px 5px' }}
                      onClick={() =>
                        onOpen(
                          '',
                          <>
                            <LoginForm />
                          </>
                        )
                      }
                    >
                      Login
                    </div>
                    or{'  '}
                    <div
                      style={{ color: 'var(--secondary-color)', cursor: 'pointer', margin: '0px 5px 0px 5px' }}
                      onClick={() =>
                        onOpen(
                          'Set up an account',
                          <>
                            <RegisterForm />
                          </>
                        )
                      }
                    >
                      Sign Up
                    </div>
                    {'  '}
                    to ask a public question
                  </p>
                </div>
              )}
            </div>
            <div className="col-md-4" style={{ minWidth: '430px', marginLeft: 'auto' }}>
              <div className="pick-range-box">
                <Stack spacing={2}>
                  <Stack spacing={2} direction={'row'} justifyContent="space-between">
                    <Typography component="snap" variant="h6">
                      Vehicle Rates
                    </Typography>
                    <Stack spacing={1} justifyContent="space-between">
                      <Typography component="snap" variant="h6">
                        £{vehicle?.dailyRates}/day{' '}
                        {vehicle?.hourlyRates !== 0 || vehicle?.hourlyRates !== '0' || vehicle?.hourlyRates
                          ? `(£${vehicle?.hourlyRates}/hr)`
                          : null}
                      </Typography>
                      {(Number(vehicle?.pastDailyRates) > Number(vehicle?.dailyRates) ||
                        Number(vehicle?.pastHourlyRates) > Number(vehicle?.hourlyRates)) && (
                        <Typography component="snap" variant="caption">
                          {Number(vehicle?.pastDailyRates) > Number(vehicle?.dailyRates) && (
                            <strike>£{vehicle?.pastDailyRates}/day </strike>
                          )}
                          {Number(vehicle?.pastHourlyRates) > Number(vehicle?.hourlyRates) && (
                            <strike>{`(£${vehicle?.pastHourlyRates}/hr)`}</strike>
                          )}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                  <Stack spacing={0.5}>
                    <Stack spacing={2} direction={'row'} justifyContent="space-between">
                      <Typography component="snap" variant="body1">
                        Distance included
                      </Typography>
                      <Typography component="snap" variant="body1">
                        {fNumber(vehicle?.mileage) || 0} mil
                      </Typography>
                    </Stack>
                    <Typography component="snap" variant="caption">
                      £{fNumber(vehicle?.mileageRates) || 0}/mil fee for additional miles driven
                    </Typography>
                  </Stack>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setOpenSelectPolicy(!openSelectPolicy)}
                    sx={{ width: '100%', borderRadius: '100px' }}
                    id="policy-popover"
                  >
                    {selectedPolicy ? selectedPolicy.name : 'Select Insurance Policy'}
                  </Button>
                  <Popover
                    placement="bottom"
                    isOpen={openSelectPolicy}
                    target="policy-popover"
                    toggle={() => setOpenSelectPolicy(!openSelectPolicy)}
                    className="blog-card-grid blog-card-grid--popover"
                    style={{ maxWidth: '500px' }}
                  >
                    <PopoverBody>
                      <ClickAwayListener
                        onClickAway={() => {
                          setOpenSelectPolicy(false);
                        }}
                      >
                        <Stack spacing={1} sx={{ width: '100%', flexDirection: 'column', pb: 2 }}>
                          <Typography
                            component="snap"
                            variant="subtitle1"
                            align="left"
                            sx={{ mx: 0.5, color: 'text.primary' }}
                          >
                            {policyLoading ? "Loading..." : "Select Policy"}
                          </Typography>
                          <Stack spacing={2} sx={{ flexGrow: 1, width: '100%', flexDirection: 'column' }}>
                            {insurancePolicies?.map((policy) => (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                                  border: '1px solid',
                                  borderColor: '#f67810'
                                }}
                                onClick={() => onSelectPolicy(policy.id)}
                              >
                                <Typography
                                  component="snap"
                                  variant="body2"
                                  // align="center"
                                  sx={{ pb: 0.5, mx: 1, color: 'text.secondary' }}
                                >
                                  {policy.name}
                                </Typography>

                                <Typography
                                  component="snap"
                                  variant="body2"
                                  // align="center"
                                  sx={{ pb: 0.5, mx: 1, color: 'text.secondary' }}
                                >
                                  {policy.description}
                                </Typography>

                                <Typography
                                  component="snap"
                                  variant="body2"
                                  // align="center"
                                  sx={{ pb: 0.5, mx: 1, color: '#f67810' }}
                                >
                                  £ {policy.price}
                                  {selectedPolicy && selectedPolicy.id === policy.id && (
                                    <p className="ml-3 mr-2" style={{ color: theme.palette.success.main }}>
                                      <i className="fas fa-check margin-right-five" />
                                      selected
                                    </p>
                                  )}
                                </Typography>
                              </div>
                            ))}
                          </Stack>
                        </Stack>
                      </ClickAwayListener>
                    </PopoverBody>
                  </Popover>
                  {/* <DroidDateRangePicker
                    unavailableDays={vehicle?.availability
                      ?.filter((a) => a.timeType !== 'All Day')
                      .map((a) => {
                        return {
                          ...a,
                          moment: moment(a?.dayStart)
                        };
                      })}
                  /> */}
                  <DateRangePicker
                    unavailableDays={vehicle?.availability?.filter((a) => a.timeType !== 'All Day')}
                    onChange={handleDateRangeEvent}
                  />
                  <Stack spacing={2}>
                    <Stack spacing={0}>
                      <Stack direction="row" justifyContent="flex-start">
                        {/*<Typography component="snap" variant="caption">*/}
                        {/*  Time*/}
                        {/*</Typography>*/}
                        <Typography component="snap" variant="caption">
                          {getTimeDiffDroid(dateRange).days} days & {getTimeDiffDroid(dateRange).hours} hours &{' '}
                          {getTimeDiffDroid(dateRange).minutes} minutes
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography component="snap" variant="body2">
                          Vehicle cost:
                        </Typography>
                        <Typography component="snap" variant="body2">
                          £{fCurrency(getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates))}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography component="snap" variant="body2">
                        Monthly discount: {discount}% off
                      </Typography>
                      <Typography component="snap" variant="body2">
                        -£{fCurrency(discount)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography component="snap" variant="body2">
                        Cleaning fee
                      </Typography>
                      <Typography component="snap" variant="body2">
                        £{fCurrency(cleaningFee)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography component="snap" variant="body2">
                        Insurance fee
                      </Typography>
                      <Typography component="snap" variant="body2">
                        £{fCurrency(selectedPolicy ? selectedPolicy.price : 0)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography component="snap" variant="body2">
                        Service fee
                      </Typography>
                      <Typography component="snap" variant="body2">
                        £{fCurrency(getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) * serviceFee)}
                      </Typography>
                    </Stack>
                    <Divider style={{ height: 0 }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography component="snap" variant="subtitle1">
                        Total
                      </Typography>
                      <Typography component="snap" variant="subtitle1">
                        £
                        {fCurrency(
                          getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) -
                            discount +
                            cleaningFee +
                            serviceFee +
                            (selectedPolicy ? selectedPolicy.price : 0)
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack alignItems={'flex-end'}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => bookVehicle(vehicle)}
                      disabled={
                        getCostsDroid(dateRange, vehicle?.dailyRates, vehicle?.hourlyRates) === 0 ||
                        selectedPolicy === null
                      }
                      sx={{ width: '100%', borderRadius: '100px' }}
                    >
                      Continue
                    </Button>
                  </Stack>
                </Stack>
              </div>

              <div className="pick-range-box mt-4">
                <div className="d-flex justify-content-between ml-1 mr-1" style={{ alignItems: 'center' }}>
                  <Typography component="snap" variant="body2">
                    Have questions?
                  </Typography>
                  <LoadingButton
                    loading={contactLoading}
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      CreateVehicleContact({ variables: { vehicleID: vehicle?.id } })
                        .then((res) => {
                          const contact = res.data.CreateVehicleContact;
                          const url = `/messages/${contact.id}/${vehicle?.id}`;
                          navigate(url);
                        })
                        .catch((error) => {});
                    }}
                    style={{
                      border: '1px solid #f67810',
                      color: '#f67810',
                      borderRadius: '100px'
                    }}
                  >
                    Contact Host
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
          {!hideSimilarCar && (
            <div className="carModal-header mb-4 mt-4">
              <Typography component="snap" variant="h5" sx={{ pt: 2 }}>
                Other vehicles nearby
              </Typography>
            </div>
          )}
          {nearbyVehicles !== undefined && (
            <div>
              {nearbyVehicles !== undefined && (
                <>
                  {nearbyVehicles.length > 3 ? (
                    <>
                      <Slider
                        dots={false}
                        infinite={true}
                        // speed={300}
                        slidesToShow={3}
                        slidesToScroll={1}
                        className="modal-car-slider"
                        style={{ marginBottom: '8px', marginTop: '8px' }}
                        autoplay={true}
                        autoplaySpeed={4000}
                        responsive={[
                          {
                            breakpoint: 1024,
                            settings: {
                              slidesToShow: 3,
                              slidesToScroll: 3,
                              infinite: true,
                              dots: true
                            }
                          },
                          {
                            breakpoint: 600,
                            settings: {
                              slidesToShow: 2,
                              slidesToScroll: 2,
                              initialSlide: 2
                            }
                          },
                          {
                            breakpoint: 480,
                            settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1
                            }
                          }
                        ]}
                      >
                        {nearbyVehicles.map((vehicle, index) => {
                          const isSelected = selectedVehicleOnMap === vehicle.id;

                          return (
                            <div
                              key={index}
                              onClick={() => {
                                if (!isSelected) setSelectedVehicleOnMap(vehicle.id);
                                else navigate(`/vehicle/${vehicle.id}`);
                              }}
                            >
                              <VehicleCardSingleImage vehicle={vehicle} isSelected={isSelected} />
                            </div>
                          );
                        })}
                      </Slider>
                    </>
                  ) : (
                    <Stack direction="row">
                      {nearbyVehicles.map((vehicle, index) => {
                        const isSelected = selectedVehicleOnMap === vehicle.id;
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              if (!isSelected) setSelectedVehicleOnMap(vehicle.id);
                              else navigate(`/vehicle/${vehicle.id}`);
                            }}
                          >
                            <VehicleCardSingleImage vehicle={vehicle} isSelected={isSelected} />
                          </div>
                        );
                      })}
                    </Stack>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
