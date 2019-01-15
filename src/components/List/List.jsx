import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class List extends PureComponent {
  onRemove = (event, name) => {
    event.preventDefault();
    this.props.onRemove(name);
  };
  renderListItem = item => {
    return (
      <li key={item.name}>
        {item.name}, {item.date.toString()}
        <button onClick={event => this.onRemove(event, item.name)}>
          remove
        </button>
      </li>
    );
  };
  render() {
    return <ul>{this.props.items.map(this.renderListItem)}</ul>;
  }
}

List.propTypes = {
  items: PropTypes.array,
  onRemove: PropTypes.func
};

List.defaultProps = {
  items: [],
  onRemove: () => {}
};
