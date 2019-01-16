import React from 'react';
import List from './List';
import { shallow } from 'enzyme';
import { MOCK_DATE_0, MOCK_DATE_1, MOCK_DATE_2 } from '../../fakes/dates';

const fakeitems = [
  {
    name: 'foo',
    date: MOCK_DATE_0
  },
  {
    name: 'foo',
    date: MOCK_DATE_1
  },
  {
    name: 'foo',
    date: MOCK_DATE_2
  }
];

describe('List', () => {
  it('renders given items', () => {
    const wrapper = shallow(<List items={fakeitems} />);
    expect(wrapper.find('[data-test="item"]')).toHaveLength(3);
  });
});
