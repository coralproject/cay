import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Page from 'app/layout/Page';
import {fetchSearchesIfNotFetched, deleteSearch} from 'search/SearchActions';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';
import ContentHeader from 'components/ContentHeader';
import Button from 'components/Button';
import Modal from 'components/modal/Modal';

import settings from 'settings';

const mapStateToProps = (state) => {
  return {searches: state.searches, app: state.app, auth: state.auth};
};

@connect(mapStateToProps)
@Radium
class SeeAllSearches extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteModalOpen: false };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  componentWillMount() {
    // redirect user to /login if they're not logged in
    //   TODO: refactor: pass in a function that calculates auth state
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

  getStyles() {
    return {
      base: {

      }
    };
  }
  renderSearches() {

    const searches = this.props.searches.searches.map((search, i) => {

      return (
        <Card style={styles.searchCard} key={i}>
          <CardHeader>{search.name}</CardHeader>
          <Button
            size="small"
            category="danger"
            style={styles.deleteButton}
            onClick={this.openDeleteModal.bind(this, search)}>
            {window.L.t('Delete')}
          </Button>
          <p style={styles.searchDescription}>{search.description}</p>
          <ul>
            {search.filters.values.map((value, i) => {
              return (
                <li style={styles.filterValue} key={i}>
                  between {value.userMin} and {value.userMax} {value.description}
                </li>
              );
            })}
          </ul>
          <div style={styles.actionsContainer}>
            <Link
              style={styles.viewSearchLink}
              to={`/saved-search/${search.id}`}>{window.L.t('View Search Details')}</Link>
            <span>{window.L.t('Edit Search')} ({window.L.t('coming soon')})</span>
          </div>
        </Card>
      );
    });

    return searches;

  }
  render() {

    return (
      <Page>
        <div style={[
          styles.base,
          this.props.style
        ]}>
          <ContentHeader title={ window.L.t('Saved Searches') } />
          <div style={styles.cardHolder}>
            {this.renderSearches()}
          </div>
        </div>

        {
          this.state.pendingDeleteSearch ?
          (
            <Modal
              title={window.L.t('Really delete saved search?')}
              isOpen={this.state.deleteModalOpen}
              confirmAction={this.confirmDelete.bind(this, this.state.pendingDeleteSearch)}
              cancelAction={this.cancelDelete.bind(this, this.state.pendingDeleteSearch)}>
              <p>{window.L.t('Search Name')} {this.state.pendingDeleteSearch.name}</p>
              <p>{window.L.t('Description')}: {this.state.pendingDeleteSearch.description}</p>
            </Modal>
          )
          : null
        }


      </Page>
    );
  }
}

export default SeeAllSearches;

const styles = {
  cardHolder: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  sentenceHeading: {
    margin: '10px 0px',
    textTransform: 'uppercase',
    fontWeight: 500
  },
  actionsContainer: {
    marginTop: 20
  },
  viewSearchLink: {
    marginRight: 20
  },
  searchCard: {
    marginBottom: 0,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 0,
    width: 370,
    position: 'relative',
    '@media (max-width: 1000px)': {
      'width': '90%'
    }
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  searchDescription: {
    marginBottom: 10,
    fontSize: 18
  },
  filterValue: {
    backgroundColor: settings.darkGrey,
    color: 'white',
    padding: 10,
    marginBottom: 5,
    borderRadius: 4
  }
};
