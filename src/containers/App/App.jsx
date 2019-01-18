import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortcutManager from '../../shortcutManager';

import List from '../../components/List';
import Select from '../../components/Select';
import TimeZone from '../../lib/TimeZone';
import { addTimeZone, removeTimeZone } from '../../actions/timeZones';
import { updateClock, shiftWorldTime } from '../../actions/clock';
import {
  openTimeZoneSelect,
  closeTimeZoneSelect,
  openTimeZoneEdit,
  closeTimeZoneEdit
} from '../../actions/ui';

import styles from './App.css';
import Button from '../../components/Button';
import * as labels from '../../labels';
import Modal from '../../components/Modal';
import TimeZoneEditor from '../../components/TimeZoneEditor';
import {
  getEditedTimeZoneOffsettedHours,
  getEditedTimeZoneOffsettedMinutes,
  getEditedTimeZoneName
} from '../../selectors';

const allTimeZones = TimeZone.getNames();
const FULL_SECOND = 1000;

export class App extends Component {
  onSelectTimeZone = name => {
    this.props.addTimeZone(name);
    this.props.closeTimeZoneSelect();
  };
  onAddTimeZone = () => {
    this.props.openTimeZoneSelect();
  };
  onSelectTimeZoneClose = () => {
    this.props.closeTimeZoneSelect();
  };
  onRemoveTimeZone = name => {
    this.props.removeTimeZone(name);
  };
  onEditTimeZoneOpen = name => {
    this.props.openTimeZoneEdit(name);
  };
  onEditTimeZoneClose = () => {
    this.props.closeTimeZoneEdit();
  };
  onEditTimeZoneSubmit = ({ name, hours, minutes }) => {
    this.props.shiftWorldTime({ name, hours, minutes });
    this.props.closeTimeZoneEdit();
  };
  componentDidMount() {
    this.intervalToken = setInterval(this.props.updateClock, FULL_SECOND);
  }
  componentWillUnmount() {
    clearInterval(this.intervalToken);
  }
  getChildContext() {
    return { shortcuts: shortcutManager };
  }
  render() {
    return (
      <div className={styles.app}>
        <section className={styles.content}>
          <header className={styles.header}>TIMELY</header>
          <List
            className={styles.list}
            items={this.props.timeZones}
            onRemove={this.onRemoveTimeZone}
            onEdit={this.onEditTimeZoneOpen}
          />
          <footer className={styles.footer}>
            <Button onClick={this.onAddTimeZone}>{labels.addTimeZone()}</Button>
          </footer>
          <Modal
            open={this.props.ui.isSelectModalOpen}
            onClose={this.onSelectTimeZoneClose}
            title={labels.selectTimeZone()}
          >
            <Select
              className={styles.select}
              items={allTimeZones}
              onClose={this.onSelectTimeZoneClose}
              onSelect={this.onSelectTimeZone}
            />
          </Modal>
          <Modal
            open={this.props.ui.isEditModalOpen}
            onClose={this.onEditTimeZoneClose}
            title={
              this.props.ui.editedTimeZone && this.props.ui.editedTimeZone.name
            }
          >
            <TimeZoneEditor
              onCancel={this.onEditTimeZoneClose}
              onSubmit={this.onEditTimeZoneSubmit}
              name={this.props.editedTimeZoneName}
              hours={this.props.editedTimeZoneHours}
              minutes={this.props.editedTimeZoneMinutes}
            />
          </Modal>
        </section>
      </div>
    );
  }
}

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  timeZones: state.timeZones.list,
  ui: state.ui,
  editedTimeZoneMinutes: getEditedTimeZoneOffsettedMinutes(state),
  editedTimeZoneHours: getEditedTimeZoneOffsettedHours(state),
  editedTimeZoneName: getEditedTimeZoneName(state)
});

const mapDispatchToProps = dispatch => ({
  addTimeZone: name => dispatch(addTimeZone(name)),
  removeTimeZone: name => dispatch(removeTimeZone(name)),
  updateClock: () => dispatch(updateClock()),
  openTimeZoneSelect: () => dispatch(openTimeZoneSelect()),
  closeTimeZoneSelect: () => dispatch(closeTimeZoneSelect()),
  openTimeZoneEdit: name => dispatch(openTimeZoneEdit(name)),
  closeTimeZoneEdit: () => dispatch(closeTimeZoneEdit()),
  shiftWorldTime: time => dispatch(shiftWorldTime(time))
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
