import React, {PropTypes} from 'react';
import Radium from 'radium';
import color from 'color';
import settings from '../settings';

import FaSpinner from 'react-icons/lib/fa/spinner';

@Radium
class Spinner extends React.Component {
  render() {
    const { style, ...rest } = this.props;
    return (
      <span style={[styles.spinner, style]} { ...rest }>
        <FaSpinner />
      </span>
    );
  }
}

const styles = {
  spinner: {
    display: 'inline-block',
    animationName: 'spin',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  },
};

export default Spinner;
