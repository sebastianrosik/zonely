import { handleActions } from 'redux-actions';
import { addTimeZone, removeTimeZone } from '../actions/timeZones';
import { updateClock } from '../actions/clock';
import TimeZone from '../lib/TimeZone';

const defaultState = [];

const timeZoneExists = (state, name) =>
  state.find(timeZone => name === timeZone.name);

export default handleActions(
  {
    [addTimeZone]: (state, { payload }) => {
      if (timeZoneExists(state, payload)) {
        return state;
      }
      return [...state, new TimeZone(payload)];
    },
    [removeTimeZone]: (state, { payload }) => {
      return state.filter(({ name }) => name !== payload);
    },
    [updateClock]: state => state.map(({ name }) => new TimeZone(name))
  },
  defaultState
);
