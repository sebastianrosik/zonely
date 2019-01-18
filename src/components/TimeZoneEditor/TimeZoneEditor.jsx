import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

export default class TimeZoneEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: props.hours,
      minutes: props.minutes
    };
  }
  onCancel = event => {
    event.preventDefault();
    this.props.onCancel();
  };
  onSubmit = event => {
    event.preventDefault();
    const { hours, minutes } = this.state;
    const { name } = this.props;
    this.props.onSubmit({ name, hours, minutes });
  };
  onChange = (event, fieldName) => {
    this.setState({
      [fieldName]: event.target.value
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.hours !== this.state.hours ||
      nextState.minutes !== this.state.minutes ||
      nextProps.hours !== this.props.hours ||
      nextProps.minutes !== this.props.minutes
    );
  }
  render() {
    const { hours, minutes } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <input
            value={hours}
            type="number"
            min="0"
            max="23"
            onChange={event => this.onChange(event, 'hours')}
            data-test="hours"
          />
          :
          <input
            value={minutes}
            type="number"
            min="0"
            max="59"
            onChange={event => this.onChange(event, 'minutes')}
            data-test="minutes"
          />
        </fieldset>
        <footer>
          <Button type="submit" data-test="submit">
            Save
          </Button>
          <Button onClick={this.onCancel} data-test="cancel">
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

TimeZoneEditor.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  hours: PropTypes.number,
  minutes: PropTypes.number
};

TimeZoneEditor.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
  name: '',
  hours: 0,
  minutes: 0
};
