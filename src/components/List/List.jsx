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
  renderListItem = item => {
    return (
      <li className={styles.item} key={item.name} data-test="item">
        <span className={styles.name}>{item.name}</span>
        <FormattedDate className={styles.date} date={item} />
        {/* <button
          className={styles.button}
          onClick={event => this.onRemove(event, item.name)}
        >
          Remove
        </button> */}
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
  className: PropTypes.string
};

List.defaultProps = {
  items: [],
  onRemove: () => {}
};
