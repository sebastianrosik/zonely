import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import List from '../../components/List';
import Select from '../../components/Select';
import { getAllTimeZoneNames } from '../../lib/timeZones';
import { addTimeZone, removeTimeZone } from '../../actions/timeZones';

const allTimeZones = getAllTimeZoneNames();

export class App extends Component {
  onAddTimeZone = name => {
    this.props.addTimeZone(name);
  };
  onRemoveTimeZone = name => {
    this.props.removeTimeZone(name);
  };
  render() {
    return (
      <Fragment>
        <List items={this.props.myTimeZones} onRemove={this.onRemoveTimeZone} />
        <Select items={allTimeZones} onSelect={this.onAddTimeZone} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  myTimeZones: state.timeZones
});

const mapDispatchToProps = dispatch => ({
  addTimeZone: name => dispatch(addTimeZone(name)),
  removeTimeZone: name => dispatch(removeTimeZone(name))
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
