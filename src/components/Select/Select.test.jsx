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
  it('does not render list when select is not open', () => {
    expect(wrapper.find('li')).toHaveLength(0);
  });
  it('render list when select is open', () => {
    wrapper.setProps({
      open: true
    });
    const items = wrapper.find('[data-test="item"]');
    expect(items).toHaveLength(fakeItems.length);
    expect(items.at(0).text()).toEqual(EUROPE_WARSAW);
    expect(items.at(1).text()).toEqual(AMERICA_NEWYORK);
  });
  it('calls onClose list after clicking on overlay', () => {
    const onCloseMock = jest.fn();
    wrapper.setProps({
      open: true,
      onClose: onCloseMock
    });
    wrapper.find('[data-test="overlay"]').simulate('click', fakeEvent);
    expect(onCloseMock).toHaveBeenCalled();
  });
  it('overlay is not rendered when select is closed', () => {
    wrapper.setProps({
      open: false
    });
    expect(wrapper.contains('[data-test="overlay"]')).toEqual(false);
  });
  it('calls onClose list after selecting an item', () => {
    const onCloseMock = jest.fn();
    wrapper.setProps({
      open: true,
      onClose: onCloseMock
    });
    wrapper
      .find('[data-test="button"]')
      .at(0)
      .simulate('click', fakeEvent);
    expect(onCloseMock).toHaveBeenCalled();
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
});
