import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Select.css';
import * as labels from '../../labels';

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
  renderListItems() {
    const listItems = this.getFilteredItems();
    if (listItems.length === 0) {
      return (
        <div className={styles.message}>
          {labels.noTimeZoneFound(this.state.filter)}
        </div>
      );
    }
    return listItems.map(this.renderListItem);
  }
  render() {
    return (
      <div className={classnames(styles.select, this.props.className)}>
        <form className={styles.form}>
          <input
            data-test="input"
            type="search"
            placeholder={labels.searchTimeZone()}
            onChange={this.onChange}
            className={styles.input}
            autoFocus
          />
        </form>
        <ul className={styles.list}>{this.renderListItems()}</ul>
      </div>
    );
  }
}

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  className: PropTypes.string
};

Select.defaultProps = {
  items: [],
  onSelect: () => {}
};
