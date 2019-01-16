import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './FormattedDate.css';

export default class FormattedDate extends Component {
  render() {
    const { date } = this.props;
    const formatedDate = date.format();
    return (
      <span className={classnames(styles.date, this.props.className)}>
        {formatedDate}
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
