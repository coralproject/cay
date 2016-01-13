import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import {fetchComments} from '../actions';

import Page from './Page';
import Card from '../components/cards/Card';

require('../../css/react-select.css');

@connect(state => state.data)
@Radium
class Dashboard extends React.Component {

  getComments() {
    this.props.dispatch(fetchComments());
  }

  render() {


    return (
      <Page>
        <h1>Dashboard goes here</h1>
        <div style={styles.base}>
          <Card style={styles.pane}>
            <p>Such wow</p>
          </Card>
          <Card style={styles.pane}>
            <p>Nothin</p>
          </Card>
        </div>
      </Page>
    );
  }
}

// same as the @connect decorator above
export default Dashboard;

var styles = {
  base: {
    display: 'flex'
  },
  pane: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    padding: 10
  }
};
