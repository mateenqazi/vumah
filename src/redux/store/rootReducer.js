import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import chatReducer from '../slices/chat';
import userReducer from '../slices/user';
import { User } from '../reducers/User';
import { MapCenter, MapSearch, SelectedVehicleOnMap } from '../reducers/MapReducer';
import { Token } from '../reducers/Token';
import { VehicleBookingTime } from '../reducers/VehicleBookingTime';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  testUser: User,
  MapCenter,
  MapSearch,
  SelectedVehicleOnMap,
  Token,
  VehicleBookingTime
});

export { rootPersistConfig, rootReducer };
