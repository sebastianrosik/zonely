import React from 'react';
import TimeZoneEditor from './TimeZoneEditor';
import { shallow } from 'enzyme';

const fakeEvent = { preventDefault: jest.fn() };

describe('TimeZoneEditor', () => {
  let wrapper;
  beforeEach(() => {
    expect.hasAssertions();
    wrapper = shallow(<TimeZoneEditor />);
  });

  it('renders input with proper hours value', () => {
    const mockedHours = 10;
    wrapper = shallow(<TimeZoneEditor hours={mockedHours} />);
    expect(wrapper.find('[data-test="hours"]').prop('value')).toEqual(
      mockedHours
    );
  });

  it('renders input with proper minutes value', () => {
    const mockedMinutes = 10;
    wrapper = shallow(<TimeZoneEditor minutes={mockedMinutes} />);
    expect(wrapper.find('[data-test="minutes"]').prop('value')).toEqual(
      mockedMinutes
    );
  });

  it('calls onCancel after clicking cancel button', () => {
    const onCancelMock = jest.fn();
    wrapper.setProps({
      onCancel: onCancelMock
    });
    wrapper.find('[data-test="cancel"]').simulate('click', fakeEvent);
    expect(onCancelMock).toHaveBeenCalled();
  });

  it('updates hours after changing value in the hours input', () => {
    const mockedHours = 10;
    wrapper.find('[data-test="hours"]').simulate('change', {
      ...fakeEvent,
      target: {
        value: mockedHours
      }
    });
    expect(wrapper.state('hours')).toEqual(mockedHours);
  });

  it('updates minutes after changing value in the minutes input', () => {
    const mockedMinutes = 10;
    wrapper.find('[data-test="minutes"]').simulate('change', {
      ...fakeEvent,
      target: {
        value: mockedMinutes
      }
    });
    expect(wrapper.state('minutes')).toEqual(mockedMinutes);
  });

  it('calls onSubmit after submiting the form', () => {
    const onSubmitMock = jest.fn();
    wrapper.setProps({
      onSubmit: onSubmitMock
    });
    wrapper.simulate('submit', fakeEvent);
    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('calls onSubmit with proper payload after submiting the form', () => {
    const onSubmitMock = jest.fn();
    const mockedHours = 10;
    const mockedMinutes = 20;
    const mockedName = 'foobar';
    wrapper = shallow(
      <TimeZoneEditor
        minutes={mockedMinutes}
        hours={mockedHours}
        name={mockedName}
        onSubmit={onSubmitMock}
      />
    );
    wrapper.simulate('submit', fakeEvent);
    expect(onSubmitMock).toHaveBeenCalledWith({
      hours: mockedHours,
      minutes: mockedMinutes,
      name: mockedName
    });
  });
});
