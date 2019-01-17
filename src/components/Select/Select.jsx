import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Shortcuts } from 'react-shortcuts';
import styles from './Select.css';
import * as labels from '../../labels';

const EMPTY_VALUE = '';
export default class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: EMPTY_VALUE,
      value: EMPTY_VALUE
    };
  }
  isFilterMatchingName(filter, name) {
    return name.toLowerCase().includes(filter.toLowerCase().trim());
  }
  getFilteredItems() {
    return this.props.items.filter(name =>
      this.isFilterMatchingName(this.state.filter, name)
    );
  }
  getFirstMatchingItem(filter) {
    const item = this.props.items.find(name =>
      this.isFilterMatchingName(filter, name)
    );
    return item || EMPTY_VALUE;
  }
  onChange = event => {
    const filter = event.target.value;
    const value = this.getFirstMatchingItem(filter);
    this.setState({
      filter,
      value
    });
  };
  onSelect = (event, name) => {
    event.preventDefault();
    this.setState({
      value: EMPTY_VALUE,
      filter: EMPTY_VALUE
    });
    this.props.onSelect(name);
  };
  onPreSelect = (event, name) => {
    event.preventDefault();
    this.setState({
      value: name
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.onSelect(this.state.value);
  };
  shortcutsHandler = action => {
    const { value } = this.state;
    switch (action) {
      case 'PRE_SELECT_NEXT':
        this.preSelectItem(this.getNextItemTo(value));
        return;
      case 'PRE_SELECT_PREV':
        this.preSelectItem(this.getPreviousItemTo(value));
        return;
      case 'SELECT':
        this.props.onSelect(this.state.value);
        return;
      case 'CLOSE':
        this.props.onClose();
        return;
      default:
        return;
    }
  };
  preSelectItem(name) {
    this.setState({
      value: name || EMPTY_VALUE
    });
  }
  getPreviousItemTo(name) {
    const index = this.props.items.indexOf(name);
    if (index === -1) {
      return this.props.items[this.props.items.length - 1];
    }
    const potentialPreviousIndex = index - 1;
    const previousIndex =
      potentialPreviousIndex >= 0
        ? potentialPreviousIndex
        : this.props.items.length - 1;
    return this.props.items[previousIndex];
  }
  getNextItemTo(name) {
    const index = this.props.items.indexOf(name);
    if (index === -1) {
      return this.props.items[0];
    }
    const potentialNextIndex = index + 1;
    const nextIndex =
      potentialNextIndex < this.props.items.length ? potentialNextIndex : 0;
    return this.props.items[nextIndex];
  }
  isPreSelected(name) {
    return name === this.state.value;
  }
  renderListItem = name => {
    return (
      <li
        data-test="item"
        key={name}
        className={styles.item}
        onMouseEnter={event => this.onPreSelect(event, name)}
      >
        <button
          className={classnames(
            styles.button,
            this.isPreSelected(name) && styles.presSlectedButton
          )}
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
      <Shortcuts
        name="Select"
        handler={this.shortcutsHandler}
        className={classnames(styles.select, this.props.className)}
      >
        <form className={styles.form} onSubmit={this.onSubmit}>
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
      </Shortcuts>
    );
  }
}

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string
};

Select.defaultProps = {
  items: [],
  onSelect: () => {},
  onClose: () => {}
};
