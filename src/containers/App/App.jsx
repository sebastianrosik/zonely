import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '../../components/List';
import Select from '../../components/Select';
import TimeZone from '../../lib/TimeZone';
import { addTimeZone, removeTimeZone } from '../../actions/timeZones';
import { updateClock } from '../../actions/clock';
import { openTimeZoneSelect, closeTimeZoneSelect } from '../../actions/ui';

import styles from './App.css';
import Button from '../../components/Button';
import { ADD_TIME_ZONE } from '../../labels';

const allTimeZones = TimeZone.getNames();
const FULL_SECOND = 1000;

export class App extends Component {
  onSelectTimeZone = name => {
    this.props.addTimeZone(name);
  };
  onAddTimeZone = () => {
    this.props.openTimeZoneSelect();
  };
  onSelectClose = () => {
    this.props.closeTimeZoneSelect();
  };
  onRemoveTimeZone = name => {
    this.props.removeTimeZone(name);
  };
  componentDidMount() {
    this.intervalToken = setInterval(this.props.updateClock, FULL_SECOND);
  }
  componentWillUnmount() {
    clearInterval(this.intervalToken);
  }
  render() {
    return (
      <div className={styles.app}>
        <section className={styles.content}>
          <List
            className={styles.list}
            items={this.props.timeZones}
            onRemove={this.onRemoveTimeZone}
          />
          <footer className={styles.footer}>
            <Button label={ADD_TIME_ZONE} onClick={this.onAddTimeZone} />
          </footer>
          <Select
            open={this.props.ui.isSelectOpen}
            className={styles.select}
            items={allTimeZones}
            onSelect={this.onSelectTimeZone}
            onClose={this.onSelectClose}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timeZones: state.timeZones,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  addTimeZone: name => dispatch(addTimeZone(name)),
  removeTimeZone: name => dispatch(removeTimeZone(name)),
  updateClock: () => dispatch(updateClock()),
  openTimeZoneSelect: () => dispatch(openTimeZoneSelect()),
  closeTimeZoneSelect: () => dispatch(closeTimeZoneSelect())
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
