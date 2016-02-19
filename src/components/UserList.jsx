import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import {userSelected} from '../actions';

import List from './lists/List';
import UserRow from './UserRow';
import Heading from './Heading';

import { Lang } from '../lang';

@connect(state => state.pipelines)
@Lang
@Radium
export default class UserList extends React.Component {

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      user_name: PropTypes.string.isRequired,
      _id: PropTypes.string.idRequired
    }).isRequired).isRequired
  }

  getUser(user) {
    console.log('userSelected', user);
    this.props.dispatch(userSelected(user));
  }

  getUserList(users) {

    return users.map((user, i) => {
      return (
        <UserRow {...this.props}
          user={user}
          onClick={this.getUser.bind(this)}
          style={styles.row}
          key={i} />
      );
    });
  }

  render() {
    return (
      <List style={[styles.base, this.props.style]}>
        <Heading size="small" style={styles.heading}>
          { L.t("User List") }
        </Heading>
        {this.props.users.length ? this.getUserList(this.props.users) : 'Loading...'}
      </List>
    );
  }
}

const styles = {
  base: {

  },
  heading: {
    paddingLeft: 10
  },
  row: {

  }
};
