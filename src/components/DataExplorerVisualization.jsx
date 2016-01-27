import React from 'react';
import Radium from 'radium';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryScatter } from 'victory';
import d3 from 'd3';

@Radium
class DataExplorerVisualization extends React.Component {


  parseTopCommentersByCount() {
    const victoryFormat = this.props.dataset.map((item) => {
      return {
        x: item._id.user_id + '' , // hack - cast to string for now for graph spacing
        y: item.comments
      };
    });
    return victoryFormat;
  }

  contemplate() {

    /*
      at this point we know we have data, but we don't know what's in it.
      expect this function to grow as the possibilities do...
      we'll continually refactor this out to make it more general
      but this is hard at this point (1/26) because we don't know what the possibilities are
      for the 1/28 deadline, it will not be very abstract, checking pipeline names and such
    */

    let visualization;
    let parsedDataset;
    let independentVariableName;
    let dependentVariableName;

    /* detect time series */
    if (this.props.dataset[0].start) {
      parsedDataset = this.props.dataset.map((item, i) => {
        return {
          x: new Date(item.start * 1000),
          y: item.data[this.props.field]
        };
      });

      dependentVariableName = this.state.data_object_level_1_key_selection ?
        this.props.field.replace(/_/g, ' ') : "";

      independentVariableName = ""; /* time is self labeling */

      visualization = this.getLineVictoryComponent(parsedDataset)
    } else /*  assume catagorical  */ {
      console.log("assuming categorical data because of lack of timestamp")
    }

    return visualization;

  }

  getBarVictoryComponent() {
    return (
      <VictoryBar
        style={{data:
          {width: 1, fill: 'orange'}
        }}
        data={this.props.dataset}/>
    );
  }

  getLineVictoryComponent(dataset) {
    return (
      <VictoryLine
        padding={75}
        data={dataset}
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
        {this.contemplate()}
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
