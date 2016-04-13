import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from './layout/Flex';
import { connect } from 'react-redux';
import {Link} from 'react-router';
// import { FOO } from '../actions';
import Page from 'app/layout/Page';
import {fetchSearchesIfNotFetched, deleteSearch} from 'groups/GroupActions';
// import Sentence from '../components/Sentence';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';
import ContentHeader from 'components/ContentHeader';
import Button from 'components/Button';
import Modal from 'components/modal/Modal';

const mapStateToProps = (state) => {
  return {groups: state.groups, app: state.app, auth: state.auth};
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
  renderGroups() {

    const groups = this.props.groups.searches.map((search, i) => {

      return (
        <Card style={styles.groupCard} key={i}>
          <CardHeader>{search.name}</CardHeader>
          <Button
            size="small"
            category="danger"
            style={styles.deleteButton}
            onClick={this.openDeleteModal.bind(this, search)}>
            Delete
          </Button>
          <p>{search.description}</p>
          <div style={styles.actionsContainer}>
            <Link
              style={styles.viewGroupLink}
              to={`/saved-search/${search.query}`}>View Search Details</Link>
            <span>Edit Search (coming soon)</span>
          </div>
        </Card>
      );
    });

    return groups;

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
            {this.renderGroups()}
          </div>
        </div>

        {
          this.state.pendingDeleteSearch ?
          (
            <Modal
              title="Really delete saved search?"
              isOpen={this.state.deleteModalOpen}
              confirmAction={this.confirmDelete.bind(this, this.state.pendingDeleteSearch)}
              cancelAction={this.cancelDelete.bind(this, this.state.pendingDeleteSearch)}>
              <p>Search Name {this.state.pendingDeleteSearch.name}</p>
              <p>Description: {this.state.pendingDeleteSearch.description}</p>
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
  viewGroupLink: {
    marginRight: 20
  },
  groupCard: {
    marginBottom: 0,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 0,
    width: '370px',
    height: '150px',
    position: 'relative',
    '@media (max-width: 1000px)': {
      'width': '90%'
    }
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8
  }
};
