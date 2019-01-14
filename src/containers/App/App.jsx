import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import List from '../../components/List';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: []
    };
  }
  render() {
    return (
      <Fragment>
        <List items={this.state.timeZones} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  timeZones: state.timeZones
});

const mapDispatchToProps = dispatch => ({});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
