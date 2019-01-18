import { handleActions } from 'redux-actions';
import { addTimeZone, removeTimeZone } from '../actions/timeZones';
import { updateClock, shiftWorldTime } from '../actions/clock';
import moment from 'moment-timezone';

import TimeZone from '../lib/TimeZone';
import { timeZoneExists } from '../selectors/timeZones';

const defaultState = {
  list: [],
  offsetInMinutes: 0
};

export default handleActions(
  {
    [addTimeZone]: (state, { payload: name }) => {
      if (timeZoneExists(state, name)) {
        return state;
      }
      return {
        ...state,
        list: [...state.list, new TimeZone(name, state.offsetInMinutes)]
      };
    },

    [removeTimeZone]: (state, { payload }) => ({
      ...state,
      list: state.list.filter(({ name }) => name !== payload)
    }),

    [updateClock]: state => ({
      ...state,
      list: state.list.map(
        ({ name }) => new TimeZone(name, state.offsetInMinutes)
      )
    }),

    [shiftWorldTime]: (state, { payload }) => {
      const userSelectedDate = moment()
        .tz(payload.name)
        .hours(payload.hours)
        .minutes(payload.minutes);
      const realTimeZoneDate = moment().tz(payload.name);
      const duration = moment.duration(userSelectedDate.diff(realTimeZoneDate));
      const offsetInMinutes = duration.asMinutes();
      return {
        ...state,
        offsetInMinutes
      };
    }
  },
  defaultState
);
