import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class Stat extends React.Component {

  render() {
    return (
      <div style={[styles.base, this.props.style]}>
        <span style={styles.number}>
          {
            typeof this.props.description === "string" ?
              this.props.description.replace("%", "") :
              this.props.description
          }
        </span>
        <span style={styles.title}>{this.props.term}</span>
      </div>
    );
  }
}

const styles = {
  base: {
    marginBottom: 15
  },
  number: {
    marginRight: 10,
    fontWeight: 500,
  },
  title: {

  },
};
