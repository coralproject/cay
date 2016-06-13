
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import moment from 'moment';
import WFlag from 'react-icons/lib/fa/flag-o';
import WBookmark from 'react-icons/lib/fa/bookmark-o';
import BFlag from 'react-icons/lib/fa/flag';
import BBookmark from 'react-icons/lib/fa/bookmark';
import Button from 'components/Button';

import {
  fetchSubmissions,
  fetchGallery,
  setActiveSubmission,
  updateSubmission,
  sendToGallery,
  updateFormStatus,
  fetchForm } from 'forms/FormActions';

import FormChrome from 'app/layout/FormChrome';
import Page from 'app/layout/Page';

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

  onFlag(flagged) {
    this.props.dispatch(updateSubmission({ flagged }));
  }

  onBookmark(bookmarked) {
    this.props.dispatch(updateSubmission({ bookmarked }));
  }

  updateFormStatus(option) {
    this.props.dispatch(updateFormStatus(this.props.forms.activeForm, option.value));
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
            submissions={submissions}
            activeSubmission={submission}
            onSelect={this.onSubmissionSelect.bind(this)} />
          <SubmissionDetail
            submission={submission}
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
            submission.id === activeSubmission.id && styles.sidebar.activeSubmission
          ]} key={key}>
          <span>{submissions.length - key}</span>
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
    const { submissions, activeSubmission, onSelect} = this.props;
    return (
      <div style={styles.sidebar.container}>
        <div style={styles.sidebar.countContainer}>
          <p style={styles.sidebar.count}>{submissions.length}</p>
          <p style={styles.sidebar.count}>Submission{submissions.length === 1 ? '' : 's'}</p>
        </div>
        <input style={styles.sidebar.search} type='text' placeholder='Search' />
        <div style={styles.sidebar.sortContainer}>
          <select style={[styles.sidebar.sort, styles.sidebar.firstSort]}>
            <option>View All</option>
          </select>

          <select style={styles.sidebar.sort}>
            <option>Newest First</option>
          </select>
        </div>
        <div>{this.listSubmissions(submissions, activeSubmission, onSelect)}</div>
      </div>
    );
  }
}

@Radium
class SubmissionDetail extends Component {
  render() {
    const { submission } = this.props;

    console.log("Sub detail:", submission);

    if(!submission) {
      console.log("====> No submissions!");
      return (<h1 style={styles.detail.container}>No submissions</h1>);
    }

    return (
      <div style={styles.detail.container}>
        {this.renderAuthorDetail()}
        {this.renderAnswers()}
      </div>
    );
  }

  renderAnswers() {
    const { submission, gallery } = this.props;

    console.log("render submission", submission, gallery);

    if (!submission) {
      return (<p>loading submission...</p>);
    }

    if (!gallery) {
      return (<p>Loading gallery...</p>);
    }

    console.log("got past gallery");

    const answers = gallery.answers.map(ans => ans.answer_id);

    return (
      <div style={styles.detail.answersContainer}>
        {submission.replies.map((reply, key) => {

          // identity fields are shown above, not as part of 
          //   the reply list
          if (reply.identity === true) {
            return (<span></span>);
          }

          const inGallery = answers.indexOf(reply.widget_id) !== -1;

          console.log("Rendering reply:",  reply);

          return (
            <div style={styles.detail.questionContainer} key={key}>
              <h2 style={styles.detail.question}>{reply.question}</h2>
              <p>{this.renderAnswer(reply.answer)}</p>
              <p>galleryId: {gallery ? gallery.id : 'loading gallery'}</p>
              <p>submissionId: {submission.id}</p>
              <p>widget id: {reply.widget_id}</p>
              <Button
                style={styles.detail.galleryButton}
                category={inGallery ? 'success' : 'primary'}
                size="small"
                onClick={() => this.props.sendToGallery(gallery.id, submission.id, reply.widget_id)}>
                {inGallery ? 'In Gallery' : 'Send to gallery'}
              </Button>
            </div>
          );
        })}
      </div>
    );
  }

  renderAnswer(answer = {}) {
    if (answer === null) {
      return (<span>No response</span>);
    }

    if (answer.options) {
      return (
        <ul>
          {answer.options.map(option => (
            <li>- {option.title}</li>
          ))}
        </ul>
      );
    }

    if (answer.text) {
      return answer.text;
    }

    return answer;
  }

  renderAuthorDetail() {
    const { submission, onFlag, onBookmark } = this.props;
    const author = submission.author || {};

    // author details come from form responses flagged as identity: true
    //   Note, this should be abstracted probably to a reducer
    var authorDetails = [];
    for (var i in submission.replies) {
      var thisReply = submission.replies[i];
      if (thisReply.identity === true) {
        authorDetails.push({
          label: thisReply.question,
          answer: this.renderAnswer(thisReply.answer)
        });
      }
    }

    return (
      <div>
        <div style={styles.detail.headerContainer}>
          <span>{moment(submission.date_updated).format('L LT')}</span>
          <div>
            <span style={styles.sidebar.icon}>
              {submission.flagged ?
                <BFlag style={styles.detail.action} onClick={() => onFlag(false)}/> :
                <WFlag style={styles.detail.action} onClick={() => onFlag(true)}/> }
            </span>
            <span style={styles.sidebar.icon}>
              {submission.bookmarked ?
                <BBookmark style={styles.detail.action} onClick={() => onBookmark(false)}/> :
                <WBookmark style={styles.detail.action} onClick={() => onBookmark(true)}/>
              }
            </span>
          </div>
        </div>
        <div style={styles.detail.submissionContainer}>
          <div style={styles.detail.authorContainer}>
            <h2 style={styles.detail.authorTitle}>Submission Author Information</h2>
            <div style={styles.detail.authorDetailsContainer}>
              <div style={styles.detail.authorDetailsColumn}>
                {
                  authorDetails.map(function(detail) {
                    return (<p>{detail.label}: {detail.answer}</p>)
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  detail: {
    galleryButton: {
      float: 'right'
    },
    questionContainer: {
      marginBottom: 20
    },
    action: {
      cursor: 'pointer'
    },
    answersContainer: {
      padding: '0 50px 50px 50px'
    },
    question: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      marginBottom: 10
    },
    authorDetailsContainer: {
      display: 'flex',
      paddingTop: 10
    },
    authorDetailsColumn: {
      flex: 1
    },
    container: {
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
      margin: '0 30px 30px 30px'
    },
    submissionContainer: {
      padding: 50
    },
    headerContainer: {
      paddingBottom: 8,
      borderBottom: '3px solid #aaa',
      display: 'flex',
      justifyContent: 'space-between'
    },
    authorContainer: {
      padding: 15,
      backgroundColor: '#ddd'
    },
    authorTitle: {
      fontSize: '1.2em'
    }
  },
  container: {
    display: 'flex',
    marginTop: 40
  },
  sidebar: {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    icon: {
      marginLeft: 3
    },
    count: {
      textAlign: 'center',
      fontSize: '1.5em'
    },
    countContainer: {
      marginBottom: 20
    },
    search: {
      height: 25,
      marginBottom: 20
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
      borderRadius: 2,
      backgroundColor: '#ddd',
      marginBottom: 5,
      padding: 8,
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#bbb'
      }
    },
    activeSubmission: {
      backgroundColor: '#bbb'
    }
  }
};
