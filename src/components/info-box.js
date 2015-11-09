import React from 'react';
import Radium from 'radium';

@Radium
class InfoBox extends React.Component {
  render() {
    return <div style={styles}>{this.props.name}</div>
  }
}

var styles = {

};

export default InfoBox;
