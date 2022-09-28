import React from 'react';
import { Stack } from '@mui/material';
import DropDown from './DropDown';
import PriceDropDown from './PriceDropDown';
import MultiSelect from './MultiSelect';
import Scrollbar from '../../../components/Scrollbar';
import VehicleTypeDropDown from './VehicleTypeDropDown';

// ----------------------------------------------------------------------

function Index({ v, selectedIndex, setSelectedIndex, setSortType }) {
  const list = [
    {
      name: 'Car',
      icon: <i className="fas fa-car-side" />
    },
    {
      name: 'Motorbike',
      icon: <i className="fas fa-motorcycle" />
    },
    {
      name: 'Bicycle',
      icon: <i className="fas fa-bicycle" />
    },
    {
      name: 'Campervan',
      icon: <i className="fas fa-rv" />
    }
  ];

  let gearBox = [
    { name: 'Gear Box', icon: '' },
    { name: 'Automatic', icon: '' },
    { name: 'Manual', icon: '' }
  ];

  let bikeType = [
    { name: 'Bike Type', icon: '' },
    { name: 'Adventure', icon: '' },
    { name: 'Classic', icon: '' },
    { name: 'Commuter', icon: '' },
    { name: 'Custom Cruiser', icon: '' },
    { name: 'E-Bike', icon: '' },
    { name: 'Enduro', icon: '' },
    { name: 'Minibike', icon: '' },
    { name: 'Moped', icon: '' },
    { name: 'Motocrosser', icon: '' },
    { name: 'Naked', icon: '' },
    { name: 'Quad/ATV', icon: '' },
    { name: 'Roadster/Retro', icon: '' },
    { name: 'Sidecar', icon: '' },
    { name: 'Special', icon: '' },
    { name: 'Sports Tourer', icon: '' },
    { name: 'Super Moto', icon: '' },
    { name: 'Super Sports', icon: '' },
    { name: 'Scooter', icon: '' }
  ];

  let bicycleType = [
    { name: 'Bike Type', icon: '' },
    { name: 'Mountain Bikes', icon: '' },
    { name: 'Hybrid Bikes', icon: '' },
    { name: 'Folding Bikes', icon: '' },
    { name: 'Electric Hybrid Bikes', icon: '' },
    { name: 'Road Bikes', icon: '' },
    { name: 'Adventure Bikes', icon: '' },
    { name: 'Fixie Bikes', icon: '' },
    { name: 'Electric Folding Bikes', icon: '' },
    { name: 'Electric Mountain Bikes', icon: '' },
    { name: 'Electric Adventure Bikes', icon: '' }
  ];

  let fuelType = [
    { name: 'Fuel Type', icon: '' },
    { name: 'Petrol', icon: '' },
    { name: 'Diesel', icon: '' },
    { name: 'Electric', icon: '' }
  ];

  let make = [{ name: 'Make', icon: '' }];

  let model = [{ name: 'Model', icon: '' }];

  let filters = [
    { name: 'Features', icon: '' },
    { name: 'Bluetooth', icon: '' },
    { name: 'Another filter', icon: '' }
  ];

  let sorting = [
    { name: 'Sort By Lowest Price', icon: '', index: 0 },
    { name: 'Sort By Highest Price', icon: '', index: 1 },
    { name: 'Sort By Distance', icon: '', index: 2 },
    { name: 'Sort By Reviews', icon: '', index: 3 }
  ];

  let bodType = [
    { name: 'Body Type', icon: '' },
    { name: 'Sedan', icon: '' },
    { name: 'Coupe', icon: '' },
    { name: 'Convertible', icon: '' },
    { name: 'Hatchback', icon: '' },
    { name: 'Wagon', icon: '' },
    { name: 'Sport-utility vehicle (SUV)', icon: '' },
    { name: 'Convertible SUV', icon: '' },
    { name: 'Pickup Truck', icon: '' },
    { name: 'Passenger Minivan', icon: '' },
    { name: 'Cargo Minivan', icon: '' },
    { name: 'Passenger Van', icon: '' },
    { name: 'Cargo Van', icon: '' }
  ];

  for (let i = 0; i < v?.length; i++) {
    if (v[i].model.trim() !== '') {
      model.push({ name: v[i].model, icon: '' });
    }

    if (v[i].make.trim() !== '') {
      make.push({ name: v[i].make, icon: '' });
    }
  }

  return (
    <Scrollbar sx={{ pl: 0, pr: 1.5, pt: 0, height: 1, mr: 0.4 }}>
      <Stack sx={{ flexGrow: 1, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <VehicleTypeDropDown
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          title="Vehicle"
          list={list}
          padding={true}
        />
        <PriceDropDown title="Price" />
        {list[selectedIndex].name === 'Motorbike' && (
          <>
            <DropDown title="Bike Type" list={bikeType} />
          </>
        )}
        {list[selectedIndex].name === 'Bicycle' && (
          <>
            <DropDown title="Bike Type" list={bicycleType} />
          </>
        )}
        {(list[selectedIndex].name === 'Car' || list[selectedIndex].name === 'Campervan') && (
          <>
            <DropDown title="Make" list={make} />
            <DropDown title="Model" list={model} />
          </>
        )}
        {list[selectedIndex].name !== 'Bicycle' && (
          <>
            <DropDown title="Gear Box" list={gearBox} />
          </>
        )}
        {(list[selectedIndex].name === 'Car' || list[selectedIndex].name === 'Campervan') && (
          <>
            <DropDown title="Body Type" list={bodType} />
            <DropDown title="Fuel Type" list={fuelType} />
            <MultiSelect title="Features" list={filters} type={list[selectedIndex].name}></MultiSelect>
          </>
        )}

        <Stack sx={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <DropDown title="Sort By" list={sorting} selectType={setSortType} type="sort" />
        </Stack>
      </Stack>
    </Scrollbar>
  );
}

export default Index;
