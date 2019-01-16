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
  static guessUsersTimeZone() {
    return moment.tz.guess();
  }
  static getNames() {
    return moment.tz.names();
  }
  static isValidName(name) {
    return moment.tz.zone(name) !== null;
  }
  static addLeadZero(number) {
    return number < 10 ? `0${number}` : number.toString();
  }
  getHours() {
    return TimeZone.addLeadZero(this._moment.hour());
  }
  getMinutes() {
    return TimeZone.addLeadZero(this._moment.minute());
  }
  format() {
    return this._moment.format('HH:mm:ss');
  }
}
