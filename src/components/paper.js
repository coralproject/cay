import React from 'react';
import Radim from 'radium';

export default class Paper extends React.Component {
  render() {
    return (
      <div style={styles}>{this.props.children}</div>
    );
  }
}

const styles = {
  padding: 10
};
