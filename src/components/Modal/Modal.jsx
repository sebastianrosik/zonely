import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';
import classnames from 'classnames';
import styles from './Modal.css';
import IconButton from '../IconButton';

export default class Modal extends PureComponent {
  shortcutsHandler = action => {
    switch (action) {
      case 'CLOSE':
        this.props.onClose();
        return;
      default:
        return;
    }
  };
  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <Shortcuts
        name="Modal"
        handler={this.shortcutsHandler}
        className={styles.container}
      >
        <div
          data-test="overlay"
          className={styles.overlay}
          onClick={this.props.onClose}
        />
        <div
          className={classnames(styles.modal, this.props.className)}
          data-test="modal"
        >
          <header className={styles.header}>
            <h3 className={styles.title} data-test="title">
              {this.props.title}
            </h3>
            <IconButton
              data-test="close"
              className={styles.button}
              onClick={this.props.onClose}
            >
              x
            </IconButton>
          </header>
          <div className={styles.content}>{this.props.children}</div>
        </div>
      </Shortcuts>
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
