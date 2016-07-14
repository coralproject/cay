import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import moment from 'moment';
import BFlag from 'react-icons/lib/fa/flag';
import BBookmark from 'react-icons/lib/fa/bookmark';
import FaSearch from 'react-icons/lib/fa/search';
import FaFilter from 'react-icons/lib/fa/filter';
import FaLongArrowUp from 'react-icons/lib/fa/long-arrow-up';
import FaLongArrowDown from 'react-icons/lib/fa/long-arrow-down';
import RadioButton from 'components/forms/RadioButton';
import onClickOutside from 'react-onclickoutside';

import {
  fetchSubmissions,
  fetchGallery,
  setActiveSubmission,
  updateSubmission,
  sendToGallery,
  removeFromGallery,
  updateFormStatus,
  fetchForm,
  updateOrder,
  updateSearch,
  updateFilterBy,
  cleanSubmissionFilters
 } from 'forms/FormActions';

import SubmissionDetail from 'forms/SubmissionDetail';
import FormChrome from 'app/layout/FormChrome';
import Page from 'app/layout/Page';
import settings from 'settings';

@connect(({ forms }) => ({ forms }))
@Radium
export default class SubmissionList extends Component {
  constructor(props) {
    super(props);
    props.dispatch(cleanSubmissionFilters());
    props.dispatch(fetchForm(props.params.id));
    props.dispatch(fetchGallery(props.params.id));
    props.dispatch(fetchSubmissions(props.params.id));
  }

  sendToGallery(galleryId, subId, key) {
    this.props.dispatch(sendToGallery(galleryId, subId, key));
  }

  removeFromGallery(galleryId, subId, key) {
    this.props.dispatch(removeFromGallery(galleryId, subId, key));
  }

  onFlag(flagged) {
    this.props.dispatch(updateSubmission({ flagged }));
  }

  onBookmark(bookmarked) {
    this.props.dispatch(updateSubmission({ bookmarked }));
  }

  updateFormStatus(value) {
    this.props.dispatch(updateFormStatus(this.props.forms.activeForm, value));
  }

  onOrderChange(order) {
    this.props.dispatch(updateOrder(order));
    this.props.dispatch(fetchSubmissions(this.props.params.id));
  }

  onSearchChange(search) {
    this.props.dispatch(updateSearch(search));
    this.props.dispatch(fetchSubmissions(this.props.params.id));
  }

  onFilterByChange(filterBy) {
    this.props.dispatch(updateFilterBy(filterBy));
    this.props.dispatch(fetchSubmissions(this.props.params.id));
  }

  render() {

    const { submissionList, activeSubmission, activeForm, activeGallery,
      submissionFilterBy, submissionOrder } = this.props.forms;
    const submissions = submissionList.map(id => this.props.forms[id]);
    const submission = this.props.forms[activeSubmission];
    const form = this.props.forms[activeForm];
    const gallery = this.props.forms[activeGallery];

    return (
      <Page>
        <div style={styles.container}>
          <FormChrome
            activeTab="submissions"
            updateStatus={this.updateFormStatus.bind(this)}
            gallery={gallery}
            submissions={submissions}
            form={form}/>
          <Sidebar
            submissions={submissions.reverse()}
            activeSubmission={activeSubmission}
            filterBy={submissionFilterBy}
            order={submissionOrder}
            onSelect={this.onSubmissionSelect.bind(this)}
            onFilterByChange={this.onFilterByChange.bind(this)}
            onOrderChange={this.onOrderChange.bind(this)}
            onSearchChange={this.onSearchChange.bind(this)} />
          <SubmissionDetail
            submission={submission}
            removeFromGallery={this.removeFromGallery.bind(this)}
            sendToGallery={this.sendToGallery.bind(this)}
            gallery={gallery}
            onFlag={this.onFlag.bind(this)}
            onBookmark={this.onBookmark.bind(this)}/>
        </div>
      </Page>
    );
  }

  onSubmissionSelect(submissionId) {
    this.props.dispatch(setActiveSubmission(submissionId));
  }
}

@Radium
class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterByOpen: false,
      orderOpen: false,
      search: ''
    };
  }

  onFilterByToggle(filterByOpen) {
    this.setState({ filterByOpen });
  }

  onOrderToggle(orderOpen) {
    this.setState({ orderOpen });
  }

  listSubmissions(submissions, activeSubmission, onSelect) {
    return submissions.map((submission, key) => {
      return (
        <div onClick={() => onSelect(submission.id)}
          style={[
            styles.sidebar.submissionContainer,
            submission.id === activeSubmission && styles.sidebar.activeSubmission
          ]} key={key}>
          <span style={{fontWeight: 'bold'}}>{key + 1}</span>
          <span>{moment(submission.date_updated).format('L LT')}</span>
          <div>
            {submission.flagged ? <span style={styles.sidebar.icon}><BFlag/></span> : null}
            {submission.bookmarked ? <span style={styles.sidebar.icon}><BBookmark/></span> : null}
          </div>
        </div>
      );
    });
  }

  render() {
    const { submissions, activeSubmission, onSelect, filterBy, order } = this.props;
    const { filterByOpen, orderOpen, search } = this.state;
    return (
      <div>
        <div style={styles.sidebar.container}>
          <div style={styles.sidebar.countContainer}>
            <p style={styles.sidebar.count}>{submissions.length} of {submissions.length} Submission{submissions.length === 1 ? '' : 's'}</p>
          </div>
          <div style={styles.sidebar.searchContainer}>
            <input style={styles.sidebar.search} type='text' value={search}
              onChange={evt => this.setState({ search: evt.target.value })}
              placeholder='Search' />
            <button onClick={() => this.props.onSearchChange(search)}
              style={[styles.sidebar.filterButton, styles.sidebar.filterLeftButton]}><FaSearch /></button>
            <button onClick={this.onFilterByToggle.bind(this, true)}
              style={[styles.sidebar.filterButton, styles.sidebar.filterRightButton]}><FaFilter /></button>
            <button onClick={this.onOrderToggle.bind(this, true)}
              style={[styles.sidebar.filterButton, styles.sidebar.filterAsideButton]}><FaLongArrowUp /><FaLongArrowDown /></button>
          </div>
          <FilterDropdown open={filterByOpen}
            filterBy={filterBy}
            onToggle={this.onFilterByToggle.bind(this)}
            onChange={this.props.onFilterByChange} />

          <OrderDropdown open={orderOpen}
            filterBy={order}
            onToggle={this.onOrderToggle.bind(this)}
            onChange={this.props.onOrderChange} />
        </div>
        <div>{this.listSubmissions(submissions, activeSubmission, onSelect)}</div>
      </div>
    );
  }
}

const FilterByOptions = {
  'default': 'Default (flagged submissions hidden)',
  'bookmarked': 'Bookmarked',
  'flagged': 'Flagged',
  'all': 'All (including flagged submissions)'
};

@Radium
@onClickOutside
class FilterDropdown extends Component {
  handleClickOutside() {
    this.props.onToggle(false);
  }

  render() {
    const { filterBy='', onChange, open=false } = this.props;
    return (
      <div style={styles.filterBy.container(open)}>
        <p style={styles.filterBy.current}>{FilterByOptions[filterBy]}</p>
        {Object.keys(FilterByOptions).map(value => (
          <RadioButton style={styles.filterBy.radio}
            checked={filterBy === value ? 'checked' : null}
            label={FilterByOptions[value]} value={value}
            onClick={() => onChange(value)} />
        ))}
      </div>
    );
  }
}

const OrderOptions = {
  'desc': 'Newest submission first',
  'asc': 'Oldest submission first'
};

@Radium
@onClickOutside
class OrderDropdown extends Component {
  handleClickOutside() {
    this.props.onToggle(false);
  }

  render() {
    const { order='desc', onChange, open=false } = this.props;
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
  },
  container: {
    display: 'flex'
  },
  sidebar: {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      minWidth: 300,
      marginBottom: 10,
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)'
    },
    icon: {
      marginLeft: 3
    },
    count: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: settings.darkGrey
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
      border: '3px solid ' + settings.grey
    },
    filterButton: {
      width: 35,
      height: 35,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
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
      margin: 10,
      marginTop: 0
    }
  }
};
