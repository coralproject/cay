import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { fetchQueryset, fetchSearch } from 'search/SearchActions';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import { clearUserList } from 'search/SearchActions';

@connect(({ searches, users, comments }) => ({ searches, users, comments }))
@Radium
export default class SearchDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {usersFetchedOnce: false};
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    dispatch(clearUserList());
    dispatch(fetchSearch(params.id));
  }

  componentWillReceiveProps({ searches }) {
    const { usersFetchedOnce } = this.state;
    if (!usersFetchedOnce && searches.activeSavedSearch) {
      this.setState({ usersFetchedOnce: true });
      this.props.dispatch(fetchQueryset(searches.activeSavedSearch.query));
    }
  }

  onPagination(page = 0) {
    const { disaptch, searches } = this.props;
    dispatch(fetchQueryset(searches.activeSavedSearch.query, page));
  }

  render() {
    const { searches } = this.props;
    const search = searches.activeSavedSearch;

    return (
      <Page>
        {searches.loadingSavedSearch ? <p>Loading Saved Search...</p> : null}
        {
          search ?
          <div>
            <ContentHeader title={search.name}/>
            <p style={styles.description(!!search.description)}>
              Description: {search.description}
            </p>
            <div style={styles.base}>
              <UserList
                total={this.props.searches.userCount}
                onPagination={this.onPagination.bind(this)}
                loadingQueryset={this.props.searches.loadingQueryset}
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

/**
 * Module styles
 */

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
  description(exists) {
    return {
      fontSize: 18,
      display: exists ? 'block' : 'none'
    };
  }
};
