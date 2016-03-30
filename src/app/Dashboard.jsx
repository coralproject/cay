import React from 'react';
import Radium from 'radium';

import Page from './Page';
import Card from '../components/cards/Card';

import DatePicker from 'react-datepicker';
import moment from 'moment';

// this doesn't seem wise, but copying the file to /css seems worse.
require('../../node_modules/react-datepicker/dist/react-datepicker.min.css');

@Radium
class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {startDate: moment()};
  }

  handleChange() {
    // console.log('Dashboard.handleChange()', ...arguments);
  }

  render() {

    return (
      <Page>
        <h1>Dashboard goes here</h1>
        <div style={styles.base}>
          <Card style={styles.pane}>
            <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
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
  },
  lonelyIcon: {
    fill: 'red',
    width: 50,
    height: 50
  }
};
