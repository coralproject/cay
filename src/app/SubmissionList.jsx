import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import moment from 'moment';
import BFlag from 'react-icons/lib/fa/flag';
import BBookmark from 'react-icons/lib/fa/bookmark';

import {
  fetchSubmissions,
  fetchGallery,
  setActiveSubmission,
  updateSubmission,
  sendToGallery,
  removeFromGallery,
  updateFormStatus,
  fetchForm,
  flag } from 'forms/FormActions';

import SubmissionDetail from 'forms/SubmissionDetail';
import FormChrome from 'app/layout/FormChrome';
import Page from 'app/layout/Page';
import settings from 'settings';

@connect(({ forms }) => ({ forms }))
@Radium
export default class SubmissionList extends Component {
  constructor(props) {
    super(props);
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

  onFlag(id, flagged) {
    this.props.dispatch(flag(id, flagged));
  }

  onBookmark(bookmarked) {
    this.props.dispatch(updateSubmission({ bookmarked }));
  }

  updateFormStatus(value) {
    this.props.dispatch(updateFormStatus(this.props.forms.activeForm, value));
  }

  render() {

    const { submissionList, activeSubmission, activeForm, activeGallery } = this.props.forms;
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
            submissions={submissions.reverse()}
            activeSubmission={activeSubmission}
            onSelect={this.onSubmissionSelect.bind(this)} />
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

@connect()
@Radium
class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {subPageOffset: 0};

    const keyPress = (e) => {

      const {activeSubmission, submissions, onSelect} = this.props;

      const subIds = submissions.map(s => s.id);
      const activeIndex = subIds.indexOf(activeSubmission);

      // e.code here since {e} is a synthetic React event
      if (e.code === 'KeyJ' && subIds[activeIndex + 1]) {
        onSelect(subIds[activeIndex + 1]);
      } else if (e.code === 'KeyK' && subIds[activeIndex - 1] && activeIndex !== 0) {
        onSelect(subIds[activeIndex - 1]);
      }
    };

    this.onKeyPress = keyPress.bind(this);
    // if the listener is bound on the next line, removeEventListener doesn't work
    document.addEventListener('keypress', this.onKeyPress, true);
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
            {submission.flagged ? <span style={styles.sidebar.icon}><BFlag/></span> : null}
            {submission.bookmarked ? <span style={styles.sidebar.icon}><BBookmark/></span> : null}
          </div>
        </div>
      );
    });
  }

  paginate(requestedPage) {
    const {form} = this.props;

    if (requestedPage >= 0 && requestedPage <= Math.floor(form.stats.responses / 10)) {
      this.props.dispatch(fetchSubmissions(form.id, requestedPage)).then(() => {
        this.setState({subPageOffset: requestedPage});
      });
    }
  }

  render() {
    const { submissions, activeSubmission, onSelect, form} = this.props;

    return (
      <div style={styles.sidebar}>
        <div style={styles.sidebar.container}>
          <div style={styles.sidebar.countContainer}>
            <p style={styles.sidebar.count}>{submissions.length} Submission{submissions.length === 1 ? '' : 's'}</p>
          </div>
          <input style={styles.sidebar.search} type='text' placeholder='Search' />
          {/*<div style={styles.sidebar.sortContainer}>
            <select style={[styles.sidebar.sort, styles.sidebar.firstSort]}>
              <option>View All</option>
            </select>

            <select style={styles.sidebar.sort}>
              <option>Newest First</option>
            </select>
          </div>*/}
        </div>
        <div>{this.listSubmissions(submissions, activeSubmission, onSelect)}</div>
        {
          form ?
            <div style={styles.sidebar.pagination}>
              <div
                onClick={this.paginate.bind(this, 0)}
                key="alpha"
                style={styles.sidebar.arrow}>«</div>
              <div
                onClick={this.paginate.bind(this, this.state.subPageOffset - 1)}
                key="bravo"
                style={styles.sidebar.arrow}>‹</div>
              <div
                style={styles.sidebar.pageNum}
                key="charlie">Page {this.state.subPageOffset + 1} of {Math.ceil(form.stats.responses / 10)}</div>
              <div
                onClick={this.paginate.bind(this, this.state.subPageOffset + 1)}
                key="delta"
                style={styles.sidebar.arrow}>›</div>
              <div
                onClick={this.paginate.bind(this, Math.floor(form.stats.responses / 10))}
                key="echo"
                style={styles.sidebar.arrow}>»</div>
            </div> :
            null
        }
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
    pagination: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      backgroundColor: settings.bgColorBase,
      display: 'flex',
      justifyContent: 'space-between'
    },
    arrow: {
      width: 32,
      height: 32,
      textAlign: 'center',
      cursor: 'pointer',
      color: settings.grey,
      fontSize: '20px',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      borderRadius: 16,
      lineHeight: '1.5em',
      transition: 'all .3s',
      ':hover': {
        color: '#000',
        backgroundColor: settings.grey
      }
    },
    pageNum: {
      lineHeight: '1.8em'
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
      margin: 10,
      padding: 10,
      fontSize: '16px'
    },
    sortContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    sort: {
      flex: 1
    },
    firstSort: {
      marginRight: 10
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
    }
  }
};
