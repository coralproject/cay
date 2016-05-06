import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';

@Radium
class CoralIcon extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  getColorProps(color, isInverse) {

    if (isInverse) {
      return { backgroundColor: color, color: 'white' };
    } else {
      return { color: color };
    }
  }

  render() {
    var g = _.find(icons, {name: this.props.name}).glyph || icons[0].glyph;;
    return (
      <span style={[
        this.props.style,
        styles.base,
        this.props.size === 'small' && styles.small,
        this.props.size === 'medium' && styles.medium,
        this.props.size === 'large' && styles.large,
        this.getColorProps(this.props.color, this.props.inverse)
      ]}>{g}</span>
    );
  }
}

const styles = {
  base: {
    display: 'inline-block',
    font: 'normal normal normal 14px/1 coral-icon-font',
    textAlign: 'center',
  },
  small: {
    font: 'normal normal normal 14px/1 coral-icon-font',
  },
  medium: {
    font: 'normal normal normal 20px/1 coral-icon-font',
  },
  large: {
    font: 'normal normal normal 36px/1 coral-icon-font',
  },
  leftIcon: {
    paddingLeft: 20
  }
};

// Hex 61 = 'a', 62 = 'b', etc.
var icons = [
  { name: "badge", glyph: "\u0061" },
  { name: "medal", glyph: "\u0062" },
  { name: "trophy", glyph: "\u0063" },
];

export default CoralIcon;
