import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Tab extends React.Component {
  render() {
    return (
      <div style={[
        styles.base,
        this.props.active && styles.active,
        this.props.style
      ]}>{this.props.children}</div>
    );
  }
}

const styles = {
  base: {
    display: 'none'
  },
  active: {
    display: 'block'
  }
}
