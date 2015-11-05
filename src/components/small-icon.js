import React from 'react';
import Radium from 'radium';

@Radium
class SmallIcon extends React.Component {
  render() {
    return (
      <i style={styles}>\fa27e</i>
    );
  }
}

var styles = {
  font: 'normal normal normal 14px/1 FontAwesome',
  width: '1.28571429em',
  textAlign: 'center'
};

export default SmallIcon;
