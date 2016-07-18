import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import BBookmark from 'react-icons/lib/fa/bookmark';
import PaperPlaneIcon from 'react-icons/lib/fa/paper-plane';
import TagsIcon from 'react-icons/lib/fa/tags';
import FlagIcon from 'react-icons/lib/fa/flag';
import TrashIcon from 'react-icons/lib/fa/trash';

import settings from 'settings';
import Button from 'components/Button';

@Radium
export default class SubmissionDetail extends React.Component {
  render() {
    const { submission } = this.props;

    if(!submission) {
      return (<h1 style={styles.container}>No submissions</h1>);
    }

    return (
      <div style={styles.container}>
        {this.renderAuthorDetail()}
        {this.renderAnswers()}
      </div>
    );
  }

  renderAnswers() {
    const { submission, gallery } = this.props;

    if (!submission) {
      return (<p>loading submission...</p>);
    }

    if (!gallery) {
      return (<p>Loading gallery...</p>);
    }

    return (
      <div style={styles.answersContainer}>
        {submission.replies.map((reply, key) => {

          // identity fields are shown above, not as part of
          //   the reply list
          if (reply.identity === true) {
            return (<span></span>);
          }


          // determine whether or not the answers is already
          //  in the gallery
          //  we need to find if BOTH
          //   this submission id matches
          //   and the answer has come form the widget
          const inGallery = gallery.answers.some(ans => {
            return ans.answer_id === reply.widget_id && ans.submission_id === submission.id;
          });

          const modAnswer = inGallery ? this.props.removeFromGallery : this.props.sendToGallery;

          return (
            <div style={styles.answer} key={key}>
              <h2 style={styles.question}>{reply.question}</h2>
              {this.renderAnswer(reply.answer)}
              {/*<p>galleryId: {gallery ? gallery.id : 'loading gallery'}</p>
              <p>submissionId: {submission.id}</p>
              <p>widget id: {reply.widget_id}</p>*/}
              <Button
                style={styles.galleryButton}
                category={inGallery ? 'success' : 'default'}
                onClick={modAnswer.bind(this, gallery.id, submission.id, reply.widget_id)}>
                {
                  inGallery ?
                    <span>Remove from Gallery <TrashIcon /></span> :
                    <span>Send to gallery <PaperPlaneIcon /></span>
                }
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
          {answer.options.map((option, key) => (
            <li key={key}>- {option.title}</li>
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

    var authorDetails = submission.replies.filter(reply => {
      return reply.identity === true;
    }).map(reply => {
      return {label: reply.question, answer: this.renderAnswer(reply.answer)};
    });

    return (
      <div>
        <div style={styles.headerButtons}>
          <Button
            style={styles.headerButton}
            category="primary">Add Tags <TagsIcon /></Button>
          <Button
            style={styles.headerButton}
            onClick={() => onFlag(submission.id, !submission.flagged)}
            category="danger">Flag <FlagIcon /></Button>
          <Button
            style={styles.headerButton}
            onClick={() => onBookmark(!submission.bookmarked)}
            category="success">Bookmark <BBookmark /></Button>
        </div>
        <div style={styles.headerContainer}>
          <span style={styles.subNum}>37</span> {moment(submission.date_updated).format('L LT')}
        </div>
        <div style={styles.submissionContainer}>
          <div style={styles.authorContainer}>
            <div style={styles.authorDetailsContainer}>
              <div style={styles.authorDetailsColumn}>
                { authorDetails.map(detail => {
                  return (
                    <p style={styles.identity}><span style={styles.identity.label}>{detail.label}</span> {detail.answer}</p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  identity: {
    fontSize: '16px',
    marginBottom: 10,
    label: {
      fontWeight: 'bold'
    }
  },
  galleryButton: {
    float: 'right',
    marginTop: 10,
    marginBottom: 20
  },
  answersContainer: {
    padding: '0 50px 50px 50px'
  },
  question: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginBottom: 10
  },
  answer: {
    clear: 'both'
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
    display: 'inline-block',
    paddingBottom: 8,
    borderBottom: '1px solid ' + settings.mediumGrey,
    position: 'relative'
  },
  headerButtons: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  headerButton: {
    marginLeft: 10
  },
  authorContainer: {

  },
  subNum: {
    fontSize: '2.2em',
    fontWeight: 'bold'
  }
};
