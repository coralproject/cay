import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

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

const styles = {
  base: {
    fontSize: '.8em',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: '1px solid ' + settings.lighterGrey,
    display: 'flex'
  },
  dt: {
    flex: 1,
    fontWeight: 700
  },
  dd: {
    flex: 1,
    textAlign: 'right'
  }
};
