/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import GoogleMap from './map';
import SplitPane from 'react-split-pane';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbar from '../../components/Scrollbar';
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Divider, Stack } from '@mui/material';
import SearchBar from './SearchBar';
import VehiclesList from './VehiclesList';
import { GoogleApiWrapper } from 'google-maps-react';

import TopBar from './TopBar';
import { useQuery } from '@apollo/client';
import { GET_VEHICLES } from '../../graphql/Queries';
import LoadingScreen from '../../components/LoadingScreen';

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 70,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0.5)
}));

function Search() {
  const dispatch = useDispatch();
  const selectedVehicleOnMap = useSelector((state) => state.SelectedVehicleOnMap);

  const [panelWidth, setPanelWidth] = useState(window.innerWidth > 800 ? 800 : window.innerWidth);

  const { loading, error, data } = useQuery(GET_VEHICLES);

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

  const [map, setMap] = useState(<GoogleMap />);

  return (
    <Container maxWidth={false}>
      <Card sx={{ p: 0, borderRadius: '10px', height: 'calc(100vh - 100px)', display: 'flex', my: 1 }}>
        <div className="container" style={{ maxWidth: '1800px' }}>
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
              <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
                <Stack sx={{ flexGrow: 1, minHeight: 'calc(100vh - 100px)', maxHeight: 'calc(100vh - 100px)' }}>
                  <RootStyle>
                    {/*<TopBar />*/}
                    <SearchBar setMap={setMap} />
                  </RootStyle>
                  <Divider />
                  <Scrollbar sx={{ px: 1, pt: 3, height: 1 }}>
                    {loading ? (
                      <LoadingScreen />
                    ) : (
                      <VehiclesList
                        selectedVehicleOnMap={selectedVehicleOnMap}
                        setSelectedVehicleOnMap={setSelectedVehicleOnMap}
                        panelWidth={panelWidth}
                        vehicles={data.Vehicles}
                      />
                    )}
                  </Scrollbar>
                </Stack>
              </Box>
              <Box
                sx={{
                  transition: 'all 0.5s ease',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flex: 1,
                  height: '100%'
                }}
              >
                {map}
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
})(Search);
