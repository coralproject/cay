import React from 'react';
import Radium from 'radium';

@Radium
export default class Avatar extends React.Component {
  render() {
    return (
      <img style={[this.props.style, styles]} src={this.props.src} />
    );
  }
}

var styles = {
  width: 38,
  height: 38,
  borderRadius: 20,
  border: '1px solid rgba(0, 0, 0, .08)'
};
