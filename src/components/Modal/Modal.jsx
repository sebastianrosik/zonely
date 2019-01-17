import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.css';
import IconButton from '../IconButton';

export default class Modal extends PureComponent {
  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <Fragment>
        <div
          data-test="overlay"
          className={styles.overlay}
          onClick={this.props.onClose}
        />
        <div className={styles.modal}>
          <header className={styles.header}>
            <h3 className={styles.title}>{this.props.title}</h3>
            <IconButton className={styles.button} onClick={this.props.onClose}>
              x
            </IconButton>
          </header>
          <div className={styles.content}>{this.props.children}</div>
        </div>
      </Fragment>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  onClose: () => {},
  open: false,
  title: ''
};
