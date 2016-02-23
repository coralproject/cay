import React from 'react';
import Radium from 'radium';

import TableHeader from './TableHeader';

@Radium
export default class TableHead extends React.Component {
  render() {
    return (
      <thead style={[ styles.base, this.props.style ]}>
        <tr>
          {
            this.props.multiSelect ?
              <TableHeader style={ styles.checkBoxHeader }><input type="checkbox" /></TableHeader>
            : null
          }

          { this.props.children }

          {
            this.props.hasActions ?
              <TableHeader style={ styles.actionsHeader }>...</TableHeader>
            : null
          }
        </tr>
      </thead>
    );
  }
}

const styles = {
  base: {
  },
  checkBoxHeader: {
    padding: '0 10px',
    textAlign: 'center',
    width: '40px'
  },
  actionsHeader: {
    padding: '0 10px',
    textAlign: 'center',
    width: '40px'
  }
};
