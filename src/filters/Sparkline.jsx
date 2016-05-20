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
  render() {
    const styles = this.getStyles();

    return (
      <VictoryLine
        domain={[0, 20]}
        padding={{
          right: 40,
          top: 0
        }}
        height={30}
        width={200}
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
    );
  }
}

export default Sparkline;
