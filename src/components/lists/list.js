import React from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class List extends React.Component {
  render() {
    return (
      <div style={[style, this.props.style]}>{this.props.children}</div>
    );
  }
}

const styles = {
  backgroundColor: 'white',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: settings.borderColorBase,
  borderTopWidth: 3
};
