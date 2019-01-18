import timeZonesReducer from './timeZones';
import { addTimeZone, removeTimeZone } from '../actions/timeZones';
import { EUROPE_WARSAW, AMERICA_NEWYORK } from '../fakes/timeZones';
import TimeZone from '../lib/TimeZone';
import { updateClock } from '../actions/clock';

jest.mock('../lib/TimeZone');

const createInitialState = (list = []) => ({
  offsetInMinutes: 0,
  list: [...list]
});

describe('reducers/timeZones', () => {
  beforeEach(() => {
    expect.hasAssertions();
    TimeZone.mockClear();
  });
  it('Creates a new time zone', () => {
    const initialState = createInitialState();
    const action = addTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    const expectedTimeOffsetInMinutes = 0;
    expect(state.list[0]).toBeInstanceOf(TimeZone);
    expect(TimeZone).toHaveBeenCalledWith(
      EUROPE_WARSAW,
      expectedTimeOffsetInMinutes
    );
  });
  it('Does not create a new time zone if it already exist', () => {
    const initialState = createInitialState([
      {
        name: EUROPE_WARSAW
      }
    ]);
    const action = addTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state.list).toEqual([
      {
        name: EUROPE_WARSAW
      }
    ]);
  });
  it('Removes given time zone', () => {
    const initialState = createInitialState([
      {
        name: EUROPE_WARSAW
      },
      {
        name: AMERICA_NEWYORK
      }
    ]);
    const action = removeTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state.list).toEqual([
      {
        name: AMERICA_NEWYORK
      }
    ]);
  });
  it('reacreates time zone instances when clock is updated', () => {
    const initialState = createInitialState([
      {
        name: EUROPE_WARSAW
      },
      {
        name: AMERICA_NEWYORK
      }
    ]);
    const action = updateClock();
    const expectedTimeOffsetInMinutes = 0;
    timeZonesReducer(initialState, action);
    expect(TimeZone).toHaveBeenCalledTimes(initialState.list.length);
    expect(TimeZone).toHaveBeenCalledWith(
      EUROPE_WARSAW,
      expectedTimeOffsetInMinutes
    );
    expect(TimeZone).toHaveBeenCalledWith(
      AMERICA_NEWYORK,
      expectedTimeOffsetInMinutes
    );
  });
});
