import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import settings from '../settings';

import {fetchComments} from '../actions';

import Page from './page';
import DropDownMenu from '../components/forms/drop-down-menu';

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
        <DropDownMenu menuItems={menuItems} />
      </Page>
    );
  }
}

// same as the @connect decorator above
export default Dashboard;

const styles = {
  background: settings.coralPink
};
