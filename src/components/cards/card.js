import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class Card extends React.Component {
  render() {
    return (
      <div style={[styles.base, this.props.style]}>{this.props.children}</div>
    );
  }
}

const styles = {
  base: {
    borderTop: '3px solid ' + settings.borderColorBase,
    borderRight: '1px solid ' + settings.borderColorBase,
    borderBottom: '1px solid ' + settings.borderColorBase,
    borderLeft: '1px solid ' + settings.borderColorBase,
    backgroundColor: 'white',
    borderRadius: 3
  }
};
