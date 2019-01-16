import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Select.css';
import { ADD_TIME_ZONE, SEARCH_TIME_ZONE } from '../../labels';

export default class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      value: ''
    };
  }
  getFilteredItems() {
    return this.props.items.filter(name =>
      name.toLowerCase().includes(this.state.filter.toLowerCase().trim())
    );
  }
  onOverlayClick = () => {
    this.props.onClose();
  };
  onChange = event => {
    this.setState({
      filter: event.target.value
    });
  };
  onSelect = (event, name) => {
    event.preventDefault();
    this.setState({
      value: name,
      filter: ''
    });
    this.props.onSelect(name);
    this.props.onClose();
  };
  renderListItem = name => {
    return (
      <li data-test="item" key={name} className={styles.item}>
        <button
          className={styles.button}
          data-test="button"
          onClick={event => this.onSelect(event, name)}
        >
          {name}
        </button>
      </li>
    );
  };
  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <Fragment>
        <div
          data-test="overlay"
          className={styles.overlay}
          onClick={this.onOverlayClick}
        />
        <form className={styles.form}>
          <input
            data-test="input"
            type="search"
            placeholder={SEARCH_TIME_ZONE}
            onChange={this.onChange}
            className={styles.input}
            autoFocus
          />
        </form>
        <ul className={styles.list}>
          {this.getFilteredItems().map(this.renderListItem)}
        </ul>
      </Fragment>
    );
  }
}

Select.propTypes = {
  open: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string
};

Select.defaultProps = {
  open: false,
  items: [],
  onSelect: () => {},
  onClose: () => {}
};
