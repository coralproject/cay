import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Tab extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
