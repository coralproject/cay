import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Stats extends React.Component {
  render() {
    return (
      <div style={[styles, this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {

};
