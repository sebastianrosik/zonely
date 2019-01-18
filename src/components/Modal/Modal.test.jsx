import React from 'react';
import Modal from './Modal';
import { shallow } from 'enzyme';

const fakeEvent = { preventDefault: jest.fn() };

describe('Modal', () => {
  let wrapper;
  beforeEach(() => {
    expect.hasAssertions();
    wrapper = shallow(<Modal />);
  });
  it('when modal is open then renders all children', () => {
    wrapper.setProps({
      open: true
    });
    expect(wrapper.exists('[data-test="modal"]')).toEqual(true);
    expect(wrapper.exists('[data-test="overlay"]')).toEqual(true);
  });
  it('when modal is closed then renders all children', () => {
    wrapper.setProps({
      open: false
    });
    expect(wrapper.children()).toHaveLength(0);
  });
  describe('calls onClose', () => {
    let onCloseMock;
    beforeEach(() => {
      onCloseMock = jest.fn();
      wrapper.setProps({
        open: true,
        onClose: onCloseMock
      });
    });
    it('calls onClose list after clicking on overlay', () => {
      wrapper.find('[data-test="overlay"]').simulate('click', fakeEvent);
      expect(onCloseMock).toHaveBeenCalled();
    });
    it('calls onClose after clicking on close button', () => {
      wrapper.find('[data-test="overlay"]').simulate('click', fakeEvent);
      wrapper.find('[data-test="close"]').simulate('click', fakeEvent);
      expect(onCloseMock).toHaveBeenCalled();
    });
    it('calls onClose when a CLOSE action is passed through shortcut manager', () => {
      wrapper.instance().shortcutsHandler('CLOSE');
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
  it('renders title properly', () => {
    const mockedTitle = 'foobar';
    wrapper.setProps({
      title: mockedTitle,
      open: true
    });
    expect(wrapper.find('[data-test="title"]').text()).toEqual(mockedTitle);
  });
});
