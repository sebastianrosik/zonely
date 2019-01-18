import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FormattedDate from '../FormattedDate';
import styles from './List.css';

export default class List extends PureComponent {
  onRemove = (event, name) => {
    event.preventDefault();
    this.props.onRemove(name);
  };
  onEdit = (event, name) => {
    event.preventDefault();
    this.props.onEdit(name);
  };
  renderListItem = item => {
    return (
      <li
        className={styles.item}
        key={item.name}
        data-test="item"
        onClick={event => this.onEdit(event, item.name)}
      >
        <span className={styles.name}>{item.name}</span>
        <FormattedDate className={styles.date} date={item} />
      </li>
    );
  };
  render() {
    return (
      <ul className={classnames(styles.list, this.props.className)}>
        {this.props.items.map(this.renderListItem)}
      </ul>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ),
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  className: PropTypes.string
};

List.defaultProps = {
  items: [],
  onRemove: () => {},
  onEdit: () => {}
};
