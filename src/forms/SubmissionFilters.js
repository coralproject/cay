
import React, { Component } from 'react';
import Radium from 'radium';
import RadioButton from 'components/forms/RadioButton';
import onClickOutside from 'react-onclickoutside';

/**
 * Order by dropdown
 */

const OrderOptions = {
  'dsc': 'Newest submission first',
  'asc': 'Oldest submission first'
};

@Radium
@onClickOutside
export class OrderDropdown extends Component {
  handleClickOutside() {
    this.props.onToggle(false);
  }

  render() {
    const { order='dsc', onChange, open=false } = this.props;
    return (
      <div style={styles.order.container(open)}>
        <p style={styles.filterBy.current}>{OrderOptions[order]}</p>
        {Object.keys(OrderOptions).map(value => (
          <RadioButton style={styles.filterBy.radio}
            checked={value === order ? 'checked' : null}
            label={OrderOptions[value]} value={value} onClick={() => onChange(value)} />
        ))}
      </div>
    );
  }
}

/**
 * Filter by dropdown
 */

const FilterByOptions = {
  'default': 'All submissions',
  '-flagged': 'Flagged submssions hidden',
  'bookmarked': 'Bookmarked',
  'flagged': 'Flagged'
};

@Radium
@onClickOutside
export class FilterDropdown extends Component {
  handleClickOutside() {
    this.props.onToggle(false);
  }

  getCount(value) {
    const { counts } = this.props;
    switch (value) {
    case 'flagged':
    case 'bookmarked':
      return counts[value];
    case 'default':
      return counts['totalSearch'];
    case '-flagged':
      return counts['totalSearch'] - counts['flagged'];
    }
  }

  render() {
    const { filterBy='default', onChange, open=false } = this.props;
    return (
      <div style={styles.filterBy.container(open)}>
        <p style={styles.filterBy.current}>{FilterByOptions[filterBy]}</p>
        {Object.keys(FilterByOptions).map(value => (
          <RadioButton style={styles.filterBy.radio}
            checked={filterBy === value ? 'checked' : null}
            label={`${FilterByOptions[value]} (${this.getCount(value)})`} value={value}
            onClick={() => onChange(value)} />
        ))}
      </div>
    );
  }
}

const styles = {
  filterBy: {
    container(open) {
      return {
        display: open ? 'block' : 'none',
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#fff',
        padding: 10,
        left: 15,
        border: '1px solid #ccc',
        borderRadius: 4
      };
    },
    radio: {
      borderTop: '1px solid #ccc',
      padding: 10
    },
    current: {
      padding: 10,
      fontSize: '0.9em',
      fontWeight: 'bold'
    }
  },
  order: {
    container(open) {
      return {
        display: open ? 'block' : 'none',
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#fff',
        padding: 10,
        left: 100,
        border: '1px solid #ccc',
        borderRadius: 4
      };
    }
  }
};
