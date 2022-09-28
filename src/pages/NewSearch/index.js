import { useQuery } from '@apollo/client';
import { Box, Card, Checkbox, Container, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleApiWrapper } from 'google-maps-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplitPane from 'react-split-pane';
import LoadingScreen from '../../components/LoadingScreen';
import Scrollbar from '../../components/Scrollbar';
import { GET_VEHICLES_IN_RANGE } from '../../graphql/Queries';
import GoogleMap from './SearchMap';
import TopBar from './TopBar';
import VehicleList from './VehicleList';

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 70,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0.5)
}));

function Index(props) {
  const dispatch = useDispatch();
  const selectedVehicleOnMap = useSelector((state) => state.SelectedVehicleOnMap);
  const dateRange = useSelector((state) => state.VehicleBookingTime);
  const center = useSelector((state) => state.MapCenter);

  const [scroller, setScroller] = React.useState(false);
  const [panelWidth, setPanelWidth] = useState(window.innerWidth > 800 ? 800 : window.innerWidth);

  const { loading, data, refetch } = useQuery(GET_VEHICLES_IN_RANGE, {
    variables: {
      lng: center.coordinates[1],
      lat: center.coordinates[0],
      radius: 100000 // 100KM range
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sortType, setSortType] = useState(0);
  const [sortedVehicles, setSortedVehicles] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (data) {
      let filteredVehicles = data?.VehiclesWithInRange.filter(
        (v) => v?.status && v?.vehicleType === list[selectedIndex].name
      );
      switch (sortType) {
        case 0:
          filteredVehicles.sort((v1, v2) => {
            return v1.dailyRates - v2.dailyRates;
          });
          break;
        case 1:
          filteredVehicles.sort((v1, v2) => {
            return v2.dailyRates - v1.dailyRates;
          });
          break;
        case 2:
          if (userLocation) {
            filteredVehicles.sort((v1, v2) => {
              const v1toUser = distance(userLocation.lat, userLocation.lng, v1.location.lat, v1.location.lng);
              const v2toUser = distance(userLocation.lat, userLocation.lng, v2.location.lat, v2.location.lng);
              return v1toUser - v2toUser;
            });
          }
          break;
        case 3:
          filteredVehicles.sort((v1, v2) => {
            return v1.reveiws - v2.reveiws;
          });
          break;

        default:
          break;
      }
      setSortedVehicles(filteredVehicles);
    }
  }, [sortType, selectedIndex, data]);
  const handleScroller = () => {
    setScroller(!scroller);
  };

  const handleOnMapScroll = (location) => {
    if (scroller) {
      const km = (42000 / Math.pow(2, location.zoom - 1)) * Math.cos((location.center.lat * Math.PI) / 180) * 1000;
      refetch({
        lat: location.center.lat,
        lng: location.center.lng,
        radius: parseInt(km)
      });
    }
  };

  function handlePanelResize(newSize) {
    if (newSize > window.innerWidth) {
      setPanelWidth(window.innerWidth);
    } else {
      setPanelWidth(newSize);
    }
  }

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        if (panelWidth > window.innerWidth) {
          setPanelWidth(window.innerWidth);
        }
      },
      true
    );
  });

  const setSelectedVehicleOnMap = (key) => {
    dispatch({
      type: 'SelectedVehicleOnMap',
      payload: key
    });
  };

  const list = [
    {
      name: 'CAR',
      icon: <i className="fas fa-car-side" />
    },
    {
      name: 'MOTORBIKE',
      icon: <i className="fas fa-motorcycle" />
    },
    {
      name: 'BICYCLE',
      icon: <i className="fas fa-bicycle" />
    },
    {
      name: 'CAMPERVAN',
      icon: <i className="fas fa-rv" />
    }
  ];

  return (
    <Container maxWidth={false}>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
          <RootStyle>
            <TopBar
              v={data?.VehiclesWithInRange}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              setSortType={setSortType}
            />
          </RootStyle>
          <Divider />
        </Stack>
      </Box>
      <Card
        sx={{
          p: 0,
          backgroundColor: '#00000000',
          borderRadius: '10px',
          height: 'calc(100vh - 168px)',
          display: 'flex',
          my: 1
        }}
      >
        <div className="container" style={{ maxWidth: '1800px', padding: 0 }}>
          <div className="map-toggle-main open">
            <SplitPane
              split="vertical"
              defaultSize={800}
              minSize={400}
              maxSize={1200}
              pane1Style={{ maxWidth: '100%' }}
              style={{ position: 'relative' }}
              onChange={handlePanelResize}
            >
              <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden', p: 1 }}>
                <Stack sx={{ flexGrow: 1, minHeight: 'calc(100vh - 184px)', maxHeight: 'calc(100vh - 184px)' }}>
                  <Scrollbar sx={{ pl: 0, pr: 1.5, pt: 0, height: 1, mr: 0.4 }}>
                    {loading ? <LoadingScreen /> : <VehicleList panelWidth={panelWidth} vehicles={sortedVehicles} />}
                  </Scrollbar>
                </Stack>
              </Box>
              <Box
                sx={{
                  transition: 'all 0.5s ease',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '300px',
                    px: 2,
                    py: 0.3,
                    position: 'absolute',
                    zIndex: 1,
                    mt: '9px',
                    mr: '48px',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: '100px',
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    '& svg': {
                      m: 1.5
                    },
                    '& hr': {
                      mx: 0.5
                    }
                  }}
                >
                  <Stack alignItems="center" direction="row" spacing={0.5}>
                    <Checkbox
                      name="search scroller"
                      checked={scroller}
                      onChange={handleScroller}
                      sx={{ p: 0 }}
                      size="small"
                    />
                    <Typography
                      component="snap"
                      variant="subtitle1"
                      fontWeight="light"
                      sx={{ color: 'text.secondary' }}
                    >
                      Search as I move the map
                    </Typography>
                  </Stack>
                </Box>
                <GoogleMap
                  handleOnMapScroll={handleOnMapScroll}
                  vehicles={data?.VehiclesWithInRange.filter(
                    (v) => v?.status && v?.vehicleType === list[selectedIndex].name
                  )}
                />
              </Box>
            </SplitPane>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAfp5ZK1FeI94gQZE8ZC0nDrKqX8AS0E3U'
})(Index);
