import React from 'react';
import Radium from 'radium';

@Radium
class Badge extends React.Component {
  render() {
    return (
      <i style={styles}>5</i>
    );
  }
}

let styles = {
  backgroundColor: 'green',
  padding: '5px',
  color: 'white',
  borderRadius: '3px',
  fontSize: '8px'
};

export default Badge;
