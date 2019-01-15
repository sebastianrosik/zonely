import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Select.css';

const PLACEHOLDER = 'Select...';

export default class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      value: '',
      open: false
    };
  }
  getFilteredItems() {
    return this.props.items.filter(name =>
      name.toLowerCase().includes(this.state.filter.toLowerCase().trim())
    );
  }
  onOverlayClick = () => {
    this.setState({
      open: false
    });
  };
  onChange = event => {
    this.setState({
      filter: event.target.value
    });
  };
  onBlur = () => {
    this.setState({
      open: false
    });
  };
  onToggle = event => {
    event.preventDefault();
    this.setState(({ open }) => ({
      open: !open
    }));
  };
  onSelect = (event, name) => {
    event.preventDefault();
    this.setState({
      open: false,
      value: name,
      filter: ''
    });
    this.props.onSelect(name);
  };
  renderListItem = name => {
    return (
      <li
        data-test="item"
        key={name}
        onClick={event => this.onSelect(event, name)}
      >
        {name}
      </li>
    );
  };
  renderList() {
    if (!this.state.open) {
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
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
        </form>
        <ul className={styles.list}>
          {this.getFilteredItems().map(this.renderListItem)}
        </ul>
      </Fragment>
    );
  }
  render() {
    return (
      <div
        data-test="select"
        className={classnames(styles.select, this.state.open && styles.isOpen)}
      >
        <button data-test="button" onClick={this.onToggle}>
          {this.state.value || PLACEHOLDER}
        </button>
        {this.renderList()}
      </div>
    );
  }
}

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func
};

Select.defaultProps = {
  items: [],
  onSelect: () => {}
};
