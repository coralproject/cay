import React from 'react';
import Radium from 'radium';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';
import settings from '../settings';


@Radium
class DataExplorerVisualization extends React.Component {

  getVictoryComponentByType() {
    return (
      <VictoryBar
        style={{data:
          {width: 1, fill: "orange"}
        }}
        data={this.props.dataset}/>
    )
  }
  render() {
    return (
      <div>
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
        {this.getVictoryComponentByType()}
      </VictoryChart>
      </div>
    );
  }
}

export default DataExplorerVisualization;
