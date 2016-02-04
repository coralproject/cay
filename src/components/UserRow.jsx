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

    const {user} = this.props;

    return (
      <ListItem
        style={[this.props.style, styles.base]}
        onClick={this.handleClick.bind(this)} >

          {user.user_name}

          <p style={styles.sub}>
            Rating | accept ratio {user.stats.accept_ratio} | Comments {user.stats.comments.total}
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
