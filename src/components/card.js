import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

@Radium
export default class Card extends React.Component {
  render() {
    return (
      <div style={[styles.base, this.props.style]}>{this.props.children}</div>
    );
  }
}

var styles = {
  base: {
    borderWidth: 1,
    borderColor: settings.borderColorBase,
    borderTopWidth: 3,
    borderStyle: 'solid',
    backgroundColor: 'white',
    borderRadius: 3
  }
};
