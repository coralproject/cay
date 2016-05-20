import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
// import Flex from './layout/Flex';
import { connect } from 'react-redux';
// import { FOO } from '../actions';
import {VictoryLine, VictoryScatter, VictoryAxis} from 'victory-chart';

// const style = {
// };

@connect(state => state.filters)
@Radium
class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: 'bar'
  }
  getStyles() {
    return {
      base: {

      }
    };
  }
  getLastIdInDistributionArray() {
    const last = _.last(this.props.distribution);
    return last._id;
  }
  getLabelFill(d) {
    let fill = 'none';
    if (d.x === 1 || d.x === 2 || d.x === 3 || d.x === 5 || d.x === 20) {
      fill = 'rgb(255,0,0)';
    }
    if (d.x < 100) {
      if (d.x % 50 === 0) fill = 'rgb(255,0,0)';
    } else if (d.x < 1000) {
      if (d.x % 100 === 0) fill = 'rgb(255,0,0)';
    } else {
      if (d.x % 3000 === 0) fill = 'rgb(255,0,0)';
    }

    return fill;
  }
  render() {
    console.log(this.props)
    const styles = this.getStyles();

    return (
      <svg
        width={300}
        height={100}>
        <VictoryLine
          padding={{
            right: 20,
            left: 20,
            top: 20,
            bottom: 55
          }}
          scale={{x: 'log', y: 'linear'}}
          height={100}
          width={300}
          data={
            this.props.distribution.map((bucket, i) => {
              return {
                x: i,
                y: bucket.total
              };
            })
          }
          interpolation='linear'
          style={{
            parent: {
              position: 'relative',
              top: -2
            },
            data: {
              stroke: 'rgb(200,200,200)',
              strokeWidth: 1
            },
            labels: {fontSize: 12}
          }}
        />
        <VictoryScatter
          width={300}
          height={100}
          scale={{x: 'log', y: 'linear'}}
          standalone={false}
          padding={{
            right: 20,
            left: 20,
            top: 20,
            bottom: 55,
          }}
          style={{
            data: {
              fill: this.getLabelFill.bind(this),
              stroke: 'none',
              strokeWidth: 2
            },
            labels: {
              fill: this.getLabelFill.bind(this),
              fontSize: 8,
              padding: 2,
              angle: (d) => d.y > 99 ? 320 : 1
            }
          }}
          size={2}
          labels={
            this.props.distribution.map((bucket, i) => {
              return bucket.total
            })
          }
          data={
            this.props.distribution.map((bucket, i) => {
              return {
                x: i,
                y: bucket.total
              };
            })
          }
        />
        <VictoryAxis
          padding={{
            right: 20,
            left: 20,
            top: 10,
            bottom: 50,
          }}
          width={300}
          height={100}
          scale={'log'}
          domain={[1, this.getLastIdInDistributionArray()]}
          label={this.props.description}
          standalone={false}
          tickFormat={[1,3,5,10,100,1000, this.getLastIdInDistributionArray()]}
          tickValues={[1,3,5,10,100,1000, this.getLastIdInDistributionArray()]}
          style={{
            axis: {
              stroke: 'rgb(160,160,160)',
              strokeWidth: 1
            },
            ticks: {
              stroke: 'rgb(160,160,160)',
              strokeWidth: 1,
              size: 2
            },
            tickLabels: {
              fontSize: 10,
              angle: (d) => d > 99 ? 320 : 1
            },
            axisLabel: {
              fontSize: 12,
              paddingTop: 20
            }
          }}/>
      </svg>
    );
  }
}

export default Sparkline;
