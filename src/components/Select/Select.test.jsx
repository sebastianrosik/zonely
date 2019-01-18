import React from 'react';
import Select from './Select';
import { shallow } from 'enzyme';
import { EUROPE_WARSAW, AMERICA_NEWYORK } from '../../fakes/timeZones';

const fakeEvent = { preventDefault: jest.fn() };
const fakeItems = [EUROPE_WARSAW, AMERICA_NEWYORK];

describe('Select', () => {
  let wrapper;
  beforeEach(() => {
    expect.hasAssertions();
    wrapper = shallow(<Select items={fakeItems} />);
  });
  it('render list with proper amount of given items', () => {
    const items = wrapper.find('[data-test="item"]');
    expect(items).toHaveLength(fakeItems.length);
    expect(items.at(0).text()).toEqual(EUROPE_WARSAW);
    expect(items.at(1).text()).toEqual(AMERICA_NEWYORK);
  });
  it('calls onSelect list after selecting an item', () => {
    const onSelectMock = jest.fn();
    wrapper.setProps({
      open: true,
      onSelect: onSelectMock
    });
    wrapper
      .find('[data-test="button"]')
      .at(0)
      .simulate('click', fakeEvent);
    expect(onSelectMock).toHaveBeenCalled();
  });
  it('filters list', () => {
    wrapper.setProps({
      open: true
    });
    wrapper.setState({
      filter: 'york'
    });
    const items = wrapper.find('[data-test="item"]');
    expect(items).toHaveLength(1);
    expect(items.at(0).text()).toEqual(AMERICA_NEWYORK);
  });
  it('updates filter with every character', () => {
    const expectedFilter = 'york';
    wrapper.setProps({
      open: true
    });
    wrapper.find('[data-test="input"]').simulate('change', {
      target: {
        value: expectedFilter
      }
    });
    expect(wrapper.state('filter')).toEqual(expectedFilter);
  });
  it('calls onClose when a CLOSE action is passed through shortcut manager', () => {
    const onCloseMock = jest.fn();
    wrapper.setProps({
      onClose: onCloseMock
    });
    wrapper.instance().shortcutsHandler('CLOSE');
    expect(onCloseMock).toHaveBeenCalled();
  });
  it('calls onSelect when a SELECT action is passed through shortcut manager', () => {
    const onSelectMock = jest.fn();
    const mockedValue = 'foobar';
    wrapper.setProps({
      onSelect: onSelectMock
    });
    wrapper.setState({
      value: mockedValue
    });
    wrapper.instance().shortcutsHandler('SELECT');
    expect(onSelectMock).toHaveBeenCalledWith(mockedValue);
  });
});