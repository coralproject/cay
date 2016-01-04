import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Slider extends React.Component {
  render() {
    return (
      <div style={[styles.base, this.props.style]}>Slider</div>
    );
  }
}

const styles = {
  base: {

  }
};
