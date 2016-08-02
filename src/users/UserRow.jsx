import React, {PropTypes} from 'react';
import Radium from 'radium';
import template from 'lodash/string/template';
import get from 'lodash/object/get';
import ListItem from 'components/lists/ListItem';
import moment from 'moment';

@Radium
export default class UserRow extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    setAsActive: React.PropTypes.func,
    activeIndex: React.PropTypes.number,
    disabled: React.PropTypes.bool
  }
  static defaultProps = {
    active: true,
    breakdown: 'all',
    specificBreakdown: 'all'
  }

  handleClick() {
    if (!this.props.disabled) {
      this.props.setAsActive(this.props.activeIndex);
      this.props.onClick(this.props.user);
    }
  }
  userChangedFilter(filterName) {
    const f = this.props.filters[filterName];
    const maxDifferent = f.userMax !== f.max && f.userMax < f.max;
    const minDifferent = f.userMin !== f.min && f.userMin > f.min;
    return {
      either: maxDifferent || minDifferent,
      both: !(maxDifferent && minDifferent)
    };
  }

  getDefaultInfo() {
    const stats = this.props.user.statistics.comments.all;
    const ratios = stats.ratios;
    return (
      <div style={styles.defaultInfo}>
        <ul>
          <li style={styles.defaultItem}>First comment {moment(stats.all.first).format('D MMM YYYY')}</li>
          <li style={styles.defaultItem}>{ratios.ModeratorDeleted ? (ratios.ModeratorDeleted * 100).toFixed(2) : 0}% deleted comments</li>
          <li style={styles.defaultItem}>{ratios.SystemFlagged ? (ratios.SystemFlagged * 100).toFixed(2) : 0}% flagged comments</li>
          <li style={styles.defaultItem}>{(stats.all.reply_ratio * 100).toFixed(2)}% comments are replies</li>
        </ul>
        <span style={styles.defaultComments}>{stats.all.count} comments</span>
      </div>
    );
  }

  getNonDefaultFilters() {
    const { breakdown, specificBreakdown, user } = this.props;

    return this.props.filters.filterList.map((filterName, i) => {
      if (this.userChangedFilter(filterName).either) {
        if (this.props.filters[filterName].field === 'SystemFlagged') {
          return (
            <p key={i} style={styles.stat}>
              {`${this.props.user.statistics.comments.all.SystemFlagged.count} flagged by system`}
            </p>
          );
        }

        let dimension = template(this.props.filters[filterName].template)({ dimension: `${breakdown}.${specificBreakdown}` });
        dimension = get(user, dimension);
        let num = parseInt(dimension, 10);
        if (isNaN(num)) {
          num = parseFloat(dimension).toFixed(2);
        }
        if (isNaN(num)) {
          return;
        }

        let stat;
        switch (this.props.filters[filterName].type) {
        case 'dateRange':
        case 'intDateProximity':
          stat = '';
          // stat = `${this.props.user.statistics.comments.all.all[this.props.filters[filterName].field]} ${this.props.filters[filterName].name}`;
          // <DateRangeClause {...this.props.filters[filterName]}/>;
          break;
        case 'percentRange':
          stat = `${Math.floor(dimension * 100)}% ${this.props.filters[filterName].name}`;
          // <PercentClause {...this.props.filters[filterName]}/>;
          break;
        default:
          // truncating to 2 decimals
          stat = `${num} ${this.props.filters[filterName].name}`;
          // <IntClause {...this.props.filters[filterName]}/>;
        }

        return (
          <p key={i} style={styles.stat}>
            {stat}
          </p>
        );
      }
    });
  }

  render() {
    let {active, disabled} = this.props;
    const {user} = this.props;

    return (
      <ListItem
        active={active}
        style={[styles.base, disabled && styles.disabled, this.props.style]}
        onClick={this.handleClick.bind(this)}
        >
        <span style={styles.link} onClick={this.props.onClick}>{user.name}</span>
          {this.getDefaultInfo()}
        {this.getNonDefaultFilters()}
      </ListItem>
    );
  }
}

const styles = {
  base: {
    cursor: 'pointer',
    overflow: 'hidden'
    // height: 100
  },
  stat: {
    fontSize: 12
  },
  flex: {
    display: 'flex'
  },
  disabled: {
    cursor: 'auto'
  },
  sub: {
    marginTop: 4,
    fontSize: '.7em'
  },
  avatar: {
    height: 50,
    marginRight: 10
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontWeight: 'bold'
  },
  defaultInfo: {
    fontSize: '0.8em',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  defaultComments: {
    fontSize: '1.3em',
    background: '#ccc',
    padding: 10,
    borderRadius: 4
  },
  defaultItem: {
    paddingTop: 5
  }
};
