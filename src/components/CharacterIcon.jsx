import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';

@Radium
class Icon extends React.Component {

  static propTypes = {
    name: PropTypes.string
  }

  getColorProps(color, isInverse) {

    if (isInverse) {
      return { backgroundColor: color, color: 'white' };
    } else {
      return { color: color };
    }
  }

  render() {
    return (
      <div style={[
        this.props.style,
        styles.base,
        this.props.size === 'small' && styles.small,
        this.props.size === 'medium' && styles.medium,
        this.props.size === 'large' && styles.large,
        this.getColorProps(this.props.color, this.props.inverse || !_.has(this, 'props.name'))
      ]}>{this.props.children}</div>
    );
  }
}

const styles = {
  base: {
    display: 'inline-block',
    font: 'normal normal normal 14px/1 FontAwesome',
    width: '1.28571429em',
    textAlign: 'center'
  },
  small: {
    font: 'normal normal normal 14px/1 FontAwesome',
    height: 28,
    width: 28,
    borderRadius: 14,
    paddingTop: 7
  },
  medium: {
    font: 'normal normal normal 20px/1 FontAwesome',
    height: 32,
    width: 32,
    borderRadius: 16,
    paddingTop: 7
  },
  large: {
    font: 'normal normal normal 36px/1 FontAwesome',
    height: 50,
    width: 50,
    borderRadius: 25,
    paddingTop: 7
  },
  leftIcon: {
    paddingLeft: 20
  }
};

export default Icon;
