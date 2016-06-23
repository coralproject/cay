import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import {VictoryLine, VictoryScatter, VictoryAxis} from 'victory-chart';

@Radium
class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    style: React.PropTypes.object
  }
  static defaultProps = {
  }

  shouldComponentUpdate(){
    return false;
  }
  getLastIdInDistributionArray() {
    const last = _.last(this.props.distribution);
    return last._id;
  }
  getDotFill(d) {
    let fill = 'transparent';

    if (d.x === 1 || d.y === this.props.distributionMax.total || d.x === this.props.distribution.length - 1) {
      fill = 'rgb(130,130,130)';
    }

    return fill;
  }
  getLabelFill(d) {
    let fill = 'none';
    if (d.x === 1 || d.y === this.props.distributionMax.total || d.x === this.props.distribution.length - 1) {
      fill = 'black';
    }

    return fill;
  }
  render() {
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
            bottom: 55
          }}
          style={{
            data: {
              fill: this.getDotFill.bind(this),
              stroke: 'none',
              strokeWidth: 2
            },
            labels: {
              fill: this.getLabelFill.bind(this),
              fontSize: 8
            }
          }}
          size={2}
          labels={
            this.props.distribution.map(bucket => {
              return bucket.total;
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
          events={[{
            target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [{
                    target: "labels",
                    mutation: (props) => {
                      return {
                          style:
                          Object.assign({}, props.style, {
                            stroke: "rgb(130,130,130)"
                          })
                        };
                    }
                  }];
                },
                onMouseOut: () => {
                  return [{
                    target: "labels",
                    mutation: (props) => {
                      return {
                          style:
                          Object.assign({}, props.style, {
                            stroke: "none",
                          })
                        };
                    }
                  }];
                }
              }
            }
          ]}
        />
        <VictoryAxis
          padding={{
            right: 20,
            left: 20,
            top: 10,
            bottom: 50
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
