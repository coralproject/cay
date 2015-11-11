import React from 'react';
import Radium from 'radium';

@Radium
export default class Avatar extends React.Component {
  render() {
    return (
      <img style={styles} src={this.props.src} />
    );
  }
}

var styles = {
  width: 40,
  height: 40,
  borderRadius: 20
};
