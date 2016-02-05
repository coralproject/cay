import React from 'react';
import Radium from 'radium';

@Radium
export default class TableHeader extends React.Component {

  render() {
    return (
      <th style={[ styles.base, this.props.style ]}>
        { this.props.children }
      </th>
    );
  }
}

const styles = {
  base: {
    textAlign: 'left',
    color: '#999',
    height: '40px',
    lineHeight: '40px',
    padding: '0 10px'
  }
};
