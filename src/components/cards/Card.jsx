import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class Card extends React.Component {
  render() {
    return (
      <div className="card" style={[styles.base, this.props.style]}>{this.props.children}</div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: 'rgb(253,253,253)',
    marginBottom: 14,
    borderRadius: 3,
    padding: 10,
    color: settings.darkGrey,
    WebkitBoxShadow: '3px 3px 6px -1px ' + settings.mediumGrey,
    BoxShadow: '3px 3px 6px -1px ' + settings.mediumGrey
  }
};
