import React, {PropTypes} from 'react';
import Radium, {Style} from 'radium';

import settings from 'settings';

@Radium
export default class StatusBar extends React.Component {

  static propTypes = {
    loading: PropTypes.bool
  }

  render() {
    return (
      <div style={[
        styles.base,
        styles.loading,
        this.props.loading && styles.loadingActive,
        this.props.style
      ]}>
        <span style={styles.message}>{this.props.children}</span>
        <div style={styles.spinner}>
          <img src="/img/android-icon-36x36.png" />
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
    background: settings.brandColor,
    padding: 20,
    opacity: 0.95
  },
  message: {
    color: 'white'
  },
  loading: {
    display: 'none'
  },
  loadingActive: {
    display: 'block'
  },
  spinner: {
    float: 'right',
    animation: 'load 2s infinite ease'
  }
};
