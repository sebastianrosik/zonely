import timeZonesReducer from './timeZones';
import { addTimeZone, removeTimeZone } from '../actions/timeZones';
import { EUROPE_WARSAW, AMERICA_NEWYORK } from '../fakes/timeZones';
import { APP_START_DATE } from '../fakes/dates';
import * as timeZones from '../lib/timeZones';

describe('reducers/timeZones', () => {
  beforeEach(() => {
    expect.assertions(1);
    timeZones.getCurrentDateForTimeZone = jest.fn(
      () => new Date(APP_START_DATE)
    );
  });
  it('Creates a new time zone', () => {
    const initialState = [];
    const action = addTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state).toEqual([
      {
        name: EUROPE_WARSAW,
        date: new Date(APP_START_DATE)
      }
    ]);
  });
  it('Does not create a new time zone if it already exist', () => {
    const initialState = [
      {
        name: EUROPE_WARSAW,
        date: new Date(APP_START_DATE)
      }
    ];
    const action = addTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state).toEqual([
      {
        name: EUROPE_WARSAW,
        date: new Date(APP_START_DATE)
      }
    ]);
  });
  it('Removes given time zone', () => {
    const initialState = [
      {
        name: EUROPE_WARSAW,
        date: new Date(APP_START_DATE)
      },
      {
        name: AMERICA_NEWYORK,
        date: new Date(APP_START_DATE)
      }
    ];
    const action = removeTimeZone(EUROPE_WARSAW);
    const state = timeZonesReducer(initialState, action);
    expect(state).toEqual([
      {
        name: AMERICA_NEWYORK,
        date: new Date(APP_START_DATE)
      }
    ]);
  });
});
