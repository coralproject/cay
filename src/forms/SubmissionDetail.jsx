import React, { Component } from 'react';
import Radium from 'radium';
import moment from 'moment';
import isString from 'lodash/lang/isString';
import isDate from 'lodash/lang/isDate';
import SubmissionTagsManager from 'forms/SubmissionTagsManager';

import settings from 'settings';
import { Button, Icon, Card, CardTitle, CardActions, CardText } from 'react-mdl';
import { hasFlag, updateSubmissionFlags } from 'forms/FormActions';

import { CoralButton, CoralIcon } from '../components/ui';

@Radium
export default class SubmissionDetail extends Component {
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
      return (<p key="loading-submission">loading submission...</p>);
    }

    if (!gallery) {
      return (<p key="loading-gallery">Loading gallery...</p>);
    }

    return (
      <div style={styles.answersContainer}>
        <div style={styles.answers}>
          {submission.replies.map((reply, key) => {
            
            // To filter null dates from the replies.
            if (reply.answer.value === '--') {
              return null;
            }

            // identity fields are shown above, not as part of
            //   the reply list
            if (reply.identity === true) {
              return (<span key={key}></span>);
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
              <Card style={styles.answerCard} key={key}>
                <CardTitle>{reply.question}</CardTitle>
                <CardText>{this.renderAnswer(reply)}</CardText>
                <CardActions style={styles.answerActions}>
                  <CoralButton
                    type="violet"
                    icon={inGallery ? 'delete' : 'send'}
                    active={inGallery}
                    onClick={modAnswer.bind(this, gallery.id, submission.id, reply.widget_id)}
                  >
                    { inGallery ? 'Remove from Gallery' : 'Send to gallery' }
                  </CoralButton>
                </CardActions>
              </Card>
            );
          })}
        </div>
        <SubmissionTagsManager tags={submission.flags}
          onRemoveTag={this.onRemoveTag.bind(this)}
          onAddTagKeyPress={this.onAddTagKeyPress.bind(this)} />
      </div>
    );
  }

  onRemoveTag(tag) {
    this.props.dispatch(updateSubmissionFlags({ [tag]: false }));
  }

  onAddTagKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.dispatch(updateSubmissionFlags({ [e.target.value.trim()]: true }));
      e.target.value = '';
    }
  }

  renderAnswer(reply) {
    if (reply.answer === null) {
      return (<span>No response</span>);
    }

    // wow, this is a gross hack, and it WILL break soon
    const possibleDateValue = new Date(reply.answer.value);

    // render a Date answer
    if (isString(reply.answer.value) && isDate(possibleDateValue) && !isNaN(possibleDateValue)) {
      return moment(possibleDateValue).format('D MMM YYYY');
    }

    if (reply.answer.options) {

      const optionsCopy = reply.props.options.slice();

      // Add "Other" as the last option if allowed
      if (reply.props.otherAllowed) {
        optionsCopy.push({ isOther: true, title: 'Other' });
      }

      var answersByIndex = [];
      const selectedIndexes = reply.answer.options.map(o => {
        answersByIndex[o.index] = o.title;
        return o.index;
      });

      return (
        <ul style={styles.multipleContainer}>
          {optionsCopy.map((option, key) => {
            const selected = selectedIndexes.indexOf(key) !== -1;
            const title = answersByIndex[key] ? answersByIndex[key] : option.title;

            return <li
              style={[styles.multiple, selected && styles.multiple.selected]}
              key={key}>{key + 1}. { title }</li>;
          })}

        </ul>
      );
    }

    // if the date was invalid, just show whatever they entered.
    if ('value' in reply.answer) {
      return reply.answer.value;
    }

    if ('text' in reply.answer) {
      return reply.answer.text;
    }

    return '';
  }

  renderAuthorDetail() {
    const { submission, onFlag, onBookmark } = this.props;
    const authorDetails = submission.replies
      .filter(({ identity }) => identity === true)
      .map(reply => ({
        label: reply.question,
        answer: this.renderAnswer(reply)
      }));

    const [flagged, bookmarked] = [hasFlag(submission, 'flagged'), hasFlag(submission, 'bookmarked')];
    return (
      <div>
        <div style={styles.authorHeaderContainer}>
          <div style={styles.authorHeaderInfo}>
            <span style={styles.subNum}>{submission.number || ''}</span> {moment(submission.date_created).format('L LT')}
          </div>
          <div style={styles.headerButtons}>
            <CoralButton
              style={{ marginRight: 10 }}
              onClick={() => onFlag(!flagged)}
              active={flagged}
              type="custom"
              customColor={settings.flaggedColor}
            >
              <CoralIcon icon='flag' style={styles.headIcon(flagged, settings.flaggedColor)} /> Flag{flagged ? 'ged' : ''}
            </CoralButton>
            <CoralButton
              onClick={() => onBookmark(!bookmarked)}
              active={bookmarked}
              type="custom"
              customColor={settings.bookmarkedColor}
              >
              <CoralIcon icon='bookmark' style={styles.headIcon(bookmarked, settings.bookmarkedColor)} /> Bookmark{bookmarked ? 'ed' : ''}
            </CoralButton>
          </div>
        </div>
        <div style={styles.hr}></div>
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
  answersContainer: {
    padding: '20px 0',
    display: 'flex'
  },
  answers: {
    flex: 1,
    overflow: 'auto'
  },
  authorHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  headerContainer: {
    display: 'inline-block',
    position: 'relative'
  },
  authorHeaderInfo: {
    flex: 1,
    marginRight: 20
  },
  subNum: {
    fontSize: '1.5em',
    marginRight: 10,
    fontWeight: 'bold'
  },
  multipleContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  multiple: {
    border: '1px solid ' + settings.mediumGrey,
    padding: 10,
    minWidth: 150,
    display: 'inline-block',
    width: '49%',
    marginRight: '1%',
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    selected: {
      backgroundColor: settings.grey,
      color: 'white'
    }
  },
  hr: {
    borderBottom: '1px solid ' + settings.mediumGrey,
    marginTop: 8
  },
  answerCard: {
    width: '100%',
    marginBottom: 20,
    border: '1px solid ' + settings.mediumGrey,
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgb(155, 155, 155) 0px 1px 3px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottom: '2px solid rgb(216, 216, 216)'
  },
  headIcon(flagged, color) {
    return { color: flagged ? '#fff': color };
  },
  answerActions: {
    textAlign: 'right'
  }
};
