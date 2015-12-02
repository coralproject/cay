import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class InfiniteList extends React.Component {
  render() {
    return (
      <div style={[style, this.props.style]}>{this.props.children}</div>
    );
  }
}

var style = {

};
