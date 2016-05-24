import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import Infinite from 'react-infinite';
import Select from 'react-select';

import UserRow from 'users/UserRow';
import Heading from 'components/Heading';
import {sortBy} from 'filters/FiltersActions';
import Spinner from 'components/Spinner';

import { Lang } from 'i18n/lang';

@connect(({filters}) => ({filters}))
@Lang
@Radium
export default class UserList extends React.Component {

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.idRequired
    }).isRequired).isRequired,
    disabled: PropTypes.bool,
    total: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = { page: 0, selectedSort: props.filters.filterList[0] };
  }

  userSelected(user) {
    if(!this.props.disabled) {
      // console.log('user!', user);
      this.props.userSelected(user);
    }
  }
  setAsActiveHandler(index) {
    // console.log('setAsActiveHandler', index);
    // this.setState({activeUserIndex: index});
  }

  handleInfiniteLoad () {
    if (this.props.users.length >= this.props.total) return;
    this.props.onPagination(this.state.page);
    this.setState({
      page: this.state.page + 1
    });
  }

  getUserList(users) {
    return (
      <Infinite
        elementHeight={100}
        containerHeight={900}
        infiniteLoadBeginEdgeOffset={200}
        styles={{scrollableStyle: {'width': 350}}}
        onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
        >
        {users.map((user, i) =>
          <UserRow {...this.props}
            breakdown={this.props.filters.breakdown}
            specificBreakdown={this.props.filters.specificBreakdown}
            active={this.state.activeUserIndex === i ? true : false}
            setAsActive={this.setAsActiveHandler.bind(this)}
            activeIndex={i}
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

  render() {
    var noUsersMessage = (<p style={ styles.noUsers }>
      No users loaded yet,<br />
      create a filter on the left to load users.
    </p>);

    const {filters} = this.props;
    var userListContent = this.props.users.length ? this.getUserList(this.props.users) : noUsersMessage;
    var sortableFilters = filters.filterList.map(filter => {
      return {label: filters[filter].description, value: filter};
    });

    return (
      <div style={ [ styles.base, this.props.style ] }>
        <div style={ styles.columnHeader }>
          <Heading size="medium">
            <span style={styles.groupHeader}>{ window.L.t('results') }</span> ({this.props.total || '#'} { window.L.t('users')})
          </Heading>
        <div style={styles.sort}>
          <Select
            value={this.state.selectedSort}
            onChange={this.onSortChanged.bind(this)}
            options={sortableFilters} />
        </div>
      </div>
        {userListContent}

        {
          this.props.loadingQueryset ?
            <div style={ styles.loading }>
              <Spinner /> Loading...
            </div> :
            ''
        }

      </div>
    );
  }
}

const styles = {
  base: {
    // paddingLeft: 20,
    // marginTop: -40
  },
  columnHeader: {
    height: 90
  },
  groupHeader: {
    textTransform: 'capitalize'
  },
  sort: {
    marginRight: 20
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
  }
};
