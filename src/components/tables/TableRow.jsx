import React from 'react';
import Radium from 'radium';

import TableCell from './TableCell';

@Radium
export default class TableRow extends React.Component {

  render() {
    return (
      <tr style={[ styles.base, this.props.style ]}>
        {
          this.props.multiSelect ?
            <TableCell style={ styles.checkBoxColumn }><input type="checkbox" /></TableCell>
          : null
        }
        { this.props.children }
      </tr>
    );
  }
}

const styles = {
  base: {
    height: '40px',
    lineHeight: '40px',
    backgroundColor: 'white'
  }
};
