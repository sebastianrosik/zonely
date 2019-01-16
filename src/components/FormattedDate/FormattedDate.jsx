import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './FormattedDate.css';

export default class FormattedDate extends Component {
  render() {
    const { date } = this.props;
    const hours = date.getHours();
    const minutes = date.getMinutes();
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
