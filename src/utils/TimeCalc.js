import moment from 'moment';

export const toTimestamp = (strDate) => {
  const dt = Date.parse(strDate);
  return dt;
};

export const getLastSeen = (lastSeen) => {
  if (!lastSeen) return 'Offline';
  const now = moment(new Date());
  const duration = moment.duration(now.diff(lastSeen));
  const minutes = duration.asMinutes();
  const hours = duration.asHours();
  if (minutes < 2) return 'Online';
  if (minutes < 10) return `last seen ${minutes.toFixed(0)} mins`;
  const dateFormat = 'HH:mm A';
  if (hours < 24) return `last seen ${moment(lastSeen).format(dateFormat)}`;
  return `last seen ${moment(lastSeen).format('DD/MMM/YYYY HH:mm A')}`;
};

export const getTimeDiff = (startTime, endTime) => {
  const distanceToNow = moment(startTime).valueOf() - moment(endTime).valueOf();

  if (distanceToNow < 1) {
    return {
      dif: 0,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    };
  }

  const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

  const getHours = `0${Math.floor((distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`.slice(-2);

  const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2);

  const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

  return {
    dif: distanceToNow,
    days: getDays.toString() || '00',
    hours: getHours || '00',
    minutes: getMinutes || '00',
    seconds: getSeconds || '00'
  };
};

export const getTimeDiffDroid = (dateRange) => {
  const distanceToNow = moment(dateRange.toDate).valueOf() - moment(dateRange.fromDate).valueOf();

  if (distanceToNow < 1) {
    return {
      dif: 0,
      calcMinutes: 0,
      calcHours: 0,
      calcDays: 0,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    };
  }

  const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

  const getLength = Math.floor((distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const getCalMinutes = Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60));

  const getHours = `0${Math.floor((distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`.slice(-2);

  const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2);

  const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

  return {
    dif: distanceToNow,
    calcMinutes: getCalMinutes || 0,
    calcHours: getLength || 0,
    calcDays: getDays || 0,
    days: getDays.toString() || '00',
    hours: getHours || '00',
    minutes: getMinutes || '00',
    seconds: getSeconds || '00'
  };
};

export const getCostsDroid = (dateRange, dailyRates, hourlyRates) => {
  const time = getTimeDiffDroid(dateRange);
  return time.calcDays * dailyRates + time.calcHours * hourlyRates + (time.calcMinutes / 60) * hourlyRates || 0;
};
