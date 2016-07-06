import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import WFlag from 'react-icons/lib/fa/flag-o';
import WBookmark from 'react-icons/lib/fa/bookmark-o';
import BBookmark from 'react-icons/lib/fa/bookmark';

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
          var inGallery = false;
          for (var i in gallery.answers) {
            if (gallery.answers[i].answer_id === reply.widget_id &&
                gallery.answers[i].submission_id === submission.id) {
              inGallery = true;
              break;
            }
          }

          return (
            <div style={styles.questionContainer} key={key}>
              <h2 style={styles.question}>{reply.question}</h2>
              <div>{this.renderAnswer(reply.answer)}</div>
              {/*<p>galleryId: {gallery ? gallery.id : 'loading gallery'}</p>
              <p>submissionId: {submission.id}</p>
              <p>widget id: {reply.widget_id}</p>*/}
              <Button
                style={styles.galleryButton}
                category={inGallery ? 'success' : 'primary'}
                size="small"
                onClick={
                  inGallery ?
                    () => this.props.removeFromGallery(gallery.id, submission.id, reply.widget_id) :
                    () => this.props.sendToGallery(gallery.id, submission.id, reply.widget_id)
                }>

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
        <div style={styles.headerContainer}>
          <span>{moment(submission.date_updated).format('L LT')}</span>
          <div>
            <span style={styles.icon}>
              {submission.flagged ?
                <BFlag style={styles.action} onClick={() => onFlag(false)}/> :
                <WFlag style={styles.action} onClick={() => onFlag(true)}/> }
            </span>
            <span style={styles.icon}>
              {submission.bookmarked ?
                <BBookmark style={styles.action} onClick={() => onBookmark(false)}/> :
                <WBookmark style={styles.action} onClick={() => onBookmark(true)}/>
              }
            </span>
          </div>
        </div>
        <div style={styles.submissionContainer}>
          <div style={styles.authorContainer}>
            <h2 style={styles.authorTitle}>Submission Author Information</h2>
            <div style={styles.authorDetailsContainer}>
              <div style={styles.authorDetailsColumn}>
                { authorDetails.map(detail => <div>{detail.label}: {detail.answer}</div>) }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
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
  },
  icon: {
    marginLeft: 3
  }
};
