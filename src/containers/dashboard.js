import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../settings';

import {fetchComments} from '../actions';

import Page from './page';

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
      </Page>
    );
  }
}

// same as the @connect decorator above
export default Dashboard;

const styles = {
  background: settings.coralPink
};
