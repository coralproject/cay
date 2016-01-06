import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../settings';

import { fetchDataExplorationDataset } from '../actions';

import Page from './page';

@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchDataExplorationDataset());
  }

  render() {
    return (
      <Page>
        <h1>Data Explorer</h1>
        <p> foo </p>
      </Page>
    );
  }
}

export default DataExplorer;

const styles = {
  background: settings.coralPink
};
