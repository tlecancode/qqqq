import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QueueActions from '../actions/QAction.js';
import Queue from '../components/QPage.js';

export class App extends Component {
  render() {
    const {department, queue, actions} = this.props;
    return (
        <Queue department={department} queue={queue} actions={actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    department: state.queue.department,
    queue: state.queue.queue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QueueActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
