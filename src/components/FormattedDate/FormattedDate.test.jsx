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
    const mockedTimeZone = new TimeZone();
    const mockedFormattedDate = '11:22:33';
    mockedTimeZone.format.mockImplementation(() => mockedFormattedDate);
    const wrapper = shallow(<FormattedDate date={mockedTimeZone} />);
    expect(wrapper.text()).toEqual(mockedFormattedDate);
  });
});
