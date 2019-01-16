import moment from 'moment-timezone';

export const DEFAULT_TIME_ZONE = 'Etc/GMT';

export default class TimeZone {
  constructor(name = DEFAULT_TIME_ZONE) {
    if (!TimeZone.isValidName(name)) {
      throw new Error('Given time zone is invalid');
    }
    this.name = name;
    this._moment = moment().tz(name);
  }
  static getNames() {
    return moment.tz.names();
  }
  static isValidName(name) {
    return moment.tz.zone(name) !== null;
  }
  format() {
    return this._moment.format('HH:mm:ss');
  }
}
