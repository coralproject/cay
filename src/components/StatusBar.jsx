import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from 'settings';

@Radium
export default class StatusBar extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    visible: PropTypes.bool
  }

  render() {
    return (
      <div style={[
        styles.base,
        styles.loading,
        this.props.visible && styles.visible,
        this.props.style
      ]}>
        <span style={styles.message}>{this.props.children}</span>
        <div style={[
          styles.spinner,
          this.props.loading && styles.spinnerVisible
        ]}>
          <img src="/img/logo_white.png" width="36px" height="36px" />
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: settings.grey,
    padding: 20
  },
  message: {
    fontWeight: 'bold',
    fontSize: '30px',
    color: 'white'
  },
  loading: {
    display: 'none'
  },
  visible: {
    display: 'block'
  },
  spinner: {
    float: 'right',
    animation: 'load 2s infinite ease',
    display: 'none'
  },
  spinnerVisible: {
    display: 'block'
  }
};
