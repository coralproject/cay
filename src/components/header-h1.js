import React from 'react';
import Radium from 'radium';

class HeaderH1 extends React.Component {
  render() {
    return (
      <h1 style={styles}>
        {this.props.title}
        <small>Optional Subhead Description</small>
      </h1>
    );
  }
}

var styles = {
  fontSize: '24px'
}

export default HeaderH1;
