import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './IconButton.css';

export default class IconButton extends PureComponent {
  render() {
    return (
      <button
        className={classnames(styles.button, this.props.className)}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

IconButton.defaultProps = {
  onClick: () => {}
};
