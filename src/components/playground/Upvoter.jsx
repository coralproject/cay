import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Icon from '../../components/Icon';

@connect(state => state.playground)
@Radium
class Upvoter extends React.Component {

  render() {

    return (
      <div style={ styles.upvoter }>
        <Icon style={ styles.icon } name="fa-caret-up" size="large" />
        <div style={ styles.number }>33</div>
        <Icon style={ styles.icon } name="fa-caret-down" size="large" />
      </div>
    );

  }
}

// same as the @connect decorator above
export default Upvoter;

var styles = {
  upvoter: {
    position: 'absolute',
    cursor: 'pointer',
    width: '80px',
    top: '0',
    right: '0',
    textAlign: 'center'
  },
  number: {
    fontSize: '14pt',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '0 10px'
  },
  icon: {
    width: '40px'
  }
};
