import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import styles from './TimeZOneEditor.css';
import * as labels from '../../labels';

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
      <form
        onSubmit={this.onSubmit}
        className={classnames(styles.form, this.props.className)}
      >
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="hours">
            {labels.hours()}
          </label>
          <input
            className={styles.input}
            value={hours}
            type="number"
            min="0"
            max="23"
            onChange={event => this.onChange(event, 'hours')}
            data-test="hours"
            name="hours"
            autoFocus
          />
          <span className={styles.separator}>:</span>
          <label className={styles.label} htmlFor="minutes">
            {labels.minutes()}
          </label>
          <input
            className={styles.input}
            value={minutes}
            type="number"
            min="0"
            max="59"
            onChange={event => this.onChange(event, 'minutes')}
            data-test="minutes"
            name="minutes"
          />
        </fieldset>
        <footer className={styles.footer}>
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
  className: PropTypes.string,
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
