import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '../../../components/hook-form';
import { useForm } from 'react-hook-form';
import useDroidDialog from '../../../hooks/useDroidDialog';
import {
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
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { REGISTER_VEHICLE } from '../../../graphql/Queries';
import { Box, Button, Paper, Stack } from '@mui/material';
import CustomizedSteppers from '../Charts/CustomizedStepper';
import Scrollbar from '../../../components/Scrollbar';
import VehicleDetails from './VehicleDetails';
import { yupResolver } from '@hookform/resolvers/yup';

// ----------------------------------------------------------------------

const STEPS = ['Details', 'Location', 'Feature', 'Policy', 'Images', 'Availability'];
const STEPS_BICYCLE = ['Details', 'Location', 'Policy', 'Images', 'Availability'];

// ----------------------------------------------------------------------

export default function Index({ vehicle }) {
  const [CreateVehicle] = useMutation(REGISTER_VEHICLE);

  const { onClose, onSaveDraft } = useDroidDialog();

  const [activeStep, setActiveStep] = useState(0);

  const [files, setFiles] = useState(vehicle?.images || []);

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

  useEffect(async () => {
    onSaveDraft(
      <Button variant="text" onClick={() => saveDraft(getValues())}>
        Save Draft
      </Button>
    );

    let fs =
      getValues()?.vehicleType === 'CAMPERVAN'
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

  const RegisterSchema = Yup.object().shape({
    make: Yup.string().required('make required')
  });

  //MA68HXM

  const NewUserSchema = Yup.object().shape({
    make: Yup.string().required('Name is required')
  });

  const defaultValues = useMemo(
    () => ({
      id: vehicle?.id || 0,
      vehicleType: vehicle?.vehicleType || 'CAR',
      reg: vehicle?.reg || '',
      make: vehicle?.make || '',
      model: vehicle?.model || '',
      fuelType: vehicle?.fuelType || '',
      year: vehicle?.year || '',
      mileage: vehicle?.mileage || '',
      mileageRates: vehicle?.mileageRates || 0,
      hourlyRates: vehicle?.hourlyRates || 0,
      dailyRates: vehicle?.dailyRates || 0,
      description: vehicle?.description || '',
      freeCancellation: vehicle?.freeCancellation || true,
      cancellationPercentage: vehicle?.cancellationPercentage || '',
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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });

  const {
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data) => {
    try {
      await createUser({
        variables: {
          input: data
        }
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const saveDraft = async () => {
    console.log('Values: ', getValues());
    let draft = {};
    setLoadingSetUp({
      show: true,
      status: 'warning',
      message: 'Arranging Vehicle Data'
    });

    const vehicleFeatures = [];
    features.map((feature) => {
      if (feature.checked) vehicleFeatures.push({ name: feature.name });
    });

    let loc = null;

    if (map) {
      loc = {
        ...getValues().location,
        address: map.address,
        city: map.city,
        area: map.area,
        state: map.area,
        placeId: map.placeId,
        lat: map.markerPosition.lat,
        lng: map.markerPosition.lng
      };
    }

    setLoadingSetUp({
      show: true,
      status: 'warning',
      message: 'Uploading Vehicle Images'
    });

    const vehicleAvailability = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

    // await UploadFileImages(files).then((uploadedFiles) => {
    //   draft = {
    //     ...getValues(),
    //     isDraft: true,
    //     images: uploadedFiles,
    //     features: vehicleFeatures,
    //     availability: vehicleAvailability,
    //     location: loc
    //   };
    //
    //   console.log('Save Draft: ', draft);
    //
    //   CreateVehicle({ variables: { vehicle: draft } })
    //     .then(() => {
    //       setLoadingSetUp({
    //         show: false,
    //         status: 'success',
    //         message: 'Message'
    //       });
    //       enqueueSnackbar('Vehicle draft saved successfully', {
    //         variant: 'success'
    //       });
    //       onClose();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       enqueueSnackbar('Vehicle draft failed to be saved', {
    //         variant: 'error'
    //       });
    //     });
    // });

    setLoadingSetUp({
      show: false,
      status: 'warning',
      message: 'Uploading Vehicle Images'
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextDetails = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function getSteps(step) {
    if (getValues()?.vehicleType === 'BICYCLE' || getValues()?.vehicleType === 'MOTORCYCLE') return STEPS_BICYCLE;
    return STEPS;
  }

  function getStepContent(step) {
    if (getValues()?.vehicleType === 'BICYCLE' || getValues()?.vehicleType === 'MOTORCYCLE')
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
    if (getValues()?.vehicleType === 'BICYCLE' || getValues()?.vehicleType === 'MOTORCYCLE')
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack spacing={1} sx={{ flexGrow: 1, width: '550px' }}>
          <CustomizedSteppers steps={getSteps()} activeStep={activeStep} type="notaddvehicle" />
          <Scrollbar sx={{ p: 1, height: '65vh', maxHeight: '600px' }}>
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
                <VehicleDetails values={getValues()} setValues={setValue} setFeatures={setFeatures} />
              </Stack>
            </Paper>
          </Scrollbar>
        </Stack>
      </Box>
    </FormProvider>
  );
}
