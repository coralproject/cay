import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import Infinite from 'react-infinite';
import Select from 'react-select';
import _ from 'lodash';

import UserRow from 'users/UserRow';
import Heading from 'components/Heading';
import {sortBy} from 'filters/FiltersActions';
import Spinner from 'components/Spinner';
import { userSelected } from 'users/UsersActions';
import { fetchCommentsByUser } from 'comments/CommentsActions';
import UserDetail from 'users/UserDetail';

import { Lang } from 'i18n/lang';

@connect(({filters, users, comments}) =>
  ({filters, user: users.selectedUser, comments}))
@Lang
@Radium
export default class UserList extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.idRequired
    }).isRequired).isRequired,
    disabled: PropTypes.bool,
    total: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selectedSort: props.filters.filterList[0]
    };

    this.containerHeight = 500;
    this.headerHeight = 0;

    var keypress = function (evt) {
      switch (evt.keyCode) {
      case 39:
        return this.onNextUser();
      case 37:
        return this.onPrevUser();
      case 27:
        return this.onCloseDetail();
      }
    };

    this.onKeyPress = keypress.bind(this);
    document.addEventListener('keydown', this.onKeyPress, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress, true);
  }

  userSelected(user) {
    if(!this.props.disabled) {
      this.props.dispatch(userSelected(user));
      this.props.dispatch(fetchCommentsByUser(user._id));
    }
  }

  handleInfiniteLoad () {
    if (this.props.users.length >= this.props.total) return;
    this.props.onPagination(this.state.page);
    this.setState({
      page: this.state.page + 1
    });
  }

  getSpecificName() {
    const { specificBreakdown, breakdown } = this.props.filters;
    if (!specificBreakdown && specificBreakdown === 'all') return;
    const bdown = this.props.filters[`${breakdown}s`];
    const obj = _.find(bdown, {_id: specificBreakdown});
    return obj && (obj.name || obj.description);
  }

  getUserList(users) {
    return (
      <Infinite
        elementHeight={125}
        containerHeight={this.containerHeight - this.headerHeight}
        infiniteLoadBeginEdgeOffset={200}
        isInfiniteLoading={this.props.loadingQueryset}
        loadingSpinnerDelegate={<InfiniteSpinner/>}
        onInfiniteLoad={this.handleInfiniteLoad.bind(this)}>
        {users.map((user, i) =>
          <UserRow {...this.props}
            breakdown={this.props.filters.breakdown}
            specificBreakdown={this.props.filters.specificBreakdown}
            active={this.state.activeUserIndex === i ? true : false}
            activeIndex={i}
            setAsActive={() => {}}
            user={user}
            onClick={this.userSelected.bind(this)}
            key={i} />
        )}
      </Infinite>
    );
  }

  onSortChanged(option) {
    const filter = this.props.filters[option.value];
    this.setState({selectedSort: option.value});

    if (this.props.onSortChanged) {
      this.props.onSortChanged(filter);
    } else {
      this.props.dispatch(sortBy(filter.template, -1));
    }
  }

  onPrevUser() {
    const { user, users } = this.props;
    if (!user) return;
    const actualIndex = users.map(u => u._id).indexOf(user._id);
    if (actualIndex !== -1) {
      this.userSelected(users[actualIndex - 1]);
    }
  }

  onNextUser() {
    const { user, users } = this.props;
    if (!user) return;
    const actualIndex = users.map(u => u._id).indexOf(user._id);
    if (actualIndex !== -1) {
      this.userSelected(users[actualIndex + 1]);
    }
  }

  onCloseDetail() {
    // Remove the selected user
    this.props.dispatch(userSelected(null));
  }

  render() {
    const { user, users, comments } = this.props;

    var noUsersMessage = (<p style={ styles.noUsers }>
      Zero users found...<br />Please widen your search.
    </p>);

    const {filters} = this.props;
    const userListContent = this.props.users.length ? this.getUserList(this.props.users) : noUsersMessage;

    // get a list of only the sortable filters
    const sortableFilters = filters.filterList
      .filter(filter => filters[filter].sortable)
      .map(filter => ({
        label: filters[filter].description,
        value: filter
      }));

    return (
      <div ref={element => this.containerHeight = element && element.clientHeight || 500}
        style={ [ styles.base, this.props.style ] }>
        <div ref={element => this.headerHeight = element && element.clientHeight || 0}
          style={ styles.columnHeader }>
          {
            this.props.loadingQueryset ?
            <div style={ styles.loading }>
              <Spinner />
            </div> :
            <Heading size='medium'>
              <span style={styles.groupHeader}>{ window.L.t('results') }</span> ({this.props.total} {this.props.total !== 1 ? window.L.t('users') : window.L.t('user')})
            </Heading>
          }
          <div style={styles.sort}>
            <Select
              style={{
                width: 300
              }}
              value={this.state.selectedSort}
              onChange={this.onSortChanged.bind(this)}
              options={sortableFilters} />
          </div>
        </div>
        <div style={styles.cardContainer}>
          <div style={styles.cardFlipper(!!user)}>
            <div style={[styles.cardFace, styles.cardFront]}>
              {!user ? userListContent : ''}
            </div>
            <div style={[styles.cardFace, styles.cardBack]}>
              {user ? <UserDetail onClose={this.onCloseDetail.bind(this)}
                comments={comments.items}
                commentsLoading={comments.loading}
                onPrevUser={this.onPrevUser.bind(this)}
                onNextUser={this.onNextUser.bind(this)}
                isLast={user._id === users[users.length - 1]._id}
                isFirst={user._id === users[0]._id}
                user={user}
                breakdown={this.props.filters.breakdown}
                specificBreakdownName={this.getSpecificName()}
                specificBreakdown={this.props.filters.specificBreakdown} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const InfiniteSpinner = Radium(() => (
  <div style={styles.infiniteSpinner}>
    <Spinner />
  </div>
));

const styles = {
  base: {
    flexGrow: 2,
    marginLeft: 20
  },
  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  groupHeader: {
    textTransform: 'capitalize'
  },
  card: {
    margin: 0,
    padding: 0
  },
  noUsers: {
    fontSize: '12pt',
    color: '#888',
    fontStyle: 'italic',
    paddingRight: 50
  },
  loading: {
    fontSize: '14pt',
    color: '#888',
    padding: '10px 0'
  },
  cardBack: {
    transform: 'rotateY(180deg)'
  },
  cardFront: {
    zIndex: 2,
    transform: 'rotateY(0deg)'
  },
  cardFace: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  cardFlipper(detail) {
    return {
      transition: '0.6s',
      transformStyle: 'preserve-3d',
      position: 'relative',
      transform: detail ? 'rotateY(180deg)' : 'rotateY(0deg)',
      background: '#fff'
    };
  },
  cardContainer: {
    perspective: 1000,
    width: '100%',
    flex: 1
  },
  infiniteSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: -40
  }
};
