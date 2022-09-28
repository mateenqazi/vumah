import React from 'react';
import VehicleView from '../../components/VehicleView';

function VehiclesList(props) {
  const { selectedVehicleOnMap, setSelectedVehicleOnMap, panelWidth, vehicles } = props;

  return (
    <div
      className={`toggle-double-grid ${
        panelWidth > 1100 ? 'c4' : panelWidth > 900 ? 'c3' : panelWidth > 600 ? 'c2' : 'c1'
      }`}
    >
      {vehicles.map((vehicle, index) => (
        <VehicleView
          key={index}
          vehicle={vehicle}
          selectedVehicleOnMap={selectedVehicleOnMap}
          setSelectedVehicleOnMap={setSelectedVehicleOnMap}
        />
      ))}
    </div>
  );
}

export default VehiclesList;
