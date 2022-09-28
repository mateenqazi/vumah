import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { GET_VEHICLE_BY_ID } from '../../graphql/Queries';
// import InfoWindow from '../search/map/InfoWindow';
import InfoWindow from './InfoWindow';

export default function VehicleMarker({ vehicle }) {
  const dispatch = useDispatch();
  const selectedVehicleOnMap = useSelector((state) => state.SelectedVehicleOnMap);

  const [vehicles, setVehicle] = useState({});

  const [getVehicle, { loading }] = useLazyQuery(GET_VEHICLE_BY_ID, {
    variables: { id: Number(vehicle.id) }
  });

  useEffect(() => {
    getVehicle().then((res) => {
      setVehicle(res.data.VehicleById);
    });
  }, []);

  const setSelectedVehicleOnMap = (key) => {
    dispatch({
      type: 'SelectedVehicleOnMap',
      payload: key
    });
  };

  const isSelected = selectedVehicleOnMap === vehicle.id;

  return (
    <>
      {!loading && (
        <>
          <div
            style={{
              background: !isSelected ? 'var(--white)' : 'var(--secondary-color)',
              color: !isSelected ? 'var(--black)' : 'white',
              display: 'flex',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '20px',
              width: 'fit-content',
              padding: '8px 14px',
              borderRadius: '100px',
              fontWeight: '600',
              transition: '200ms transform'
            }}
            onClick={() => {
              setSelectedVehicleOnMap(vehicle.id);
            }}
          >
            {`£${vehicles?.dailyRates || ''}`}
          </div>
          {isSelected && <InfoWindow vehicle={vehicles} />}
          {/* {selectedVehicleOnMap === vehicle.id && <InfoWindow place={vehicle} />} */}
        </>
      )}
    </>
  );
}
