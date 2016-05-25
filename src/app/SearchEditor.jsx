import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import {fetchSearchForEdit, makeQueryFromState} from 'search/SearchActions';
import {userSelected} from 'users/UsersActions';
import {filterChanged} from 'filters/FiltersActions';
import {fetchCommentsByUser} from 'comments/CommentsActions';

import Button from 'components/Button';
import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
// import SearchFilters from 'search/SearchFilters';
import UserFilters from 'filters/UserFilters';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';
import UserList from 'users/UserList';
import UserDetail from 'users/UserDetail';

const mapStateToProps = state => {
  return {
    searches: state.searches,
    filters: state.filters,
    comments: state.comments,
    users: state.users
  };
};

@connect(mapStateToProps)
@Radium
export default class SearchEditor extends React.Component {

  componentWillMount() {
    console.log('params!', this.props.params);
    this.props.dispatch(fetchSearchForEdit(this.props.params.id));
  }

  componentWillUpdate(props) {
    // if the search has been loaded, update filter state?
    if (props.searches.editableSearch && this.props.params.id === props.searches.editableSearch.id) {
      console.log('editableSearch', props.searches.editableSearch);
    }
  }

  confirmSave() {

  }

  onFilterChange(fieldName, attr, val) {
    this.props.dispatch(userSelected(null));
    this.props.dispatch(filterChanged(fieldName, {[attr]: val}));
    this.props.dispatch(makeQueryFromState('user', 0, true));
  }

  onPagination(page = 0) {
    this.props.dispatch(makeQueryFromState('user', page));
  }

  updateUser(user) {
    this.props.dispatch(userSelected(user));
    this.props.dispatch(fetchCommentsByUser(user._id));
  }

  render() {
    return (
      <Page>
        <ContentHeader title={ window.L.t('Search Editor') } />

        {
          this.props.searches.editableSearchLoading && this.props.searches.editableSearch ?
          <p>Loading Saved Search...</p> :
          <div style={styles.base}>
            <div style={styles.filters}>
              <UserFilters onChange={this.onFilterChange.bind(this)} />
            </div>
            <div style={styles.rightPanel}>
              <Button
                onClick={this.confirmSave.bind(this)}
                category="primary"
                style={styles.saveButton}>
                Save Search <FaFloopyO style={styles.saveIcon} />
              </Button>
              <div style={styles.userListContainer}>
                <UserList
                  total={this.props.searches.userCount}
                  onPagination={this.onPagination.bind(this)}
                  loadingQueryset={this.props.searches.loadingQueryset}
                  users={this.props.searches.users} userSelected={this.updateUser.bind(this)} />
                <UserDetail
                  breakdown={this.props.filters.breakdown}
                  specificBreakdown={this.props.filters.specificBreakdown}
                  commentsLoading={this.props.comments.loading}
                  user={this.props.users.selectedUser}
                  comments={this.props.comments.items}
                  style={styles.userDetail} />
              </div>
            </div>
          </div>
        }
      </Page>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    minHeight: 250,
    justifyContent: 'flex-start',
    flexWrap: 'no-wrap'
  },
  userListContainer: {
    margin: 20,
    height: 900,
    display: 'flex',
    clear: 'both'
  },
  userDetail: {
    flex: 2,
    paddingLeft: 40,
    height: 900
  },
  rightPanel: {
    flex: 1
  },
  filters: {
    '@media (max-width: 1000px)': {
      'width': '100%'
    }
  },
  saveIcon: {
    width: 25,
    height: 25
  },
  saveButton: {
    float: 'right'
  }
};
