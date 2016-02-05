import React from 'react';
import Radium from 'radium';

import TableRow from './TableRow';

@Radium
export default class TableBody extends React.Component {

  renderChildren() {
    return React.Children.map(this.props.children, function (child) {
      if (child.type === TableRow)
        return React.cloneElement(child, {
          multiSelect: this.props.multiSelect,
          hasActions: this.props.hasActions
        });
      else
        return child;
    }.bind(this));
  }

  render() {
    return (
      <tbody style={[ styles.base, this.props.style ]}>
        { this.renderChildren() }
      </tbody>
    );
  }
}

const styles = {
  base: {
  },
  checkBoxColumn: {
    padding: '0 10px',
    textAlign: 'center',
    width: '40px'
  }
};
