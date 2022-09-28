import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Switch,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { Menu, Dropdown as AntDDropdown } from 'antd';
import {
  Close,
  DirectionsCar,
  DirectionsCarFilled,
  ElectricBike,
  ElectricCar,
  ElectricRickshaw,
  ElectricScooter,
  Moped,
  PedalBike,
  TwoWheeler
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useLazyQuery, useMutation } from '@apollo/client';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { MIconButton } from '../../components/@material-extend';
import UploadImages from './UploadImages';
import Scrollbar from '../../components/Scrollbar';
import img from '../../assets/img/img.png';
import LocationBox from './LocationBox';
import { UploadImages as UploadFileImages } from '../../utils/UploadImage';
import { GET_VEHICLE_DETAILS, REGISTER_VEHICLE } from '../../graphql/Queries';
import Availability from './AddAvailability';
import AddFeatures from './AddFeatures';
import { LoadingButton } from '@mui/lab';
import CarouselVehicles from '../../components/VehicleCarousel/CarouselVehicles';
import useDroidDialog from '../../hooks/useDroidDialog';
import CustomizedSteppers from './Charts/CustomizedStepper';
import { useLocation } from 'react-router-dom';
import vehicleData from '../../utils/vehicleData';
import _ from 'lodash';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import moment from 'moment';

// ----------------------------------------------------------------------

const STEPS = ['Details', 'Location', 'Feature', 'Policy', 'Images', 'Availability'];
const STEPS_BICYCLE = ['Details', 'Location', 'Policy', 'Images', 'Availability'];

// ----------------------------------------------------------------------

export default function AddVehicle({ vehicle, isEdit = false, getVehicles }) {
  const { onClose } = useDroidDialog();

  const { pathname } = useLocation();
  const [pickupTime, setPickupTime] = useState('Sun Dec 20 2021 00:00:00');
  const [dropoffTime, setDropoffTime] = useState('Sun Dec 20 2021 23:59:00');

  useEffect(() => {
    if (!pathname.startsWith('/vehicle-listing')) onClose();
  }, [pathname]);

  const [activeStep, setActiveStep] = useState(0);

  const [files, setFiles] = useState([]);

  const [images, setImages] = useState(vehicle?.images || []);

  const [loadingSetUp, setLoadingSetUp] = useState({ show: false, status: 'warning', message: 'message' });

  const [features, setFeatures] = useState([]);

  const [map, setMap] = useState({
    address: '',
    city: '',
    area: '',
    state: '',
    placeId: '',
    zoom: 15,
    height: 300,
    mapPosition: {
      lat: 0,
      lng: 0
    },
    markerPosition: {
      lat: 0,
      lng: 0
    }
  });

  const [monday, setMonday] = React.useState(null);
  const [tuesday, setTuesday] = React.useState(null);
  const [wednesday, setWednesday] = React.useState(null);
  const [thursday, setThursday] = React.useState(null);
  const [friday, setFriday] = React.useState(null);
  const [saturday, setSaturday] = React.useState(null);
  const [sunday, setSunday] = React.useState(null);

  const getVehicleIcon = (name) => {
    let vehicleType = { label: 'Car', name: '2-AXLE-RIGID BODY', icon: <DirectionsCarFilled /> };
    const icons = [
      { label: 'Bicycle', name: 'Bicycle', icon: <PedalBike /> },
      { label: 'Motorbike', name: 'Motorbike', icon: <TwoWheeler /> },
      { label: 'Motorbike', name: '2 WHEEL', icon: <TwoWheeler /> },
      { label: 'Car', name: 'Car', icon: <DirectionsCarFilled /> },
      { label: 'Car', name: '2 AXLE RIGID BODY', icon: <DirectionsCarFilled /> },
      { label: '', name: 'Campervan', icon: <DirectionsCar /> },
      { label: '', name: 'ElectricScooter', icon: <ElectricScooter /> },
      { label: '', name: 'ElectricCar', icon: <ElectricCar /> },
      { label: '', name: 'ElectricBike', icon: <ElectricBike /> },
      { label: '', name: 'ElectricRickshaw', icon: <ElectricRickshaw /> },
      { label: '', name: 'Moped', icon: <Moped /> }
    ];
    icons.map((item) => {
      if (item.name === name) {
        vehicleType = item;
        return item;
      }
    });

    return vehicleType;
  };

  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    make: Yup.string().required('make required')
  });

  // const CarSchema = Yup.object().shape({
  //   vehicleType: Yup.string().required('Vehicle required'),
  //   reg: Yup.string().required('License number plate required'),
  //   make: Yup.string().required('Car make required'),
  //   model: Yup.string().required('Car model required'),
  //   fuelType: Yup.string().required('Fuel type required'),
  //   year: Yup.string().required('Production year required'),
  //   bodyType: Yup.string().required('Body type required'),
  //   gearBox: Yup.string().required('Gear box required'),
  //   mileage: Yup.string().required('Mileage required'),
  //   mileageRates: Yup.string().required('Mileage rates required'),
  //   hourlyRates: Yup.string().required('Hourly rates required'),
  //   dailyRates: Yup.string().required('Daily rates required'),
  //   description: Yup.string().required('Vehicle description required'),
  //   isFixedPrice: Boolean(vehicle?.isFixedPrice) || false,
  //   freeCancellation: Boolean(vehicle?.freeCancellation) || false,
  //   cancellationPercentage: vehicle?.cancellationPercentage || '',
  //   cancellationDescription: vehicle?.cancellationDescription || '',
  //   images: vehicle?.images || [],
  //   availability: vehicle?.availability || [],
  //   features: vehicle?.features || [],
  //   location: {
  //     address: vehicle?.location?.address || '',
  //     city: vehicle?.location?.city || '',
  //     area: vehicle?.location?.area || '',
  //     state: vehicle?.location?.state || '',
  //     placeId: vehicle?.location?.placeId || '',
  //     lat: vehicle?.location?.lat || '',
  //     lng: vehicle?.location?.lng || ''
  //   }
  // });

  //MA68HXM
  const createVehicleInitialValue = {
    id: vehicle?.id || 0,
    vehicleType: vehicle?.vehicleType || 'CAR',
    reg: vehicle?.reg || '',
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    fuelType: vehicle?.fuelType || '',
    year: vehicle?.year || '',
    bikeType: vehicle?.bikeType || '',
    bodyType: vehicle?.bodyType || '',
    gearBox: vehicle?.gearBox || '',
    mileage: vehicle?.mileage || 0,
    mileageRates: vehicle?.mileageRates || 0,
    hourlyRates: vehicle?.hourlyRates || 0,
    dailyRates: vehicle?.dailyRates || 0,
    description: vehicle?.description || '',
    licenseType: vehicle?.licenseType || '',
    status: vehicle?.status || false,
    isFixedPrice: Boolean(vehicle?.isFixedPrice) || false,
    freeCancellation: Boolean(vehicle?.freeCancellation) || false,
    cancellationPercentage: vehicle?.cancellationPercentage || 0.0,
    isLateFixedPrice: Boolean(vehicle?.isLateFixedPrice) || false,
    freeLateCancellation: Boolean(vehicle?.freeLateCancellation) || false,
    lateCancellationPercentage: vehicle?.lateCancellationPercentage || 0.0,
    cancellationDescription: vehicle?.cancellationDescription || '',
    images: vehicle?.images || [],
    availability: vehicle?.availability || [],
    features: vehicle?.features || [],
    location: {
      address: vehicle?.location?.address || '',
      city: vehicle?.location?.city || '',
      area: vehicle?.location?.area || '',
      state: vehicle?.location?.state || '',
      placeId: vehicle?.location?.placeId || '',
      lat: vehicle?.location?.lat || '',
      lng: vehicle?.location?.lng || ''
    }
  };

  const [CreateVehicle] = useMutation(REGISTER_VEHICLE);

  const formik = useFormik({
    initialValues: createVehicleInitialValue,
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await uploadData(false);

        setLoadingSetUp({
          show: false,
          status: 'warning',
          message: 'Uploaded Vehicle Data'
        });

        enqueueSnackbar(vehicle?.id ? 'Changes saved successfully' : 'Vehicle created successfully', {
          variant: 'success'
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        onClose();
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, isSubmitting, setValues, setSubmitting, setErrors } =
    formik;

  const isEmptyFormData = () => {
    return (
      values &&
      isNotDetailEmpty() &&
      isNotMapEmpty() &&
      isNotFeatureEmpty() &&
      isNotPolicyEmpty() &&
      isNotImageEmpty() &&
      isNotAvailablityEmpty()
    );
  };

  const isNotMapEmpty = () => {
    return map && !_.isEmpty(map.address) && !_.isEmpty(dropoffTime) && !_.isEmpty(pickupTime);
  };

  const isNotDetailEmpty = () => {
    return (
      !_.isEmpty(values.reg) &&
      !_.isEmpty(values.make) &&
      !_.isEmpty(values.model) &&
      !_.isEmpty(values.bodyType) &&
      !_.isEmpty(values.gearBox) &&
      !_.isEmpty(values.fuelType) &&
      values.year !== '' &&
      values.dailyRates > 0
    );
  };

  const isNotFeatureEmpty = () => {
    return !_.isEmpty(values.description) && features.some((a) => a.checked);
  };

  const isNotPolicyEmpty = () => {
    return values.freeCancellation || (values.cancellationPercentage !== '' && values.cancellationDescription !== '');
  };

  const isNotImageEmpty = () => {
    return values.images && values.images.length > 0;
  };

  const isNotAvailablityEmpty = () => {
    return values.availability && values.availability.length > 0;
  };

  const isFormDetailCompleted = () => {
    return [
      isNotDetailEmpty(),
      isNotMapEmpty(),
      isNotFeatureEmpty(),
      isNotPolicyEmpty(),
      isNotImageEmpty(),
      isNotAvailablityEmpty()
    ];
  };

  const uploadData = async (isDraft) => {
    setLoadingSetUp({
      show: true,
      status: 'warning',
      message: 'Preparing Vehicle data'
    });

    const vehicleFeatures = [];
    features.map((feature) => {
      if (feature.checked) vehicleFeatures.push({ name: feature.name });
    });

    const loc = {
      ...values.location,
      address: map.address,
      city: map.city,
      area: map.area,
      state: map.area,
      placeId: map.placeId,
      lat: map.markerPosition.lat,
      lng: map.markerPosition.lng
    };

    setLoadingSetUp({
      show: true,
      status: 'warning',
      message: 'Uploading Vehicle Images'
    });

    const vehicleAvailability = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

    let upLoadedImages = [];

    images?.map((image) => {
      upLoadedImages.push({ id: image?.id, url: image?.url });
    });

    await UploadFileImages(files).then((uploadedFiles) => {
      uploadedFiles.map((i) => upLoadedImages.push(i));
    });

    setLoadingSetUp({
      show: true,
      status: 'warning',
      message: 'Uploading Vehicle data'
    });

    const newValues = {
      ...values,
      isDraft: isDraft,
      images: upLoadedImages,
      features: vehicleFeatures,
      availability: vehicleAvailability,
      location: loc,
      pickupTime: pickupTime,
      dropoffTime: dropoffTime
    };

    await setValues({ ...newValues });

    await CreateVehicle({ variables: { vehicle: newValues } });

    setLoadingSetUp({
      show: true,
      status: 'success',
      message: 'Fetching updated vehicle data'
    });

    await getVehicles();
  };

  const saveDraft = async () => {
    try {
      await uploadData(true);

      setLoadingSetUp({
        show: false,
        status: 'warning',
        message: 'Uploaded Vehicle Data'
      });

      enqueueSnackbar('Draft saved successfully', {
        variant: 'success'
      });
      if (isMountedRef.current) {
        setSubmitting(false);
      }
      onClose();
    } catch (error) {
      console.error(error);
      setLoadingSetUp({
        show: false,
        status: 'warning',
        message: 'Uploaded Vehicle Data'
      });
      if (isMountedRef.current) {
        setErrors({ afterSubmit: error.message });
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextDetails = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(async () => {
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach((day) => {
      switch (day) {
        case 'monday':
          if (localStorage.getItem(`create-vehicle-available-${day}`) !== null) {
            setMonday(JSON.parse(localStorage.getItem(`create-vehicle-available-${day}`)));
          } else {
            setMonday({
              timeType: 'All Day',
              dayStart: moment().day('Monday'),
              dayEnd: moment().day('Monday'),
              label: 'Monday'
            });
          }
          break;
        case 'tuesday':
          if (localStorage.getItem(`create-vehicle-available-${day}`) !== null) {
            setTuesday(JSON.parse(localStorage.getItem(`create-vehicle-available-${day}`)));
          } else {
            setTuesday({
              timeType: 'All Day',
              dayStart: moment().day('Tuesday'),
              dayEnd: moment().day('Tuesday'),
              label: 'Tuesday'
            });
          }
          break;
        case 'wednesday':
          if (localStorage.getItem(`create-vehicle-available-${day}`) !== null) {
            setWednesday(JSON.parse(localStorage.getItem(`create-vehicle-available-${day}`)));
          } else {
            setWednesday({
              timeType: 'All Day',
              dayStart: moment().day('Wednesday'),
              dayEnd: moment().day('Wednesday'),
              label: 'Wednesday'
            });
          }
          break;
        case 'thursday':
          if (localStorage.getItem(`create-vehicle-available-${day}`) !== null) {
            setThursday(JSON.parse(localStorage.getItem(`create-vehicle-available-${day}`)));
          } else {
            setThursday({
              timeType: 'All Day',
              dayStart: moment().day('Thursday'),
              dayEnd: moment().day('Thursday'),
              label: 'Thursday'
            });
          }
          break;
        case 'friday':
          if (localStorage.getItem(`create-vehicle-available-${day}`) !== null) {
            setFriday(JSON.parse(localStorage.getItem(`create-vehicle-available-${day}`)));
          } else {
            setFriday({
              timeType: 'All Day',
              dayStart: moment().day('Friday'),
              dayEnd: moment().day('Friday'),
              label: 'Friday'
            });
          }
          break;
        case 'saturday':
          if (localStorage.getItem(`create-vehicle-available-${day}`) !== null) {
            setSaturday(JSON.parse(localStorage.getItem(`create-vehicle-available-${day}`)));
          } else {
            setSaturday({
              timeType: 'All Day',
              dayStart: moment().day('Saturday'),
              dayEnd: moment().day('Saturday'),
              label: 'Saturday'
            });
          }
          break;
        case 'sunday':
          if (localStorage.getItem(`create-vehicle-available-${day}`) !== null) {
            setSunday(JSON.parse(localStorage.getItem(`create-vehicle-available-${day}`)));
          } else {
            setSunday({
              timeType: 'All Day',
              dayStart: moment().day('Sunday'),
              dayEnd: moment().day('Sunday'),
              label: 'Sunday'
            });
          }
          break;
      }
    });
  }, []);

  useEffect(async () => {
    let fs =
      values.vehicleType === 'CAMPERVAN'
        ? [
            { checked: false, name: 'Toilet' },
            { checked: false, name: 'Shower' },
            { checked: false, name: 'Kitchen Unit' },
            { checked: false, name: 'Hot Water' },
            { checked: false, name: 'Heating' },
            { checked: false, name: 'Suitable for tall people' },
            { checked: false, name: 'Bicycle Rack' },
            { checked: false, name: 'A/C in cabin' },
            { checked: false, name: 'A/C in motorhome compartment' },
            { checked: false, name: 'Bluetooth' },
            { checked: false, name: 'Automatic gearbox' },
            { checked: false, name: 'Autopilot' },
            { checked: false, name: 'USB input' },
            { checked: false, name: 'GPS' }
          ]
        : [
            { checked: false, name: 'Bluetooth' },
            { checked: false, name: 'Automatic gearbox' },
            { checked: false, name: 'Autopilot' },
            { checked: false, name: 'USB input' },
            { checked: false, name: 'Electric' },
            { checked: false, name: 'GPS' }
          ];
    if (vehicle?.features) {
      vehicle?.features.map((f) => (fs = handleOnFeature(f?.name, fs)));
    }
    setFeatures(fs);
  }, []);

  const handleOnFeature = (name, features) => {
    const newFeatures = [];
    features.map((item) => {
      let f = item;
      if (item.name === name) {
        f = {
          ...item,
          checked: !item.checked
        };
      }
      newFeatures.push(f);
    });
    return newFeatures;
  };

  const onVehicleTypeChange = (type) => {
    setValues({ ...values, vehicleType: type, reg: '' });
    setFeatures(
      type === 'CAMPERVAN'
        ? [
            { checked: false, name: 'Toilet' },
            { checked: false, name: 'Shower' },
            { checked: false, name: 'Kitchen Unit' },
            { checked: false, name: 'Hot Water' },
            { checked: false, name: 'Heating' },
            { checked: false, name: 'Suitable for tall people' },
            { checked: false, name: 'Bicycle Rack' },
            { checked: false, name: 'A/C in cabin' },
            { checked: false, name: 'A/C in motorhome compartment' },
            { checked: false, name: 'Bluetooth' },
            { checked: false, name: 'Automatic gearbox' },
            { checked: false, name: 'Autopilot' },
            { checked: false, name: 'USB input' },
            { checked: false, name: 'GPS' }
          ]
        : [
            { checked: false, name: 'Bluetooth' },
            { checked: false, name: 'Automatic gearbox' },
            { checked: false, name: 'Autopilot' },
            { checked: false, name: 'USB input' },
            { checked: false, name: 'Electric' },
            { checked: false, name: 'GPS' }
          ]
    );
  };

  const getGearBox = (value) => {
    if (value?.transmission === 'automatic') return 'AUTOMATIC';
    if (value?.transmission === 'manual') return 'MANUAL';
    return '';
  };

  const getVehicleMakes = () => {
    const makes = [];
    vehicleData().map((v) => {
      let status = false;
      makes.map((m) => {
        if (m === v.make) {
          status = true;
          return;
        }
      });
      if (!status) makes.push(v.make);
    });
    return makes;
  };

  const vehicleDetails = (
    <>
      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel>Select Vehicle Type</InputLabel>
        <Select
          id={'vehicleType'}
          value={values.vehicleType}
          label="Select Vehicle Type"
          onChange={(e) => {
            setValues({ ...values, vehicleType: e.target.value, reg: '' });
            setFeatures(
              e.target.value === 'CAMPERVAN'
                ? [
                    { checked: false, name: 'Toilet' },
                    { checked: false, name: 'Shower' },
                    { checked: false, name: 'Kitchen Unit' },
                    { checked: false, name: 'Hot Water' },
                    { checked: false, name: 'Heating' },
                    { checked: false, name: 'Suitable for tall people' },
                    { checked: false, name: 'Bicycle Rack' },
                    { checked: false, name: 'A/C in cabin' },
                    { checked: false, name: 'A/C in motorhome compartment' },
                    { checked: false, name: 'Bluetooth' },
                    { checked: false, name: 'Automatic gearbox' },
                    { checked: false, name: 'Autopilot' },
                    { checked: false, name: 'USB input' },
                    { checked: false, name: 'GPS' }
                  ]
                : [
                    { checked: false, name: 'Bluetooth' },
                    { checked: false, name: 'Automatic gearbox' },
                    { checked: false, name: 'Autopilot' },
                    { checked: false, name: 'USB input' },
                    { checked: false, name: 'Electric' },
                    { checked: false, name: 'GPS' }
                  ]
            );
          }}
        >
          <MenuItem value={'CAR'}>
            <i className="fas fa-car-side"></i>&nbsp;&nbsp;Car
          </MenuItem>
          <Divider style={{ height: 0 }} />
          <MenuItem value={'MOTORCYCLE'}>
            <i className="fas fa-motorcycle"></i>&nbsp;&nbsp;Motorbike
          </MenuItem>
          <Divider style={{ height: 0 }} />
          <MenuItem value={'BICYCLE'}>
            <i className="fas fa-bicycle"></i>&nbsp;&nbsp;Bicycle
          </MenuItem>
          <Divider style={{ height: 0 }} />
          <MenuItem value={'CAMPERVAN'}>
            <i className="fas fa-rv"></i>&nbsp;&nbsp;Campervan
          </MenuItem>
        </Select>
      </FormControl>

      {(values.vehicleType === 'CAR' || values.vehicleType === 'CAMPERVAN' || values.vehicleType === 'MOTORCYCLE') && (
        <TextField
          fullWidth
          autoComplete="reg"
          type="text"
          label="Registration/License Plate"
          {...getFieldProps('reg')}
          error={Boolean(touched.reg && errors.reg)}
          helperText={touched.reg && errors.reg}
        />
      )}

      {values.vehicleType === 'MOTORCYCLE' && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Bike type</InputLabel>
            <Select
              id={'bikeType'}
              value={values.bikeType}
              label="Bike type"
              onChange={(e) => {
                setValues({ ...values, bikeType: e.target.value });
              }}
            >
              <MenuItem value={'Adventure'}>Adventure</MenuItem>
              <MenuItem value={'Classic'}>Classic</MenuItem>
              <MenuItem value={'Commuter'}>Commuter</MenuItem>
              <MenuItem value={'Custom Cruiser'}>Custom Cruiser</MenuItem>
              <MenuItem value={'E-Bike'}>E-Bike</MenuItem>
              <MenuItem value={'Enduro'}>Enduro</MenuItem>
              <MenuItem value={'Minibike'}>Minibike</MenuItem>
              <MenuItem value={'Moped'}>Moped</MenuItem>
              <MenuItem value={'Motocrosser'}>Motocrosser</MenuItem>
              <MenuItem value={'Naked'}>Naked</MenuItem>
              <MenuItem value={'Quad/ATV'}>Quad/ATV</MenuItem>
              <MenuItem value={'Roadster/Retro'}>Roadster/Retro</MenuItem>
              <MenuItem value={'Sidecar'}>Sidecar</MenuItem>
              <MenuItem value={'Special'}>Special</MenuItem>
              <MenuItem value={'Sports Tourer'}>Sports Tourer</MenuItem>
              <MenuItem value={'Super Moto'}>Super Moto</MenuItem>
              <MenuItem value={'Super Sports'}>Super Sports</MenuItem>
              <MenuItem value={'Scooter'}>Scooter</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Select License Type</InputLabel>
            <Select
              id={'licenseType'}
              value={values.licenseType}
              label="Select License Type"
              onChange={(e) => {
                setValues({ ...values, licenseType: e.target.value });
              }}
            >
              <MenuItem value={'A'}>A</MenuItem>
              <Divider style={{ height: 0 }} />
              <MenuItem value={'A1'}>A1</MenuItem>
              <Divider style={{ height: 0 }} />
              <MenuItem value={'A2'}>A2</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {values.vehicleType === 'BICYCLE' ? (
          <FormControl fullWidth>
            <InputLabel>Bike Type</InputLabel>
            <Select
              id={'bikeType'}
              value={values.bikeType}
              label="Bike type"
              onChange={(e) => {
                setValues({ ...values, bikeType: e.target.value });
              }}
            >
              <MenuItem value={'Mountain Bikes'}>Mountain Bikes</MenuItem>
              <MenuItem value={'Hybrid Bikes'}>Hybrid Bikes</MenuItem>
              <MenuItem value={'Folding Bikes'}>Folding Bikes</MenuItem>
              <MenuItem value={'Electric Hybrid Bikes'}>Electric Hybrid Bikes</MenuItem>
              <MenuItem value={'Road Bikes'}>Road Bikes</MenuItem>
              <MenuItem value={'Adventure Bikes'}>Adventure Bikes</MenuItem>
              <MenuItem value={'Fixie Bikes'}>Fixie Bikes</MenuItem>
              <MenuItem value={'Electric Folding Bikes'}>Electric Folding Bikes</MenuItem>
              <MenuItem value={'Electric Mountain Bikes'}>Electric Mountain Bikes</MenuItem>
              <MenuItem value={'Electric Adventure Bikes'}>Electric Adventure Bikes</MenuItem>
              <MenuItem value={'BMX Bikes'}>BMX Bikes</MenuItem>
              <MenuItem value={'Kids Bikes'}>Kids Bikes</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <>
            {values.vehicleType === 'CAR' ? (
              <>
                <FormControl fullWidth>
                  <InputLabel>Make</InputLabel>
                  <Select
                    id={'make'}
                    value={values.make}
                    label="Make"
                    onChange={(e) => setValues({ ...values, make: e.target.value })}
                  >
                    {getVehicleMakes().map((m) => (
                      <MenuItem value={m}>{m}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Model</InputLabel>
                  <Select
                    id={'model'}
                    value={values.model}
                    label="Model"
                    onChange={(e) => setValues({ ...values, model: e.target.value })}
                  >
                    {vehicleData()
                      ?.filter((item) => item.make === values.make)
                      .map((m) => (
                        <MenuItem value={m.model}>{m.model}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Make"
                  {...getFieldProps('make')}
                  error={Boolean(touched.make && errors.make)}
                  helperText={touched.make && errors.make}
                />
                <TextField
                  fullWidth
                  label="Model"
                  {...getFieldProps('model')}
                  error={Boolean(touched.model && errors.model)}
                  helperText={touched.model && errors.model}
                />
              </>
            )}
          </>
        )}
      </Stack>

      {(values.vehicleType === 'CAR' || values.vehicleType === 'CAMPERVAN') && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Body Type</InputLabel>
            <Select
              id={'bodyType'}
              value={values.bodyType}
              label="Body type"
              onChange={(e) => {
                setValues({ ...values, bodyType: e.target.value });
              }}
            >
              {[
                'Sedan',
                'Coupe',
                'Convertible',
                'Hatchback',
                'Wagon',
                'SUV',
                'Convertible SUV',
                'Pickup Truck',
                'Passenger Minivan',
                'Cargo Minivan',
                'Passenger Van',
                'Cargo Van'
              ].map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Gear Box</InputLabel>
            <Select
              id={'gearBox'}
              value={values.gearBox}
              label="Gear Box"
              onChange={(e) => {
                setValues({ ...values, gearBox: e.target.value });
              }}
            >
              <MenuItem value={'AUTOMATIC'}>Automatic</MenuItem>
              <MenuItem value={'MANUAL'}>Manual</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

      {!(values.vehicleType === 'BICYCLE') && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Fuel Type</InputLabel>
            <Select
              id={'fuelType'}
              value={values.fuelType}
              label="Fuel Type"
              onChange={(e) => {
                setValues({ ...values, fuelType: e.target.value });
              }}
            >
              <MenuItem value={'Petrol'}>Petrol</MenuItem>
              <MenuItem value={'Diesel'}>Diesel</MenuItem>
              <MenuItem value={'Electric'}>Electric</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              id={'year'}
              value={values.year}
              label="Year"
              onChange={(e) => {
                setValues({ ...values, year: e.target.value });
              }}
            >
              {[
                1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
                2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022
              ].map((y) => (
                <MenuItem value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Daily Rates</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Daily Rates"
            type="number"
            {...getFieldProps('dailyRates')}
            error={Boolean(touched.dailyRates && errors.dailyRates)}
            helperText={touched.dailyRates && errors.dailyRates}
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Hourly Rates (optional)</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Hourly Rates (optional)"
            type="number"
            {...getFieldProps('hourlyRates')}
            error={Boolean(touched.hourlyRates && errors.hourlyRates)}
            helperText={touched.hourlyRates && errors.hourlyRates}
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
          />
        </FormControl>
      </Stack>

      {values.vehicleType === 'BICYCLE' ? (
        <TextField
          id="outlined-multiline-static"
          label="Description"
          fullWidth
          multiline
          rows={3}
          {...getFieldProps('description')}
          error={Boolean(touched.description && errors.description)}
          helperText={touched.description && errors.description}
        />
      ) : (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Mileage included (optional)</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Distance included (optional)"
              type="number"
              {...getFieldProps('mileage')}
              error={Boolean(touched.mileage && errors.mileage)}
              helperText={touched.mileage && errors.mileage}
              endAdornment={<InputAdornment position="end">(miles)</InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Mileage Rate (optional)</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Distance included (optional)"
              type="number"
              {...getFieldProps('mileageRates')}
              error={Boolean(touched.mileageRates && errors.mileageRates)}
              helperText={touched.mileageRates && errors.mileageRates}
              endAdornment={<InputAdornment position="end">/mile</InputAdornment>}
              startAdornment={<InputAdornment position="start">£</InputAdornment>}
            />
          </FormControl>
        </Stack>
      )}
    </>
  );

  const vehicleDetailsAction = (
    <>
      <Button disabled sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        variant="contained"
        // disabled={!vehicle.status}
        onClick={handleNextDetails}
        sx={{ mr: 1 }}
      >
        Next
      </Button>
    </>
  );

  const handleNextLocation = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const setUpLocation = (
    <>
      <LocationBox map={map} setMap={setMap} location={vehicle?.location || {}} />
      <div className="">
        <div className="dflex-inner">
          <span className="rmargin">Pickup Time</span>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              onChange={(e) => {
                console.log('Pickup Time', e);
                setPickupTime(e);
              }}
              ampmInClock={true}
              value={pickupTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="dflex-inner">
          <span className="rmargin">Dropoff Time</span>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              onChange={(e) => {
                setDropoffTime(e);
              }}
              ampmInClock={true}
              value={dropoffTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );

  const LocationSetUpAction = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleNextLocation} sx={{ mr: 1 }}>
        Next
      </Button>
    </>
  );

  const handleNextFeatures = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const setUpFeatures = (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Description"
        fullWidth
        multiline
        rows={3}
        {...getFieldProps('description')}
        error={Boolean(touched.description && errors.description)}
        helperText={touched.description && errors.description}
      />
      <Typography component="snap" variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Select Vehicle Feature
      </Typography>
      <FormGroup>
        <Grid container justifyContent="center" spacing={2}>
          <AddFeatures features={features} setFeatures={setFeatures} vehicleType={values.vehicleType} />
        </Grid>
      </FormGroup>
    </>
  );

  const accountFeatures = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleNextFeatures} sx={{ mr: 1 }}>
        Next
      </Button>
    </>
  );

  const handleNextPolicy = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const [isFixedPrice, setIsFixedPrice] = React.useState(false);

  const setUpPolicy = (
    <>
      <Stack alignItems="center" direction="row" spacing={0.5}>
        <Checkbox
          name="freeCancellation"
          checked={values.freeCancellation}
          {...getFieldProps('freeCancellation')}
          error={Boolean(touched.freeCancellation && errors.freeCancellation)}
          helperText={touched.freeCancellation && errors.freeCancellation}
        />
        <Typography component="snap" variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Accept Free cancellation up to 24hrs before the trip start
        </Typography>
      </Stack>
      {values.freeCancellation && (
        <Typography component="snap" variant="body1" fontWeight="light" sx={{ marginTop: 16, color: 'text.secondary' }}>
          * When booking a vehicle on the Vumah platform we allow free cancellations up to 24hrs before the trip start
          by default to allow flexibility for our guests.
          {/*<br />*/}
          {/*<br />*/}
          {/*If the guest chooses to cancel for any reason within the 24 hours period of the trip start, the guest will be*/}
          {/*subject to a late cancellation fee and will be refunded the remainder that is on hold.*/}
        </Typography>
      )}
      {!values.freeCancellation && (
        <>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Switch
              name="freeCancellation"
              checked={values.isFixedPrice}
              {...getFieldProps('isFixedPrice')}
              error={Boolean(touched.isFixedPrice && errors.isFixedPrice)}
              helperText={touched.isFixedPrice && errors.isFixedPrice}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography component="snap" variant="subtitle1" fontWeight="light" sx={{ color: 'text.secondary' }}>
              {isFixedPrice
                ? 'Set free cancellation to percentage(%) charge'
                : 'Set free cancellation to fixed price(£) charge'}
            </Typography>
          </Stack>
          {values?.isFixedPrice ? (
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Cancellation Fixed price (£)</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Cancellation Fixed price (£)"
                {...getFieldProps('cancellationPercentage')}
                error={Boolean(touched.cancellationPercentage && errors.cancellationPercentage)}
                helperText={touched.cancellationPercentage && errors.cancellationPercentage}
                endAdornment={<InputAdornment position="end">£</InputAdornment>}
              />
            </FormControl>
          ) : (
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Cancellation Percentage (%)</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Cancellation Percentage (%)"
                {...getFieldProps('cancellationPercentage')}
                error={Boolean(touched.cancellationPercentage && errors.cancellationPercentage)}
                helperText={touched.cancellationPercentage && errors.cancellationPercentage}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </FormControl>
          )}
        </>
      )}
      <Stack alignItems="center" direction="row" spacing={0.5}>
        <Checkbox
          name="freeLateCancellation"
          checked={values.freeLateCancellation}
          {...getFieldProps('freeLateCancellation')}
          error={Boolean(touched.freeLateCancellation && errors.freeLateCancellation)}
          helperText={touched.freeLateCancellation && errors.freeLateCancellation}
        />
        <Typography component="snap" variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Accept Free cancellation with in 24hrs to the trip start
        </Typography>
      </Stack>
      {values.freeLateCancellation && (
        <Typography component="snap" variant="body1" fontWeight="light" sx={{ marginTop: 16, color: 'text.secondary' }}>
          * When booking a vehicle on the Vumah platform we allow free cancellations up to 24hrs before the trip start
          by default to allow flexibility for our guests.
        </Typography>
      )}
      {!values.freeLateCancellation && (
        <>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Switch
              name="isLateFixedPrice"
              checked={values.isLateFixedPrice}
              {...getFieldProps('isLateFixedPrice')}
              error={Boolean(touched.isLateFixedPrice && errors.isLateFixedPrice)}
              helperText={touched.isLateFixedPrice && errors.isLateFixedPrice}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography component="snap" variant="subtitle1" fontWeight="light" sx={{ color: 'text.secondary' }}>
              {isFixedPrice
                ? 'Set free cancellation to percentage(%) charge'
                : 'Set free cancellation to fixed price(£) charge'}
            </Typography>
          </Stack>
          {values?.isLateFixedPrice ? (
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Cancellation Fixed price (£)</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Cancellation Fixed price (£)"
                {...getFieldProps('lateCancellationPercentage')}
                error={Boolean(touched.lateCancellationPercentage && errors.lateCancellationPercentage)}
                helperText={touched.lateCancellationPercentage && errors.lateCancellationPercentage}
                endAdornment={<InputAdornment position="end">£</InputAdornment>}
              />
            </FormControl>
          ) : (
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Cancellation Percentage (%)</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="Cancellation Percentage (%)"
                {...getFieldProps('lateCancellationPercentage')}
                error={Boolean(touched.lateCancellationPercentage && errors.lateCancellationPercentage)}
                helperText={touched.lateCancellationPercentage && errors.lateCancellationPercentage}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
              />
            </FormControl>
          )}
        </>
      )}
      {(!values.freeCancellation || !values.freeLateCancellation) && (
        <TextField
          id="outlined-multiline-static"
          label="Policy Description"
          fullWidth
          multiline
          rows={5}
          {...getFieldProps('cancellationDescription')}
          error={Boolean(touched.cancellationDescription && errors.cancellationDescription)}
          helperText={touched.cancellationDescription && errors.cancellationDescription}
        />
      )}
    </>
  );

  const accountPolicy = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleNextPolicy} sx={{ mr: 1 }}>
        Next
      </Button>
    </>
  );

  const handleNextUpLoadImages = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const setUpUpLoadImages = (
    <>
      <Stack spacing={2}>
        {values.vehicleType === 'MOTORCYCLE' && (
          <TextField
            id="outlined-multiline-static"
            label="Description"
            fullWidth
            multiline
            rows={3}
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
        )}
        <UploadImages files={files} setFiles={setFiles} />
      </Stack>
    </>
  );

  const accountUpLoadImages = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={handleNextUpLoadImages} sx={{ mr: 1 }}>
        Next
      </Button>
    </>
  );

  const setUpAvailability = (
    <>
      <Availability
        monday={monday}
        tuesday={tuesday}
        wednesday={wednesday}
        thursday={thursday}
        friday={friday}
        saturday={saturday}
        sunday={sunday}
        setMonday={setMonday}
        setTuesday={setTuesday}
        setWednesday={setWednesday}
        setThursday={setThursday}
        setFriday={setFriday}
        setSaturday={setSaturday}
        setSunday={setSunday}
      />
    </>
  );

  const accountAvailability = (
    <>
      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
        Back
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <LoadingButton disabled={!isEmptyFormData()} type="submit" variant="contained" loading={isSubmitting}>
        List Vehicle
      </LoadingButton>
    </>
  );

  const AddVehicle = (
    <>
      <Stack direction="row" sx={{ my: 1 }} spacing={2}>
        <Box sx={{ maxWidth: '250px', border: '4px solid', borderRadius: '7px' }}>
          <Grid container justifyContent="flex-start" sx={{ bgcolor: '#fbdb00' }}>
            <Grid
              item
              xs={2}
              container
              justifyContent="flex-start"
              alignItems="center"
              sx={{ height: '50px', bgcolor: '#0f4290' }}
            >
              <Grid item xs={12} sx={{ p: 0.5 }}>
                <img src={img} alt="gb" height="10px" />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="flex-start" sx={{ height: '40px', p: 0.5 }}>
                <Typography sx={{ color: 'white' }}>GB</Typography>
              </Grid>
            </Grid>
            <Grid item xs={10} container justifyContent="center" alignItems="center">
              <Typography component="snap" variant="h4">
                {values.reg}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ maxWidth: '250px', display: 'flex' }}>
          {/*<Button*/}
          {/*  variant="outlined"*/}
          {/*  startIcon={getVehicleIcon(values.vehicleType).icon}*/}
          {/*  onClick={() => setVehicle({ status: false, data: {} })}*/}
          {/*>*/}
          {/*  {getVehicleIcon(values.vehicleType).label} (Change)*/}
          {/*</Button>*/}
        </Box>
      </Stack>
      <Card>
        <CardContent style={{ padding: 0 }}>
          <Box sx={{ width: '100%' }}>
            <CarouselVehicles items={files} images={images} />
          </Box>
        </CardContent>
      </Card>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ pt: 2 }}>
        <TextField
          fullWidth
          label="Make"
          {...getFieldProps('make')}
          error={Boolean(touched.make && errors.make)}
          helperText={touched.make && errors.make}
        />

        <TextField
          fullWidth
          label="Model"
          {...getFieldProps('model')}
          error={Boolean(touched.model && errors.model)}
          helperText={touched.model && errors.model}
        />
      </Stack>
      <Stack sx={{ pt: 3, pb: 1 }}>
        <Button fullWidth size="large" variant="contained" onClick={onClose} sx={{ mr: 1 }}>
          Close
        </Button>
      </Stack>
    </>
  );

  function getStepContent(step) {
    if (values.vehicleType === 'BICYCLE' || values.vehicleType === 'MOTORCYCLE')
      switch (step) {
        case 0:
          return vehicleDetails;
        case 1:
          return setUpLocation;
        case 2:
          return setUpPolicy;
        case 3:
          return setUpUpLoadImages;
        case 4:
          return setUpAvailability;
        default:
          return AddVehicle;
      }
    else
      switch (step) {
        case 0:
          return vehicleDetails;
        case 1:
          return setUpLocation;
        case 2:
          return setUpFeatures;
        case 3:
          return setUpPolicy;
        case 4:
          return setUpUpLoadImages;
        case 5:
          return setUpAvailability;
        default:
          return AddVehicle;
      }
  }

  function getStepActions(step) {
    if (values.vehicleType === 'BICYCLE' || values.vehicleType === 'MOTORCYCLE')
      switch (step) {
        case 0:
          return vehicleDetailsAction;
        case 1:
          return LocationSetUpAction;
        case 2:
          return accountPolicy;
        case 3:
          return accountUpLoadImages;
        case 4:
          return accountAvailability;
        default:
          return AddVehicle;
      }
    else
      switch (step) {
        case 0:
          return vehicleDetailsAction;
        case 1:
          return LocationSetUpAction;
        case 2:
          return accountFeatures;
        case 3:
          return accountPolicy;
        case 4:
          return accountUpLoadImages;
        case 5:
          return accountAvailability;
        default:
          return AddVehicle;
      }
  }

  function getSteps() {
    if (values.vehicleType === 'BICYCLE' || values.vehicleType === 'MOTORCYCLE') return STEPS_BICYCLE;
    return STEPS;
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
            <Stack spacing={1} sx={{ flexGrow: 1, width: '550px' }}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              {loadingSetUp.show && (
                <Alert severity={loadingSetUp.status}>
                  <CircularProgress size="small" />
                  {loadingSetUp.message}
                </Alert>
              )}

              {activeStep === getSteps().length ? (
                <>{AddVehicle}</>
              ) : (
                <>
                  <CustomizedSteppers
                    steps={getSteps()}
                    activeStep={activeStep}
                    type="addvehicle"
                    formComplete={isFormDetailCompleted()}
                  />
                  <Scrollbar sx={{ p: 1, height: '65vh', maxHeight: '650px' }}>
                    <Paper
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                        minHeight: 300
                      }}
                    >
                      <Stack spacing={3} sx={{ width: '100%' }}>
                        {getStepContent(activeStep)}
                        {isEdit ? (
                          <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                          >
                            Save Changes
                          </LoadingButton>
                        ) : (
                          <LoadingButton
                            fullWidth
                            size="large"
                            variant="contained"
                            loading={isSubmitting}
                            onClick={() => saveDraft(true)}
                          >
                            Save Draft
                          </LoadingButton>
                        )}
                      </Stack>
                    </Paper>
                  </Scrollbar>

                  <Box sx={{ textAlign: 'right', display: 'flex' }}>{getStepActions(activeStep)}</Box>
                </>
              )}
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
}
