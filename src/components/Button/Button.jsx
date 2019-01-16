import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Button.css';

export default class Button extends PureComponent {
  render() {
    return (
      <button
        className={classnames(styles.button, this.props.className)}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  onClick: () => {}
};
