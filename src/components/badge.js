import React, {PropTypes} from 'react';
import Radium from 'radium';

class Badge extends React.Component {
  render() {
    return (
      <i style={[
        this.props.style,
        styles.base
      ]}>{this.props.count}</i>
    );
  }
}

Badge.propTypes = {

};

const styles = {
  base: {
    backgroundColor: '#aaa',
    padding: '5px',
    color: 'white',
    borderRadius: 5,
    fontSize: '8px'
  }
};

export default Radium(Badge);
