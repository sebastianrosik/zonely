import React from 'react';
import Select from './Select';
import { shallow } from 'enzyme';
import { EUROPE_WARSAW, AMERICA_NEWYORK } from '../../fakes/timeZones';

const fakeEvent = { preventDefault: jest.fn() };
const fakeItems = [EUROPE_WARSAW, AMERICA_NEWYORK];
const KEY_DOWN = 40;
const KEY_UP = 38;

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
    const fakeEvent = {
      preventDefault: jest.fn(),
      keyCode: KEY_DOWN
    };
    wrapper.instance().shortcutsHandler('CLOSE', fakeEvent);
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
    const fakeEvent = {
      preventDefault: jest.fn(),
      keyCode: KEY_DOWN
    };
    wrapper.instance().shortcutsHandler('SELECT', fakeEvent);
    expect(onSelectMock).toHaveBeenCalledWith(mockedValue);
  });

  it('prevents default event when key down or key up is pressed', () => {
    expect.assertions(2);
    [KEY_DOWN, KEY_UP].forEach(keyCode => {
      const fakeEvent = {
        preventDefault: jest.fn(),
        keyCode
      };
      wrapper.instance().shortcutsHandler('SELECT', fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
    });
  });

  it('does not prevent default event when other keys than key down or key up are pressed', () => {
    const fakeEvent = {
      preventDefault: jest.fn(),
      keyCode: 0
    };
    wrapper.instance().shortcutsHandler('SELECT', fakeEvent);
    expect(fakeEvent.preventDefault).not.toHaveBeenCalled();
  });
});
