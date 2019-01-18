import moment from 'moment-timezone';

export const DEFAULT_TIME_ZONE = 'Etc/GMT';

export default class TimeZone {
  constructor(name = DEFAULT_TIME_ZONE, offsetMinutes = 0) {
    if (!TimeZone.isValidName(name)) {
      throw new Error('Given time zone is invalid');
    }
    this.name = name;
    this._moment = moment()
      .tz(name)
      .clone()
      .add(offsetMinutes, 'minute');
  }
  static guessUsersTimeZone() {
    return moment.tz.guess();
  }
  static getNames() {
    return moment.tz.names();
  }
  static isValidName(name) {
    return moment.tz.zone(name) !== null;
  }
  getHours(offsetInMinutes = 0) {
    return this._moment
      .clone()
      .add(offsetInMinutes, 'minutes')
      .hour();
  }
  getMinutes(offsetInMinutes = 0) {
    return this._moment
      .clone()
      .add(offsetInMinutes, 'minutes')
      .minute();
  }
}
