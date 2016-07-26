
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import moment from 'moment';
import BFlag from 'react-icons/lib/fa/flag';
import BBookmark from 'react-icons/lib/fa/bookmark';
import FaSearch from 'react-icons/lib/fa/search';
import FaFilter from 'react-icons/lib/fa/filter';
import FaLongArrowUp from 'react-icons/lib/fa/long-arrow-up';
import FaLongArrowDown from 'react-icons/lib/fa/long-arrow-down';
import { FilterDropdown, OrderDropdown } from 'forms/SubmissionFilters';
import Pagination from 'components/lists/Pagination';
import { fetchSubmissions, hasFlag } from 'forms/FormActions';
import { darkGrey, grey } from 'settings';

@connect()
@Radium
export default class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterByOpen: false,
      orderOpen: false,
      search: '',
      subPageOffset: 0
    };

    const keyPress = (e) => {

      const {activeSubmission, submissions, onSelect, onFlag} = this.props;

      const subIds = submissions.map(s => s.id);
      const activeIndex = subIds.indexOf(activeSubmission);

      // e.code here since {e} is a synthetic React event
      if (e.code === 'KeyJ' && subIds[activeIndex + 1]) {
        onSelect(subIds[activeIndex + 1]);
      } else if (e.code === 'KeyK' && subIds[activeIndex - 1] && activeIndex !== 0) {
        onSelect(subIds[activeIndex - 1]);
      } else if (e.code === 'KeyF') {
        onFlag(!hasFlag(submissions[subIds.indexOf(activeSubmission)], 'flagged'));
      }
    };

    this.onKeyPress = keyPress.bind(this);
    // if the listener is bound on the next line, removeEventListener doesn't work
    document.addEventListener('keypress', this.onKeyPress, true);
  }

  onFilterByToggle(filterByOpen) {
    this.setState({ filterByOpen });
  }

  onOrderToggle(orderOpen) {
    this.setState({ orderOpen });
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeyPress, true);
  }

  listSubmissions(submissions, activeSubmission, onSelect) {
    return submissions.map((submission, key) => {
      return (
        <div onClick={() => onSelect(submission.id)}
          style={[
            styles.submissionContainer,
            submission.id === activeSubmission && styles.activeSubmission
          ]} key={key}>
          <span style={{fontWeight: 'bold'}}>{submission.number || ''}</span>
          <span>{moment(submission.date_created).format('L LT')}</span>
          <div>
            <span key={`${key}-0`} style={[styles.iconContainer(hasFlag(submission, 'flagged'),
              submission.id === activeSubmission),styles.iconFlagged]}
              onClick={() => this.props.onFlag(!hasFlag(submission, 'flagged'))}>
              <BFlag style={styles.icon(hasFlag(submission, 'flagged'))} /></span>

            <span key={`${key}-1`} style={[styles.iconContainer(hasFlag(submission, 'bookmarked'),
              submission.id === activeSubmission), styles.iconBookmarked]}
              onClick={() => this.props.onBookmark(!hasFlag(submission, 'bookmarked'))}>
              <BBookmark style={styles.icon(hasFlag(submission, 'bookmarked'))}/>
              </span>
          </div>
        </div>
      );
    });
  }

  paginate(requestedPage, total) {
    const { form } = this.props;

    if (requestedPage >= 0 && requestedPage <= Math.floor(total / 10)) {
      this.props.dispatch(fetchSubmissions(form.id, requestedPage)).then(() => {
        this.setState({subPageOffset: requestedPage});
      });
    }
  }

  render() {
    const { submissions, activeSubmission, onSelect, filterBy, order, form, formCounts } = this.props;
    const { filterByOpen, orderOpen, search, subPageOffset } = this.state;

    let count; // probably a better way to to this.
    if (filterBy === 'default') {
      count = formCounts['totalSearch'];
    } else {
      count = formCounts[filterBy.replace('-', '')];
    }

    return (
      <div style={styles}>
        <div style={styles.container}>
          <div style={styles.countContainer}>
            <p style={styles.count}>{count} of {formCounts.totalSubmissions} Submission{formCounts.totalSubmissions === 1 ? '' : 's'}</p>
          </div>
          <div style={styles.searchContainer}>
            <input style={styles.search} type='text' value={search}
              onChange={evt => this.setState({ search: evt.target.value })}
              placeholder='Search' />
            <button onClick={() => this.props.onSearchChange(search)}
              style={[styles.filterButton, styles.filterLeftButton]}><FaSearch /></button>
            <button onClick={this.onFilterByToggle.bind(this, true)}
              style={[styles.filterButton, styles.filterRightButton]}><FaFilter /></button>
            <button onClick={this.onOrderToggle.bind(this, true)}
              style={[styles.filterButton, styles.filterAsideButton]}><FaLongArrowUp /><FaLongArrowDown /></button>
          </div>
          <FilterDropdown open={filterByOpen}
            filterBy={filterBy}
            onToggle={this.onFilterByToggle.bind(this)}
            onChange={this.props.onFilterByChange}
            counts={this.props.formCounts} />

          <OrderDropdown open={orderOpen}
            order={order}
            onToggle={this.onOrderToggle.bind(this)}
            onChange={this.props.onOrderChange} />
        </div>
        <div>{this.listSubmissions(submissions, activeSubmission, onSelect)}</div>
        { form ? <Pagination current={subPageOffset}
          total={Math.ceil(count / 10)}
          onChange={this.paginate.bind(this, count)} /> : null }
      </div>
    );
  }
}

const styles = {
  height: '100%',
  position: 'relative',

  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    minWidth: 300,
    marginBottom: 10,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)'
  },
  iconContainer(show, active) {
    return {
      display: show || active ? 'inline' : 'none',
      marginLeft: 3
    };
  },
  icon(show) {
    return {
      fill: show ? 'currentColor' : 'transparent',
      stroke: 'currentColor'
    };
  },
  iconFlagged: {
    color: 'rgb(217, 83, 79)'
  },
  hover: {
    display: 'none',
    ':hover': {
      display: 'inline'
    }
  },
  iconBookmarked: {
    color: 'rgb(46, 151, 102)'
  },
  count: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: darkGrey
  },
  countContainer: {
    margin: 10
  },
  search: {
    height: 35,
    padding: 10,
    fontSize: '16px',
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    border: '1px solid #ccc'
  },
  submissionContainer: {
    transition: 'all .3s',
    height: 40,
    border: '3px solid transparent',
    padding: 8,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    transform: 'scale(1)',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  activeSubmission: {
    border: `3px solid ${grey}`
  },
  filterButton: {
    width: 35,
    height: 35,
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    display: 'inline-block',
    color: 'rgb(94,94,94)',
    cursor: 'pointer'
  },
  filterLeftButton: {
    borderLeft: 0,
    borderRight: 0
  },
  filterRightButton: {
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6
  },
  filterAsideButton: {
    marginLeft: 5,
    borderRadius: 6,
    display: 'flex'
  },
  searchContainer: {
    display: 'flex',
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 0
  }
};
