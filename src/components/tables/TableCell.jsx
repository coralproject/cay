import React from 'react';
import Radium from 'radium';

@Radium
export default class TableCell extends React.Component {

  render() {
    return (
      <td style={[ styles.base, this.props.style ]}>
        { this.props.children }
      </td>
    );
  }
}

const styles = {
  base: {
    textAlign: 'left',
    height: '40px',
    lineHeight: '40px',
    padding: '0 10px',
    verticalAlign: 'top'
  }
};
