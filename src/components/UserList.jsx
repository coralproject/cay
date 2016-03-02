import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import {userSelected, fetchCommentsByUser} from '../actions';

import Card from './cards/Card';
import List from './lists/List';
import UserRow from './UserRow';
import Heading from './Heading';
import Spinner from './Spinner';

import { Lang } from '../lang';

@connect(state => state.pipelines)
@Lang
@Radium
export default class UserList extends React.Component {

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.idRequired
    }).isRequired).isRequired
  }

  getUser(user) {
    this.props.dispatch(userSelected(user));
    this.props.dispatch(fetchCommentsByUser(user._id));
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
    <div style={ styles.base }>
      <div style={ styles.columnHeader }>
        <Heading size="medium">
          { window.L.t('Users') }
        </Heading>
      </div>
      {
        this.props.users.length ?
        this.getUserList(this.props.users) :
        <p style={ styles.noUsers }>
          No users loaded yet,<br />
          create a filter on the left to load users.
        </p>
      }
    </div>
    );
  }
}

const styles = {
  base: {
    paddingLeft: '20px',
    minWidth: '300px'
  },
  columnHeader: {
    height: '50px'
  },
  card: {
    margin: 0,
    padding: 0
  },
  row: {
    minWidth: "300px"
  },
  noUsers: {
    fontSize: '12pt',
    color: '#888',
    fontStyle: 'italic',
    paddingRight: 120
  }
};
