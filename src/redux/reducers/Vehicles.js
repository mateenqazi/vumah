export const Vehicles = (state = [], action) => {
  switch (action.type) {
    case 'Vehicles':
      return action.payload;
    default:
      return state;
  }
};

export const VehicleCategories = (state = [], action) => {
  switch (action.type) {
    case 'VehicleCategories':
      return action.payload;
    default:
      return state;
  }
};

export const VehicleEnergySources = (state = [], action) => {
  switch (action.type) {
    case 'VehicleEnergySources':
      return action.payload;
    default:
      return state;
  }
};

export const VehicleFeatures = (state = [], action) => {
  switch (action.type) {
    case 'VehicleFeatures':
      return action.payload;
    default:
      return state;
  }
};

export const VehicleManufacturers = (state = [], action) => {
  switch (action.type) {
    case 'VehiclesManufacturers':
      return action.payload;
    default:
      return state;
  }
};

export const VehicleModels = (state = [], action) => {
  switch (action.type) {
    case 'VehiclesModels':
      return action.payload;
    default:
      return state;
  }
};
