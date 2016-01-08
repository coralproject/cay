import React from 'react';
import Radium from 'radium';

class Paper extends React.Component {
  render() {
    return (
      <div style={[styles, this.props.style]}>{this.props.children}</div>
    );
  }
}

export default Radium(Paper);

const styles = {
  padding: 10
};
