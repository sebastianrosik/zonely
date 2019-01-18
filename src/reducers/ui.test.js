import uiReducer from './ui';
import { openTimeZoneSelect, closeTimeZoneSelect } from '../actions/ui';
import TimeZone from '../lib/TimeZone';
jest.mock('../lib/TimeZone');

const createInitialState = (state = {}) => ({
  isSelectModalOpen: false,
  isEditModalOpen: false,
  editedTimeZone: null,
  ...state
});

describe('reducers/ui', () => {
  beforeEach(() => {
    expect.hasAssertions();
    TimeZone.mockClear();
  });
  it('openTimeZoneSelect sets isSelectModalOpen to true', () => {
    const initialState = createInitialState();
    const action = openTimeZoneSelect();
    const state = uiReducer(initialState, action);
    expect(state.isSelectModalOpen).toEqual(true);
  });
  it('closeTimeZoneSelect sets isSelectModalOpen to false', () => {
    const initialState = createInitialState();
    const action = closeTimeZoneSelect();
    const state = uiReducer(initialState, action);
    expect(state.isSelectModalOpen).toEqual(false);
  });
  it('openTimeZoneEdit sets isEditModalOpen to false', () => {
    const initialState = createInitialState();
    const action = closeTimeZoneSelect();
    const state = uiReducer(initialState, action);
    expect(state.isSelectModalOpen).toEqual(false);
  });
});
