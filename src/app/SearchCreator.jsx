import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import {Link} from 'react-router';

import settings from 'settings';

import {userSelected} from 'users/UsersActions';
import {fetchCommentsByUser} from 'comments/CommentsActions';
import {saveQueryFromState, makeQueryFromState} from 'search/SearchActions';
import { fetchAllTags } from 'tags/TagActions';
import { fetchSections, fetchAuthors } from 'filters/FiltersActions';

import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';
import UserList from 'users/UserList';
import UserDetail from 'users/UserDetail';
import SearchFilters from 'search/SearchFilters';
import Button from 'components/Button';
import FaFloopyO from 'react-icons/lib/fa/floppy-o';
import MdEdit from 'react-icons/lib/md/edit';
import Modal from 'components/modal/Modal';
import TextField from 'components/forms/TextField';
import StatusBar from 'components/StatusBar';
import Clauses from 'search/Clauses';

@connect(state => ({
  searches: state.searches,
  comments: state.comments,
  users: state.users
}))
@Radium
export default class SearchCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {saveModalOpen: false};
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  // only the first time
  componentWillMount() {
    // redirect user to /login if they're not logged in
    //   TODO: refactor: pass in a function that calculates auth state
    if (window.requireLogin && !this.props.searches.authorized) {
      let {router} = this.context;
      return router.push('/login');
    }

    /* set up the initial default / unfiltered view, this was previously in UserFilters */
    this.props.dispatch(fetchAllTags());
    this.props.dispatch(fetchSections());
    this.props.dispatch(fetchAuthors());
    this.props.dispatch(makeQueryFromState('user', 0, true));
  }

  updateUser(user) {
    this.props.dispatch(userSelected(user));
    this.props.dispatch(fetchCommentsByUser(user._id));
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
    const name = this.state.searchName;
    const desc = this.state.searchDesc;
    const tag = this.state.searchTag;

    this.setState({saveModalOpen: false});

    this.props.dispatch(saveQueryFromState(name, desc, tag));
  }

  onPagination(page = 0) {
    this.props.dispatch(makeQueryFromState('user', page));
  }

  render() {

    return (

      <Page>

        <ContentHeader title={ window.L.t('Search Creator') } />
        <Clauses/>

        <div style={styles.base}>
          <div style={styles.filters}>
            <SearchFilters userOnly={true}/>
          </div>

          <div style={styles.rightPanel}>
            <Button category="disabled" style={styles.editButton}>
              Edit Search <MdEdit style={styles.saveIcon} />
            </Button>
            <Button onClick={this.openModal.bind(this)} category="primary" style={styles.saveButton}>
              Save Search <FaFloopyO style={styles.saveIcon} />
            </Button>
            <div style={styles.userListContainer}>
              <UserList
                onPagination={this.onPagination.bind(this)}
                loadingQueryset={this.props.searches.loadingQueryset}
                users={this.props.searches.users} userSelected={this.updateUser.bind(this)} />
              <UserDetail
                commentsLoading={this.props.comments.loading}
                user={this.props.users.selectedUser}
                comments={this.props.comments.items}
                style={styles.userDetail} />
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
            onChange={this.updateSearcDesc.bind(this)}></textarea>
          <TextField label="Tag Name" onChange={this.updateSearchTag.bind(this)} />
        </Modal>

        <StatusBar
          loading={this.props.searches.savingSearch}
          visible={this.props.searches.savingSearch || !!this.props.searches.recentSavedSearch}>
          {
            this.props.searches.recentSavedSearch ?
              (<Link style={styles.searchDetail} to={`/saved-search/${this.props.searches.recentSavedSearch.id}`}>
                View Your Saved Search [{this.props.searches.recentSavedSearch.name}] →
              </Link>) :
              'Saving Search...'
          }
        </StatusBar>

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
  rightPanel: {
    flex: 1
  },
  userListContainer: {
    marginTop: 5,
    height: 900,
    display: 'flex',
    clear: 'both'
  },
  userDetail: {
    flex: 2,
    paddingLeft: 40,
    height: 900
  },
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
    border: '1px solid ' + settings.mediumGrey,
    borderRadius: 3
  },
  saveIcon: {
    width: 25,
    height: 25
  },
  filters: {
    '@media (max-width: 1000px)': {
      'width': '100%'
    }
  },
  searchDetail: {
    color: 'white',
    textDecoration: 'none'
  },
  saveButton: {
    float: 'right'
  },
  editButton: {
    float: 'right',
    marginLeft: 10
  }
};
