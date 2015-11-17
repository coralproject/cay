import React from 'react';
import Radium from 'radium';

import settings from '../settings';

import Avatar from './avatar';

@Radium
export default class UserDetail extends React.Component {
  render() {
    return (
      <div style={[this.props.style, styles.base]}>UserDetail</div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: 'white'
  }
};
