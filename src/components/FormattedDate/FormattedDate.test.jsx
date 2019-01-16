import React from 'react';
import FormattedDate from './FormattedDate';
import { shallow } from 'enzyme';
import TimeZone from '../../lib/TimeZone';

jest.mock('../../lib/TimeZone');

describe('FormattedDate', () => {
  beforeEach(() => {
    expect.hasAssertions();
    TimeZone.mockClear();
  });

  it('renders date in proper format', () => {
    const mockHours = '01';
    const mockMinutes = '23';
    const mockedTimeZone = new TimeZone();
    mockedTimeZone.getMinutes.mockImplementation(() => mockMinutes);
    mockedTimeZone.getHours.mockImplementation(() => mockHours);
    const wrapper = shallow(<FormattedDate date={mockedTimeZone} />);
    expect(wrapper.text()).toEqual(`${mockHours}:${mockMinutes}`);
  });
});
