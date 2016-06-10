import React from 'react';
import Radium from 'radium';

@Radium
export default class Badge extends React.Component {
  render() {
    return (
      <i style={[
        styles.base,
        this.props.style
      ]}>{this.props.count}</i>
    );
  }
}

Badge.propTypes = {

};

const styles = {
  base: {
    backgroundColor: '#aaa',
    padding: '2px 6px',
    color: 'white',
    borderRadius: 5,
    fontSize: '8px'
  }
};
