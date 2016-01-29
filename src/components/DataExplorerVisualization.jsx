import React from 'react';
import Radium from 'radium';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryScatter } from 'victory';
import d3 from 'd3';
import _ from 'lodash';

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
      but this is hard at this point (1/26) because we don't know what the possibilities are.
      for the 1/28 deadline, it will not be very abstract, checking pipeline names and such
    */

    let visualization;
    let parsedDataset;
    let independentVariableName;
    let dependentVariableName;

    /* start by checking if it's time series and needs multiple lines / bars */
    if (this.props.dataset[0].start && _.isObject(this.props.dataset[0].data[this.props.field])) {

      /* zis is ze complicated one - we have multiple data we're plotting - may change... */

      /* first we extract the keys we're going to be creating lines for */
      const keysFromField = _.keys(this.props.dataset[0].data[this.props.field]);

      /* then we iterate over the dataset for each key, using that key as an accessor to the dataset */
      visualization = keysFromField.map((key) => {
        return this.getLineVictoryComponent(this.props.dataset.map((item) => {
          return {
            x: new Date(item.start * 1000),
            y: item.data[this.props.field][key]
          };
        }), key);
      });

    } else if /* detect time series */ (this.props.dataset[0].start) {
      parsedDataset = this.props.dataset.map((item) => {
        return {
          x: new Date(item.start * 1000),
          y: item.data[this.props.field]
        };
      });

      visualization = this.getLineVictoryComponent(parsedDataset);
    } else /*  default assume catagorical  */ {
      console.log('assuming categorical data because of lack of timestamp');
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

  getLineVictoryComponent(dataset, label) {
    const rand = Math.floor(Math.random() * 100);
    return (
      <VictoryLine
        padding={75}
        data={dataset}
        interpolation='monotone'
        label={label}
        style={{
          data: {
            strokeWidth: 3,
            stroke: `rgba(${rand * 2}, ${rand * 2}, ${rand * 4}, .5)`,
            ':hover': {
              stroke: `rgba(${rand * 2}, ${rand * 2}, ${rand * 4}, .5)`
            }
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
            label={this.props.dataset[0].duration ? this.props.dataset[0].duration : "" /* naive, assumes time series */} />
          <VictoryAxis dependentAxis
            label={this.props.field ? this.props.field.replace(/_/g, ' ') : ''}
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

