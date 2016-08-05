import React, {PropTypes} from 'react';
import Radium from 'radium';
import has from 'lodash/object/has';
import isString from 'lodash/lang/isString';
import isDate from 'lodash/lang/isDate';
import moment from 'moment';
import Trash from 'react-icons/lib/fa/trash';
import Edit from 'react-icons/lib/fa/pencil-square';
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up';
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down';

import settings from 'settings';
import GalleryAnswerMulti from 'forms/GalleryAnswerMulti';
import GalleryAnswerDate from 'forms/GalleryAnswerDate';
import GalleryAnswerNumber from 'forms/GalleryAnswerNumber';
import GalleryAnswerText from 'forms/GalleryAnswerText';

@Radium
export default class GalleryAnswer extends React.Component {

  static propTypes = {
    gallery: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    position: PropTypes.number.isRequired,
    editAnswer: PropTypes.func.isRequired,
    removeSubmission: PropTypes.func.isRequired,
    answer: PropTypes.shape({
      answer: PropTypes.shape({
        props: PropTypes.object.isRequired
      })
    }).isRequired,
    onMoveAnswerUp: PropTypes.func.isRequired,
    onMoveAnswerDown: PropTypes.func.isRequired
  }

  editAnswer() {
    const {gallery, answer} = this.props;
    this.props.editAnswer(gallery.id, answer.submission_id, answer.answer_id);
  }

  removeSubmission() {
    const {gallery, answer} = this.props;
    this.props.removeSubmission(gallery.id, answer.submission_id, answer.answer_id);
  }

  render() {

    const { answer, gallery, identifiableIds, onMoveAnswerUp, onMoveAnswerDown, position } = this.props;
    let answerComponent;

    console.log('GalleryAnswer answer', answer);
    const statusFlag = answer.answer.edited ? 'edited' : 'new';

    if (has(answer, 'answer.props.options') && Array.isArray(answer.answer.props.options)) {
      console.log('mulitple choice');
      answerComponent = <GalleryAnswerMulti answer={answer.answer} />;
    } else if (typeof answer.answer.answer.value !== 'undefined') {

      const possibleDateValue = new Date(answer.answer.answer.value);
      if (isString(answer.answer.answer.value) && isDate(possibleDateValue) && !isNaN(possibleDateValue)) {
        console.log('date');
        answerComponent = <GalleryAnswerDate answer={answer.answer} />;
      } else {
        console.log('number');
        answerComponent = <GalleryAnswerNumber answer={answer.answer} />;
      }

    } else {
      console.log('text');
      answerComponent = <GalleryAnswerText answer={answer.answer} />;
    }



    if (!gallery) {
      return <p>Loading gallery...</p>;
    }
    return (
      <div style={styles.base}>
        <div style={styles.leftColumn}>
          <p style={styles.heading}><span style={styles.statusFlag}>{statusFlag}</span> Added to Gallery <span style={styles.date}>{moment(gallery.date_created).format('D MMM YYYY H:ma')}</span></p>
          {
            answer.identity_answers && (
              <p style={styles.identityAnswers}>
                {answer.identity_answers
                  .filter(iid => identifiableIds.indexOf(iid.widget_id) !== -1)
                  .map(a => {
                    return a.edited ? a.edited : a.answer.text;
                  }).join(' ')}
              </p>
            )
          }
          {answerComponent}
        </div>
        <div style={styles.rightColumn}>
          <div style={styles.modButtons}>
            <div
              className='trashButton'
              onClick={this.removeSubmission.bind(this)}
              style={styles.iconHolder}
              key="foo">
              <Trash style={styles.icon} />
            </div>
            <div onClick={() => onMoveAnswerUp(position)}
              style={styles.iconHolder} key="bar">
              <FaArrowCircleUp style={styles.icon} />
            </div>
            <div
              onClick={() => onMoveAnswerDown(position)}
              style={styles.iconHolder} key="baz">
              <FaArrowCircleDown style={styles.icon} />
            </div>
          </div>
          <div
            className='editButton'
            style={styles.editButton}
            size="small"
            onClick={this.editAnswer.bind(this)}>
            <Edit style={styles.icon} /> Edit
          </div>
        </div>

      </div>
    );
  }
}

const styles = {
  base: {
    padding: 20,
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
    marginBottom: 15,
    display: 'flex'
  },
  leftColumn: {
    flex: 1
  },
  rightColumn: {
    minWidth: 200,
    maxWidth: 200,
    textAlign: 'right'
  },
  editHighlight: {
    backgroundColor: settings.grey,
    padding: '5px 10px',
    borderRadius: 4,
    marginBottom: 8,
    color: 'white',
    display: 'inline-block'
  },
  answerText: {
    marginBottom: 10,
    fontSize: '16px'
  },
  editButton: {
    marginRight: 10,
    display: 'inline-block',
    backgroundColor: settings.lightGrey,
    padding: 10,
    cursor: 'pointer',
    borderRadius: 4,
    ':hover': {
      backgroundColor: settings.mediumGrey
    }
  },
  heading: {
    fontSize: '18px',
    color: settings.darkGrey,
    letterSpacing: '0.03em',
    marginBottom: 10
  },
  statusFlag: {
    color: settings.brandColor,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  date: {
    fontWeight: 'bold'
  },
  icon: {
    width: 30,
    height: 30,
    fill: settings.grey
  },
  iconHolder: {
    display: 'inline-block',
    cursor: 'pointer',
    borderRadius: 4,
    padding: 8,
    ':hover': {
      fill: 'black',
      backgroundColor: settings.lightGrey
    }
  },
  identityAnswers: {
    color: settings.grey,
    fontStyle: 'italic',
    marginBottom: 10
  },
  modButtons: {
    textAlign: 'right',
    marginBottom: 10
  }
};
