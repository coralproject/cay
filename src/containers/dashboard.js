import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import {fetchComments} from '../actions';

import Page from './page';
import Card from '../components/cards/card';
import DropDownMenu from '../components/forms/drop-down-menu';
// import Slider from '../components/slider';
import Slider from '../components/slider';

@connect(state => state.data)
@Radium
class Dashboard extends React.Component {

  getComments() {
    this.props.dispatch(fetchComments());
  }

  render() {

    const menuItems = [
      {payload: 'H', text: 'Hydrogen'},
      {payload: 'He', text: 'Helium'},
      {payload: 'Li', text: 'Lithium'},
      {payload: 'Be', text: 'Beryllium'},
      {payload: 'B', text: 'Boron'}
    ];

    return (
      <Page>
        <h1>Dashboard goes here</h1>
        <div style={styles.base}>
          <Card style={[styles.pane, {flex: 2}]}>
            <p>Here is a sweet slider</p>
            <Slider defaultValue={50} orientation="horizontal" withBars={true} />
            <p>another slider with two values</p>
            {/*<ReactSlider defaultValue={[20, 80]} orientation="horizontal" withBars />*/}
          </Card>
          <Card style={styles.pane}>
            <DropDownMenu menuItems={menuItems} />
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
