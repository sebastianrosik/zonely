import { createActions } from 'redux-actions';
import { isTimeZoneValid, DEFAULT_TIME_ZONE } from '../lib/timeZones';

export const { addTimeZone, removeTimeZone } = createActions({
  ADD_TIME_ZONE: (name = DEFAULT_TIME_ZONE) => {
    if (!isTimeZoneValid(name)) {
      throw new Error('Given time zone is invalid');
    }
    return {
      name
    };
  },
  REMOVE_TIME_ZONE: name => ({ name })
});
