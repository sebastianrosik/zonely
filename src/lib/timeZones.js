import moment from 'moment-timezone';

export const DEFAULT_TIME_ZONE = 'Etc/GMT';
export const isTimeZoneValid = name => moment.tz.zone(name) !== null;
export const getCurrentDateForTimeZone = name => moment.tz(name);
export const getAllTimeZoneNames = () => moment.tz.names();
