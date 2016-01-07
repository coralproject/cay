import React from "react";
import { connect } from "react-redux";
import Radium from "radium";
import _ from "lodash";

import settings from '../settings';

import { fetchDataExplorationDataset } from '../actions';

import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';

import Page from './page';

@connect(state => state.dataExplorer)
@Radium
class DataExplorer extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchDataExplorationDataset());
  }

  parseDataFromXenia() {
    const victoryFormat = this.props.dataset.map((item) => {
      return {
        x: item._id.user_id + "" , // hack - cast to string for now for spacing
        y: item.comments
      };
    });
    return victoryFormat;
  }

  createVisualization() {
    return (
      <VictoryChart
        height={600}
        width={800}
        padding={{
          top: 75,
          bottom: 140,
          left: 70,
          right: 40
        }}
        domainPadding={{x: 20}}>
        <VictoryAxis
          style={{
            axis: {stroke: "gray"},
            ticks: {stroke: "gray"},
            tickLabels: {
              fontSize: 10,
              transform: `rotate(45deg) translate(30px, 0px)`,
            },
            axisLabels: {
              fontsize: 16,
              transform: `translate(30px, 0px)`
            }
          }}
          label="commenter id" />
        <VictoryAxis dependentAxis
          label="# of comments"
          style={{
            grid: {
              stroke: "lightgrey",
              strokeWidth: 1
            },
            axis: {stroke: "gray"},
            ticks: {stroke: "transparent"}
          }}/>
        <VictoryBar
          style={{data:
            {width: 1, fill: "orange"}
          }}
          data={this.parseDataFromXenia()}/>
      </VictoryChart>
    );
  }

  render() {
    return (
      <Page>
        <h1>Data Explorer</h1>
          {this.props.dataset ? this.createVisualization.call(this) : "Spinner"}
      </Page>
    );
  }
}

export default DataExplorer;

const styles = {
  background: settings.coralPink
};
