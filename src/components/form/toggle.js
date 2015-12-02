import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Toggle extends React.Component {
  render() {
    return (
      <div style={[style, this.props.style]}>Toggle</div>
    );
  }
}

const style = {

};
