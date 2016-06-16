
/**
 * Module dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Link } from 'react-router';
import { userSelected } from 'users/UsersActions';

import { mediumGrey } from 'settings';

import {
  saveQueryFromState,
  makeQueryFromState,
  fetchInitialData,
  clearUserList,
  clearRecentSavedSearch
} from 'search/SearchActions';
import { filterChanged, getFilterRanges } from 'filters/FiltersActions';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import UserFilters from 'filters/UserFilters';
import Button from 'components/Button';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';
import Modal from 'components/modal/Modal';
import TextField from 'components/forms/TextField';
import StatusBar from 'components/StatusBar';
import Clauses from 'search/Clauses';

/**
 * Search creator page
 * Contains the UI for creating user searches
 */

@connect(state => ({
  searches: state.searches,
  comments: state.comments,
  users: state.users,
  filters: state.filters,
  app: state.app,
  auth: state.auth
}))
@Radium
export default class SearchCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {saveModalOpen: false};
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  // only the first time
  componentWillMount() {
    const {dispatch} = this.props;

    // redirect user to /login if they're not logged in
    //   TODO: refactor: pass in a function that calculates auth state
    if (this.props.app.requireLogin && !this.props.auth.authorized) {
      return this.context.router.push('/login');
    }

    // set up the initial default / unfiltered view
    // this was previously in UserFilters
    dispatch(clearRecentSavedSearch());
    dispatch(clearUserList());
    dispatch(fetchInitialData());
    dispatch(getFilterRanges(false)); // editmode => false
  }

  openModal() {
    this.setState({saveModalOpen: true});
  }

  cancelSave() {
    this.setState({saveModalOpen: false});
  }

  updateSearchName(searchName) {
    this.setState({searchName});
  }

  updateSearcDesc(e) {
    this.setState({searchDesc: e.target.value});
  }

  updateSearchTag(searchTag) {
    this.setState({searchTag});
  }

  confirmSave() {
    // show a saving icon or something?
    const { searchName, searchDesc, searchTag } = this.state;
    this.setState({saveModalOpen: false});
    this.props.dispatch(saveQueryFromState(searchName, searchDesc, searchTag));
  }

  onPagination(page = 0) {
    this.props.dispatch(makeQueryFromState('user', page));
  }

  onFilterChange(fieldName, attr, val) {
    const {dispatch} = this.props;

    dispatch(userSelected(null));
    dispatch(filterChanged(fieldName, {[attr]: val}));
    dispatch(makeQueryFromState('user', 0, true));
  }

  render() {
    return (
      <Page style={styles.pageBase}>
        <StatusBar
          loading={this.props.searches.savingSearch}
          visible={this.props.searches.savingSearch || !!this.props.searches.recentSavedSearch}>
          {
            this.props.searches.recentSavedSearch ?
            (<Link style={styles.searchDetail} to={`/saved-search/${this.props.searches.recentSavedSearch.name}`}>
              View Your Saved Search [{this.props.searches.recentSavedSearch.name}] →
            </Link>) :
            'Saving Search...'
          }
        </StatusBar>

        <div style={styles.base}>
          <div style={styles.topSection}>
            <ContentHeader title={ window.L.t('Create a Search') } />
            <Button
              onClick={this.openModal.bind(this)}
              category="info"
              style={styles.saveButton}>
              <FaFloopyO style={styles.saveIcon} />{` Save Search `}
            </Button>
            <Clauses editMode={false} />
          </div>

          <div style={styles.bottomSection}>
            <div style={styles.filtersAndResults}>
              <UserFilters
                style={styles.filters}
                editMode={false}
                onChange={this.onFilterChange.bind(this)} />
              <UserList
                total={this.props.searches.userCount}
                onPagination={this.onPagination.bind(this)}
                loadingQueryset={this.props.searches.loadingQueryset}
                users={this.props.searches.users} />
            </div>
          </div>
        </div>

        <Modal
          title="Save Search"
          isOpen={this.state.saveModalOpen}
          confirmAction={this.confirmSave.bind(this)}
          cancelAction={this.cancelSave.bind(this)}>
          <TextField label="Name" onChange={this.updateSearchName.bind(this)}/>
          <p style={styles.modalLabel}>Description</p>
          <textarea
            style={styles.descriptionInput}
            onBlur={this.updateSearcDesc.bind(this)}></textarea>
          <TextField label="Tag Name" onChange={this.updateSearchTag.bind(this)} />
        </Modal>
      </Page>
    );
  }
}


// <UserDetail
//   breakdown={this.props.filters.breakdown}
//   specificBreakdown={this.props.filters.specificBreakdown}
//   commentsLoading={this.props.comments.loading}
//   user={this.props.users.selectedUser}
//   comments={this.props.comments.items}
//   style={styles.userDetail} />



const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  pageBase: {
    position: 'absolute',
    overflow: 'hidden',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0
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
  topSection: {
  },
  userListContainer: {
    margin: 20,
    display: 'flex',
    clear: 'both'
  },
  // userDetail: {
  //   flex: 2,
  //   paddingLeft: 40,
  //   height: 900
  // },
  userList: {
    minWidth: 350,
    flex: 1
  },
  modalLabel: {
    fontSize: 16,
    marginTop: 16
  },
  descriptionInput: {
    padding: 8,
    fontSize: 20,
    minHeight: 120,
    width: '100%',
    border: `1px solid ${mediumGrey}`,
    borderRadius: 3
  },
  saveIcon: {
    marginRight: 7,
    position: 'relative',
    top: -2,
    fontSize: 18
  },
  filters: {
    width: 300,
    '@media (max-width: 1000px)': {
      'width': '100%'
    }
  },
  searchDetail: {
    color: 'white',
    textDecoration: 'none'
  },
  saveButton: {
    position: 'absolute',
    top: 10,
    right: 10
  }
};
