import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import {
  fetchSavedSearchForEdit,
  makeQueryFromState,
  fetchInitialData,
  clearUserList,
  updateSearch
} from 'search/SearchActions';
import {userSelected} from 'users/UsersActions';
import {filterChanged, getFilterRanges} from 'filters/FiltersActions';
import {fetchCommentsByUser} from 'comments/CommentsActions';

import Button from 'components/Button';
import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
// import SearchFilters from 'search/SearchFilters';
import UserFilters from 'filters/UserFilters';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';
import UserList from 'users/UserList';
import TextField from 'components/forms/TextField';
import Clauses from 'search/Clauses';

const mapStateToProps = state => {
  return {
    searches: state.searches,
    filters: state.filters,
    comments: state.comments,
    users: state.users,
    auth: state.auth
  };
};

@connect(mapStateToProps)
@Radium
export default class SearchEditor extends React.Component {

  componentWillMount() {
    const {dispatch, params} = this.props;

/*
    // redirect user to /login if they're not logged in
    if (this.props.app.requireLogin && !this.props.auth.authorized) {
      let {router} = this.context;
      return router.push('/login');
    }
*/
    dispatch(clearUserList());
    dispatch(fetchInitialData());
    dispatch(userSelected(null));
    dispatch(fetchSavedSearchForEdit(params.id));
    dispatch(getFilterRanges(true)); // editMode => true
  }

  confirmSave() {
    if (this.props.searches.editableSearch) {
      this.props.dispatch(updateSearch(this.props.searches.editableSearch));
    } else {
      // show an error or something
    }
  }

  onFilterChange(fieldName, attr, val) {
    const {dispatch} = this.props;

    dispatch(userSelected(null));
    dispatch(clearUserList());
    dispatch(filterChanged(fieldName, {[attr]: val}));
    dispatch(makeQueryFromState('user', 0, true, true));
  }

  onPagination(page = 0) {
    this.props.dispatch(makeQueryFromState('user', page, false, true));
  }

  updateUser(user) {
    this.props.dispatch(userSelected(user));
    this.props.dispatch(fetchCommentsByUser(user._id));
  }

  render() {
    return (
      <Page>
        <ContentHeader title={ window.L.t('Search Editor') } />
        <Button
          onClick={this.confirmSave.bind(this)}
          category="primary"
          style={styles.saveButton}>
          Update Search <FaFloopyO style={styles.saveIcon} />
        </Button>

        <Clauses editMode={true} />

        {
          this.props.searches.editableSearchLoading || !this.props.searches.editableSearch ?
          <p>Loading Saved Search...</p> :
          <div>
            {/*
              can't update name or description just yet

            <TextField label="name" value={this.props.searches.editableSearch.name} />
            <textarea disabled>{this.props.searches.editableSearch.description}</textarea>
            <TextField label="tag" value={this.props.searches.editableSearch.tag} />
            */}
            <div style={styles.base}>
              <div style={styles.filters}>
                <UserFilters
                  editMode={true}
                  onChange={this.onFilterChange.bind(this)} />
              </div>
              <div style={styles.rightPanel}>
                <div style={styles.userListContainer}>
                  <UserList
                    total={this.props.searches.userCount}
                    onPagination={this.onPagination.bind(this)}
                    loadingQueryset={this.props.searches.loadingQueryset}
                    users={this.props.searches.users} />
                </div>
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
