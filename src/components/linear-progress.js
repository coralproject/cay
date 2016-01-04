import React, {PropTypes} from 'react';
import Radium from 'radium';

import tweenState from 'react-tween-state';

import settings from '../settings';

// TODO: make this progress bar work from right to left

@Radium
export default class LinearProgress extends React.Component {

  constructor(props) {
    super(props);

    setTimeout(function () {
      this.setState(_.extend(this.state, {value: 0.75}));
    }.bind(this), 1000);
  }

  static propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    mode: React.PropTypes.oneOf(["determinate", "indeterminate"]),
    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number
  }
  static defaultProps = {
    min: 0,
    max: 1,
    value: 0.5,
    mode: 'indeterminate'
  };

  getBarStyles() {

    // clamp value
    const clampedVal = Math.min(Math.max(this.props.min, this.props.value), this.props.max);
    const percent = (clampedVal - this.props.min) / (this.props.max - this.props.min) * 100;

    return {
      borderRadius: 2,
      height: '100%',
      position: 'relative',
      backgroundColor: settings.primaryColor,
      width: percent + '%'
    };
  }

  render() {
    return (
      <div style={[
        styles.base,
        this.props.size === 'xs' && styles.xs,
        this.props.size === 'small' && styles.small,
        this.props.size === 'large' && styles.large,
        this.props.styles
      ]}>
        <div style={this.getBarStyles()}></div>
      </div>
    );
  }
}

const styles = {
  base: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#f5f5f5',
    position: 'relative'
  }
}
