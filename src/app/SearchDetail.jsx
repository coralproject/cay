import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {userSelected} from 'users/UsersActions';
import {fetchQueryset} from 'search/SearchActions';
import {fetchCommentsByUser} from 'comments/CommentsActions';
import {xenia} from 'app/AppActions';
import _ from 'lodash';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import UserDetail from 'users/UserDetail';
import { clearUserList } from 'search/SearchActions';

// const mapStateToProps = state => {
//   return {
//     searches: state.searches,
//     users: state.users,
//     comments: state.comments
//   };
// };

// @connect(mapStateToProps)
@Radium
export default class SearchDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryset: {

      },
      users: [],
      count: 0,
      page: 0,
      loading: false,
      error: null,
      selectedUser: null,
      comments: [],
      sortBy: null
    };
  }

  componentWillMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.setState({loading: true, error: null});
    xenia()
      .exec(this.props.params.name, {
        limit: 20,
        skip: 20 * this.state.page,
        sort: this.state.sortBy
      })
      .then((res) => {
        this.setState({
          queryset: res,
          users: this.state.users.concat(res.results[0].Docs),
          count: res.results[1].Docs[0].count,
          loading: false,
          error: null
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  fetchComments(user) {
    xenia()
      .exec('comments_by_user', {user_id: user._id})
        .then((data) => {
          console.log(data);

          this.setState({
            selectedUser: user,
            comments: data.results[0].Docs
          });
        })
        .catch((err) =>
          console.log(err)
        );
  }

  // updateUser(user) {
  //   this.props.dispatch(userSelected(user));
  //   this.props.dispatch(fetchCommentsByUser(user._id));
  // }

  onPagination() {
    this.setState({page: this.state.page + 1 });
    this.fetchUsers();
  }

  onSortChanged(filter) {
    this.setState({
      sortBy: `statistics.comments.all.all.${filter.field}`,
      page: 0,
      selectedUser: null,
      users: []
    });
    this.fetchUsers();
  }

  render() {
    const {queryset, users, count, selectedUser, comments} = this.state;
    const search = queryset;
    return (

      <Page>
        <ContentHeader title={search.name}/>
        <p style={styles.description}>Description: {search.description}</p>
        <div style={styles.base}>
          <UserList
            onPagination={this.onPagination.bind(this)}
            userSelected={this.fetchComments.bind(this)}
            loadingQueryset={this.state.loading}
            onSortChanged={this.onSortChanged.bind(this)}
            total={count}
            style={styles.userList}
            users={users} />
          <UserDetail
            commentsLoading={false}
            user={selectedUser}
            comments={comments}
            style={styles.userDetail} />
        </div>
      </Page>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  userList: {
    minWidth: 315
  },
  userDetail: {
    flex: 2
  },
  description: {
    fontSize: 18
  }
};
