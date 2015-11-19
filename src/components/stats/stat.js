import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Stat extends React.Component {
  render() {
    return (
      <div style={[styles.base, this.props.style]}>
        <dt style={styles.dt}>{this.props.term}</dt>
        <dd style={styles.dd}>{this.props.description}</dd>
      </div>
    );
  }
}

var styles = {
  base: {
    clear: 'both'
  },
  dt: {
    clear: 'both',
    float: 'left'
  },
  dd: {
    float: 'right'
  }
}
