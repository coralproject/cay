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
  fetchForm } from 'forms/FormActions';

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

    this.state = {subPageOffset: 0};
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

  render() {

    const { submissionList, activeSubmission, activeForm, activeGallery } = this.props.forms;
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

@Radium
class Sidebar extends Component {

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
    console.log('offset', this.state.subPageOffset);
  }

  render() {
    const { submissions, activeSubmission, onSelect} = this.props;
    return (
      <div>
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
        <div style={styles.sidebar.pagination}>
          <div
            onClick={this.paginate.bind(this, 0)}
            key="alpha"
            style={styles.sidebar.arrow}>«</div>
          <div
            onClick={this.paginate.bind(this, this.state.subPageOffset - 1)}
            key="bravo"
            style={styles.sidebar.arrow}>‹</div>
          <div key="charlie">Page</div>
          <div
            onClick={this.paginate.bind(this, this.state.subPageOffset + 1)}
            key="delta"
            style={styles.sidebar.arrow}>›</div>
          <div
            onClick={this.paginate.bind(this, this.state.subsCount % 10)}
            key="echo"
            style={styles.sidebar.arrow}>»</div>
        </div>
      </div>
    );
  }
}

const styles = {
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
    pagination: {
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
      ':hover': {
        color: '#000',
        backgroundColor: settings.grey
      }
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
