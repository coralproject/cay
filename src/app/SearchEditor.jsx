
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import {
  fetchSavedSearchForEdit,
  makeQueryFromState,
  fetchInitialData,
  clearUserList,
  updateSearch,
  updateEditableSearchMeta
} from 'search/SearchActions';
import {userSelected} from 'users/UsersActions';
import {clearEditableFilters, filterChanged, getFilterRanges} from 'filters/FiltersActions';
import {fetchCommentsByUser} from 'comments/CommentsActions';
import L from 'i18n';

import Button from 'components/Button';
import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserFilters from 'filters/UserFilters';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';
import UserList from 'users/UserList';
import TextField from 'components/forms/TextField';
import Clauses from 'search/Clauses';

@connect(({ searches, filters, comments, users }) =>
({ searches, filters, comments, users }))
@Radium
export default class SearchEditor extends Component {

  componentWillMount() {
    const {dispatch, params} = this.props;

    dispatch(clearUserList());
    dispatch(userSelected(null));
    dispatch(clearEditableFilters()); // clear filters out from previous viewing of Saved Search
    dispatch(getFilterRanges(true)); // editMode => true
    dispatch(fetchSavedSearchForEdit(params.id))
    .then(() => dispatch(fetchInitialData(true))); // dispatch after getting search
  }

  confirmSave() {
    if (this.props.searches.editableSearch) {
      this.props.dispatch(updateSearch(this.props.searches.editableSearch));
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

  updateSearchMeta(field, value) {
    this.props.dispatch(updateEditableSearchMeta(field, value));
  }

  render() {
    const { searches } = this.props;
    return (
      <Page style={styles.pageBase}>
        {
          searches.editableSearchLoading || !searches.editableSearch ?
          <p>Loading Saved Search...</p> :
          <div style={styles.base}>
            <div style={styles.topSection}>
              <ContentHeader title={ L.t('Search Editor') } />
              <div style={styles.metaControl}>
                <TextField
                  style={styles.editMeta}
                  label="update name"
                  onChange={this.updateSearchMeta.bind(this, 'name')}
                  value={this.props.searches.editMeta_name} />
                <TextField
                  style={styles.editMeta}
                  label="update description"
                  onChange={this.updateSearchMeta.bind(this, 'description')}
                  value={this.props.searches.editMeta_description} />
                <TextField
                  style={styles.editMeta}
                  label="update tag"
                  onChange={this.updateSearchMeta.bind(this, 'tag')}
                  value={this.props.searches.editMeta_tag} />
              </div>
              <Button
                onClick={this.confirmSave.bind(this)}
                category={this.props.searches.searchUpdatedSuccessfully ? 'success' : 'primary'}
                style={styles.saveButton}>
                {this.props.searches.searchUpdatedSuccessfully ? 'Search Saved!' : 'Update Search'} <FaFloopyO style={styles.saveIcon} />
              </Button>
              <Clauses editMode={true} />
            </div>

            <div style={styles.bottomSection}>
              <div style={styles.filtersAndResults}>
                <UserFilters
                  style={styles.filters}
                  editMode={true}
                  onChange={this.onFilterChange.bind(this)} />
                <UserList
                  total={this.props.searches.userCount}
                  onPagination={this.onPagination.bind(this)}
                  loadingQueryset={this.props.searches.loadingQueryset}
                  users={this.props.searches.users} />
              </div>
            </div>
          </div>
        }
      </Page>
    );
  }
}

/**
 * Module styles
 */

const styles = {
  pageBase: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0
  },
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  topSection: {
  },
  bottomSection: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box'
  },
  filtersAndResults: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'no-wrap',
    width: '100%',
    height: '100%'
  },
  rightPanel: {
    flex: 1
  },
  userListContainer: {
    margin: 20,
    height: 900,
    display: 'flex',
    clear: 'both'
  },
  metaControl: {
    position: 'absolute',
    right: 200,
    top: -10
  },
  editMeta: {
    marginRight: 20
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
    position: 'absolute',
    top: 10,
    right: 10
  }
};
