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

const RadiumLink = Radium(Link);

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
    // foo: 'bar'
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
        justifyContent: 'space-between',
      },
      searchDescription: {
        fontSize: 16,
        marginBottom: 15,
        fontFamily: "Georgia, serif",
        fontStyle: "italic"
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
        borderLeft: "3px solid rgb(130,130,130)",
        paddingLeft: 15
      },
      filterValue: {
        marginBottom: 10
      }
    };
  }
  renderSearches() {
    const styles = this.getStyles();
    const searches = this.props.searches.searches.map((search, i) => {

      return (
        <Card style={styles.searchCard} key={i}>
          <div style={styles.topSection}>
            <p style={styles.cardHeader}>{search.name}</p>
            <div style={styles.actionsContainer}>
              <RadiumLink
                style={styles.button}
                to={`/saved-search/${search.name}`}>{window.L.t('View')}
              </RadiumLink>
              <span style={styles.button}>{window.L.t('Edit')}</span>
              <Button
                category='danger'
                style={styles.deleteButton}
                onClick={this.openDeleteModal.bind(this, search)}>
                {window.L.t('Delete')}
              </Button>
            </div>
          </div>
          <p style={styles.searchDescription}>{search.description}</p>
          <ul style={styles.filterList}>
            {search.filters.values.map((value, i) => {
              return (
                <li style={styles.filterValue} key={i}>
                  between {value.userMin} and {value.userMax} {value.description}
                </li>
              );
            })}
          </ul>
        </Card>
      );
    });

    return searches;

  }
  render() {
    const styles = this.getStyles();

    return (
      <Page>
        <div style={[
          styles.base,
          this.props.style
        ]}>
          <ContentHeader title={ window.L.t('Saved Searches') } />
          <div>
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
