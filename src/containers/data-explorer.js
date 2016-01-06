import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

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
    const parsedData = this.props.dataset.map((item) => {
      console.log(item)
      return {
        id: item._id.user_id,
        comments: item.comments
      }
    })
    return parsedData;
  }

  createVisualization() {
    return (
        <VictoryChart
          height={500}
          padding={{
            top: 75,
            bottom: 40,
            left: 70,
            right: 40
          }}
          domainPadding={{x: 20}}>
          <VictoryAxis
            label="commenter" />
          <VictoryAxis dependentAxis
            label="# of comments"
            tickValues={[0, 1.5, 3, 4.5]}
            style={{
              grid: {
                stroke: "grey",
                strokeWidth: 1
              },
              axis: {stroke: "black"},
              ticks: {stroke: "transparent"}
            }}/>
          <VictoryBar
            style={{data:
              {width: 15, fill: "orange"}
            }}
            data={this.parseDataFromXenia()}/>
        </VictoryChart>
    )
  }

  render() {

    console.log('dataset?', this.props.dataset);

    return (
      <Page>
        <h1>Data Explorer</h1>
        {this.props.dataset ? this.createVisualization.call(this) : "no data"}
      </Page>
    );
  }
}

export default DataExplorer;

const styles = {
  background: settings.coralPink
};
