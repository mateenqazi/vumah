import moment from 'moment';
const fromDateTime = '00:00';
const toDateTime = '23:59';

export const VehicleBookingTime = (
  state = { fromDate: moment(fromDateTime, 'HH:mm:ss'), toDate: moment(toDateTime, 'HH:mm:ss') },
  action
) => {
  switch (action.type) {
    case 'VehicleBookingTime':
      return action.payload;
    default:
      return state;
  }
};
