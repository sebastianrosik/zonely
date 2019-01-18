import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './FormattedDate.css';

export default class FormattedDate extends Component {
  static addLeadZero(number) {
    return number < 10 ? `0${number}` : number.toString();
  }
  getHours(date) {
    return FormattedDate.addLeadZero(date.getHours());
  }
  getMinutes(date) {
    return FormattedDate.addLeadZero(date.getMinutes());
  }
  render() {
    const { date } = this.props;
    const hours = this.getHours(date);
    const minutes = this.getMinutes(date);
    return (
      <span className={classnames(styles.date, this.props.className)}>
        {hours}
        <span className={styles.separator}>:</span>
        {minutes}
      </span>
    );
  }
}

FormattedDate.propTypes = {
  date: PropTypes.shape({
    name: PropTypes.string,
    format: PropTypes.func
  }),
  className: PropTypes.string
};
