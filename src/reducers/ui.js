import { handleActions } from 'redux-actions';
import { openTimeZoneSelect, closeTimeZoneSelect } from '../actions/ui';

const defaultState = {
  isSelectOpen: false
};

export default handleActions(
  {
    [openTimeZoneSelect]: state => ({
      ...state,
      isSelectOpen: true
    }),
    [closeTimeZoneSelect]: state => ({
      ...state,
      isSelectOpen: false
    })
  },
  defaultState
);
