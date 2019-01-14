import { addTimeZone } from '../actions/timeZones';
import { EUROPE_WARSAW, INVALID_ZONE } from '../fakes/timeZones';

describe('actions/timeZones', () => {
  beforeEach(() => {
    expect.assertions(1);
  });
  describe('addTimeZone', () => {
    it('throws error if given time zone name is invalid', () => {
      expect(() => addTimeZone(INVALID_ZONE)).toThrow();
    });
    it('returns action if given time zone name is valid', () => {
      expect(addTimeZone(EUROPE_WARSAW)).toMatchObject({
        payload: {
          name: EUROPE_WARSAW
        }
      });
    });
  });
});
