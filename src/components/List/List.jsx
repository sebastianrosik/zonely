import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class List extends PureComponent {
  renderElement(props) {
    return (
      <li key={props.name}>
        {props.name}, {props.date}
      </li>
    );
  }
  render() {
    return <ul>{this.props.items.map(this.renderElement)}</ul>;
  }
}

List.propTypes = {
  items: PropTypes.array
};

List.defaultProps = {
  items: []
};
