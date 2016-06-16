import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchQueryset, fetchSearch} from 'search/SearchActions';
import {xenia} from 'app/AppActions';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import { clearUserList } from 'search/SearchActions';

const mapStateToProps = state => {
  return {
    searches: state.searches,
    users: state.users,
    comments: state.comments
  };
};

@connect(mapStateToProps)
@Radium
export default class SearchDetail extends React.Component {

  constructor (props) {
    super(props);
    this.state = {usersFetchedOnce: false};
  }

  componentWillMount() {
    this.props.dispatch(clearUserList());
    console.log('about to look up search', this.props.params.id);
    this.props.dispatch(fetchSearch(this.props.params.id));
    // this.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.usersFetchedOnce && nextProps.searches.activeSavedSearch) {
      this.setState({usersFetchedOnce: true});
      this.props.dispatch(fetchQueryset(nextProps.searches.activeSavedSearch.query));
    }
  }

  onPagination(page = 0) {
    this.props.dispatch(fetchQueryset(this.props.searches.activeSavedSearch.query, page));
  }

  render() {

    const search = this.props.searches.activeSavedSearch;

    return (
      <Page>
        {
          this.props.searches.loadingSavedSearch ?
            <p>Loading Saved Search...</p> :
            null
        }
        {
          search ?
          <div>
            <ContentHeader title={search.name}/>
            <p style={styles.description}>Description: {search.description}</p>
            <div style={styles.base}>
              <UserList
                total={this.props.searches.userCount}
                onPagination={this.onPagination.bind(this)}
                loadingQueryset={this.state.loading}
                style={styles.userList}
                users={this.props.searches.users} />
            </div>
          </div> :
          null
        }

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
