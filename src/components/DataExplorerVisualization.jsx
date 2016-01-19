import React from 'react';
import Radium from 'radium';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryScatter } from 'victory';
import d3 from 'd3';

@Radium
class DataExplorerVisualization extends React.Component {

  getBarVictoryComponent() {
    return (
      <VictoryBar
        style={{data:
          {width: 1, fill: 'orange'}
        }}
        data={this.props.dataset}/>
    );
  }

  getLineVictoryComponent() {
    return (
      <VictoryLine
        padding={75}
        data={this.props.dataset}
        interpolation='monotone'
        style={{
          data: {
            strokeWidth: 1,
            ':hover': {stroke: '#c33b33'}
          },
          labels: {fontSize: 12}
        }}/>
    );
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
          right: 70
        }}
        scale={{x: d3.time.scale(), y: d3.scale.linear()}}
        domainPadding={{x: 20}}>
        <VictoryAxis
          style={{
            axis: {stroke: 'gray'},
            ticks: {stroke: 'gray'},
            tickLabels: {
              fontSize: 10
            },
            axisLabels: {
              fontsize: 16
            }
          }}
          tickCount={10}
          label={this.props.independentVariableName} />
        <VictoryAxis dependentAxis
          label={this.props.dependentVariableName}
          style={{
            axis: {stroke: 'gray'},
            ticks: {stroke: 'transparent'}
          }}/>
        {this.getLineVictoryComponent()}
      </VictoryChart>
      </div>
    );
  }
}

export default DataExplorerVisualization;


      // <svg
      //   height={600}
      //   width={800}>
      //   <VictoryAxis
      //     style={{
      //       axis: {stroke: "gray"},
      //       ticks: {stroke: "transparent"},
      //       tickLabels: {
      //         fontSize: 6,
      //         transform: `rotate(45deg) translate(10px, 0px)`,
      //       },
      //       axisLabels: {
      //         fontsize: 16,
      //       }
      //     }}
      //     tickCount={10}
      //     tickFormat={(x) => x.getFullYear()}
      //     scale={d3.time.scale()}
      //     label={this.props.independentVariableName} />
      //   <VictoryAxis dependentAxis
      //     label={this.props.dependentVariableName}/>
      //   {this.getLineVictoryComponent()}
      // </svg>
