import { handleActions } from 'redux-actions';
import { addTimeZone, removeTimeZone } from '../actions/timeZones';
import { getCurrentDateForTimeZone } from '../lib/timeZones';

const defaultState = [];

const createNewTimeZone = ({ name }) => ({
  name,
  date: getCurrentDateForTimeZone(name)
});

export default handleActions(
  {
    [addTimeZone]: (state, { payload }) => {
      if (state.find(({ name }) => name === payload.name)) {
        return state;
      }
      return [...state, createNewTimeZone(payload)];
    },
    [removeTimeZone]: (state, { payload }) => {
      return state.filter(({ name }) => name !== payload.name);
    }
  },
  defaultState
);
