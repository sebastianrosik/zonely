import { handleActions } from 'redux-actions';
import {
  openTimeZoneSelect,
  closeTimeZoneSelect,
  openTimeZoneEdit,
  closeTimeZoneEdit
} from '../actions/ui';
import TimeZone from '../lib/TimeZone';

const defaultState = {
  isSelectModalOpen: false,
  isEditModalOpen: false,
  editedTimeZone: null
};

export default handleActions(
  {
    [openTimeZoneSelect]: state => ({
      ...state,
      isSelectModalOpen: true
    }),
    [closeTimeZoneSelect]: state => ({
      ...state,
      isSelectModalOpen: false
    }),
    [openTimeZoneEdit]: (state, { payload: name }) => ({
      ...state,
      isEditModalOpen: true,
      editedTimeZone: new TimeZone(name)
    }),
    [closeTimeZoneEdit]: state => ({
      ...state,
      isEditModalOpen: false,
      editedTimeZone: null
    })
  },
  defaultState
);
