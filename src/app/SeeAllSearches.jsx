
/**
 * Module dependencies
 */

import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Page from 'app/layout/Page';
import {fetchSearchesIfNotFetched, deleteSearch} from 'search/SearchActions';
import Card from 'components/cards/Card';
import ContentHeader from 'components/ContentHeader';
import Button from 'components/Button';
import Modal from 'components/modal/Modal';
import L from 'i18n';

const RadiumLink = Radium(Link);

/**
 * Search list component
 */

@connect(({ searches, app, auth }) => ({ searches, app, auth }))
@Radium
export default class SeeAllSearches extends Component {
  constructor(props) {
    super(props);
    this.state = { deleteModalOpen: false };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    // redirect user to /login if they're not logged in
    if (this.props.app.requireLogin && !this.props.auth.authorized) {
      let {router} = this.context;
      return router.push('/login');
    }

    this.props.dispatch(fetchSearchesIfNotFetched());
  }

  confirmDelete() {
    this.setState({deleteModalOpen: false});
    this.props.dispatch(deleteSearch(this.state.pendingDeleteSearch));
  }

  cancelDelete() {
    this.setState({pendingDeleteSearch: null, deleteModalOpen: false});
  }

  openDeleteModal(search) {
    this.setState({pendingDeleteSearch: search, deleteModalOpen: true});
  }

  render() {
    const searches = this.props.searches.searches || [];

    return (
      <Page>
        <div style={[
          styles.base,
          this.props.style
        ]}>
          <ContentHeader title={ L.t('Saved Searches') } />
          <div>
            {searches.map((search, key) =>
              <Search key={key} search={search}
                openDeleteModal={this.openDeleteModal.bind(this, search)} />)}
          </div>
        </div>

        {
          this.state.pendingDeleteSearch ?
          (
            <Modal
              title={L.t('Really delete saved search?')}
              isOpen={this.state.deleteModalOpen}
              confirmAction={this.confirmDelete.bind(this, this.state.pendingDeleteSearch)}
              cancelAction={this.cancelDelete.bind(this, this.state.pendingDeleteSearch)}>
              <p>{L.t('Search Name')} {this.state.pendingDeleteSearch.name}</p>
              <p>{L.t('Description')}: {this.state.pendingDeleteSearch.description}</p>
            </Modal>
          )
          : null
        }
      </Page>
    );
  }
}

const Search = Radium(({ key, search, openDeleteModal }) => (
  <Card style={styles.searchCard} key={key}>
    <div style={styles.topSection}>
      <p style={styles.cardHeader}>{search.name}</p>
      <div style={styles.actionsContainer}>
        <RadiumLink
          style={styles.button}
          to={`/edit-search/${search.id}`}>{L.t('Edit')}
        </RadiumLink>
        <Button
          category='danger'
          style={styles.deleteButton}
          onClick={openDeleteModal}>
          {L.t('Delete')}
        </Button>
      </div>
    </div>

    <p style={styles.searchDescription}>{search.description}</p>
    <ul style={styles.filterList}>
      {search.filters.values.map((filter, i) => <SearchFilter key={key} filter={filter} />)}
    </ul>
  </Card>
));

const SearchFilter = Radium(({ key, filter }) => (
  <li style={styles.filterValue} key={key}>{getFilterDescription(filter)}</li>
));

const getFilterDescription = ({ type, description, userMin, userMax }) =>
  type === 'intDateProximity'
  ? `${description.split('_')[0]} more than ${userMax} ${description.split('_')[1]} `
  : `between ${userMin} and ${userMax} ${description}`;

/**
 * Module styles
 */

const styles = {
  searchCard: {
    padding: 20
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 10
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchDescription: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic'
  },
  button: {
    backgroundColor: '#fff',
    marginRight: 20,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    padding: '0.625rem 1.25rem',
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: '#e6e6e6',
      borderColor: '#adadad'
    }
  },
  filterList: {
    borderLeft: '3px solid rgb(130,130,130)',
    paddingLeft: 15
  },
  filterValue: {
    marginBottom: 10
  }
};
