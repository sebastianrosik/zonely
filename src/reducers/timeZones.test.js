import timeZonesReducer from './timeZones';
import { addTimeZone, removeTimeZone } from '../actions/timeZones';
import { EUROPE_WARSAW, AMERICA_NEWYORK } from '../fakes/timeZones';
import TimeZone from '../lib/TimeZone';
import { updateClock } from '../actions/clock';

jest.mock('../lib/TimeZone');

describe('reducers/timeZones', () => {
  beforeEach(() => {
    expect.hasAssertions();
    TimeZone.mockClear();
  });
  it('Creates a new time zone', () => {
    const initialState = [];
    const action = addTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state[0]).toBeInstanceOf(TimeZone);
    expect(TimeZone).toHaveBeenCalledWith(EUROPE_WARSAW);
  });
  it('Does not create a new time zone if it already exist', () => {
    const initialState = [
      {
        name: EUROPE_WARSAW
      }
    ];
    const action = addTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state).toEqual([
      {
        name: EUROPE_WARSAW
      }
    ]);
  });
  it('Removes given time zone', () => {
    const initialState = [
      {
        name: EUROPE_WARSAW
      },
      {
        name: AMERICA_NEWYORK
      }
    ];
    const action = removeTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state).toEqual([
      {
        name: AMERICA_NEWYORK
      }
    ]);
  });
  it('reacreates time zone instances when clock is updated', () => {
    const initialState = [
      {
        name: EUROPE_WARSAW
      },
      {
        name: AMERICA_NEWYORK
      }
    ];
    const action = updateClock();
    timeZonesReducer(initialState, action);
    expect(TimeZone).toHaveBeenCalledTimes(initialState.length);
    expect(TimeZone).toHaveBeenCalledWith(EUROPE_WARSAW);
    expect(TimeZone).toHaveBeenCalledWith(AMERICA_NEWYORK);
  });
});
