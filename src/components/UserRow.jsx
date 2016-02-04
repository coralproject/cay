import React, {PropTypes} from 'react';
import Radium from 'radium';

import {connect} from 'react-redux';

import ListItem from './lists/ListItem';

@connect(state => state.pipelines)
@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <ListItem
        style={[this.props.style, styles.base]}
        onClick={this.handleClick.bind(this)} >

          {this.props.user.user_name}

          <p style={styles.sub}>
            Rating | Test Score | Comments
          </p>

      </ListItem>
    );
  }
}

const styles = {
  base: {
    cursor: 'pointer'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  }
};
