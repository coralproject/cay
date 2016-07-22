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
import { FilterDropdown, OrderDropdown } from 'forms/SubmissionFilters';
import Pagination from 'components/lists/Pagination';

import {
  fetchSubmissions,
  fetchGallery,
  setActiveSubmission,
  updateSubmissionFlags,
  sendToGallery,
  removeFromGallery,
  updateFormStatus,
  fetchForm,
  updateOrder,
  updateSearch,
  updateFilterBy,
  cleanSubmissionFilters,
  hasFlag
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
    this.props.dispatch(updateSubmissionFlags({ flagged }));
  }

  onBookmark(bookmarked) {
    this.props.dispatch(updateSubmissionFlags({ bookmarked }));
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
      submissionFilterBy, submissionOrder, formCounts } = this.props.forms;
    const submissions = submissionList.map(id => this.props.forms[id]);
    const submission = this.props.forms[activeSubmission];
    const form = this.props.forms[activeForm];
    const gallery = this.props.forms[activeGallery];

    return (
      <Page style={styles.page}>
        <div style={styles.container}>
          <FormChrome
            activeTab="submissions"
            updateStatus={this.updateFormStatus.bind(this)}
            gallery={gallery}
            submissions={submissions}
            form={form}/>
          <Sidebar
            form={form}
            formCounts={formCounts}
            submissions={submissions.reverse()}
            activeSubmission={activeSubmission}
            filterBy={submissionFilterBy}
            order={submissionOrder}
            onSelect={this.onSubmissionSelect.bind(this)}
            onFilterByChange={this.onFilterByChange.bind(this)}
            onOrderChange={this.onOrderChange.bind(this)}
            onSearchChange={this.onSearchChange.bind(this)}
            onFlag={this.onFlag.bind(this)}
            onBookmark={this.onBookmark.bind(this)}
            onSelect={this.onSubmissionSelect.bind(this)} />
          <SubmissionDetail
            submission={submission}
            submissionId={submissionList.length - submissionList.indexOf(activeSubmission)}
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

@connect()
@Radium
class Sidebar extends Component {

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
            styles.sidebar.submissionContainer,
            submission.id === activeSubmission && styles.sidebar.activeSubmission
          ]} key={key}>
          <span style={{fontWeight: 'bold'}}>{key + 1}</span>
          <span>{moment(submission.date_updated).format('L LT')}</span>
          <div>
            <span key={`${key}-0`} style={[styles.sidebar.iconContainer(hasFlag(submission, 'flagged'),
              submission.id === activeSubmission),styles.sidebar.iconFlagged]}
              onClick={() => this.props.onFlag(!hasFlag(submission, 'flagged'))}>
              <BFlag style={styles.sidebar.icon(hasFlag(submission, 'flagged'))} /></span>

            <span key={`${key}-1`} style={[styles.sidebar.iconContainer(hasFlag(submission, 'bookmarked'),
              submission.id === activeSubmission), styles.sidebar.iconBookmarked]}
              onClick={() => this.props.onBookmark(!hasFlag(submission, 'bookmarked'))}>
              <BBookmark style={styles.sidebar.icon(hasFlag(submission, 'bookmarked'))}/>
              </span>
          </div>
        </div>
      );
    });
  }

  paginate(requestedPage) {
    const { form } = this.props;

    if (requestedPage >= 0 && requestedPage <= Math.floor(form.stats.responses / 10)) {
      this.props.dispatch(fetchSubmissions(form.id, requestedPage)).then(() => {
        this.setState({subPageOffset: requestedPage});
      });
    }
  }

  render() {
    const { submissions, activeSubmission, onSelect, filterBy, order, form, formCounts } = this.props;
    const { filterByOpen, orderOpen, search, subPageOffset } = this.state;

    return (
      <div style={styles.sidebar}>
        <div style={styles.sidebar.container}>
          <div style={styles.sidebar.countContainer}>
            <p style={styles.sidebar.count}>{formCounts.totalSearch} of {formCounts.totalSubmissions} Submission{formCounts.totalSubmissions === 1 ? '' : 's'}</p>
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
            onChange={this.props.onFilterByChange}
            counts={this.props.formCounts} />

          <OrderDropdown open={orderOpen}
            order={order}
            onToggle={this.onOrderToggle.bind(this)}
            onChange={this.props.onOrderChange} />
        </div>
        <div>{this.listSubmissions(submissions, activeSubmission, onSelect)}</div>
        { form ? <Pagination current={subPageOffset}
          total={Math.ceil(form.stats.responses / 10)}
          onChange={this.paginate.bind(this)} /> : null }
      </div>
    );
  }
}

const styles = {
  page: {
    position: 'absolute',
    top: 50,
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    display: 'flex',
    height: '100%'
  },
  sidebar: {
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
