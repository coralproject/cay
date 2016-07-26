import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';
import moment from 'moment';
import Trash from 'react-icons/lib/fa/trash';
import Edit from 'react-icons/lib/fa/pencil-square';
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up';
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down';

import settings from 'settings';

@Radium
export default class GalleryAnswer extends React.Component {

  static propTypes = {
    editAnswer: PropTypes.func.isRequired,
    removeSubmission: PropTypes.func.isRequired
  }

  editAnswer() {
    const {gallery, answer} = this.props;
    this.props.editAnswer(gallery.id, answer.submission_id, answer.answer_id);
  }

  removeSubmission() {
    const {gallery, answer} = this.props;
    this.props.removeSubmission(gallery.id, answer.submission_id, answer.answer_id);
  }

  renderMultipleChoice(answer) {
    const selectedIndexes = answer.answer.answer.options.map(o => o.index);
    const options = answer.answer.props.options.map((option, key) => {
      const selected = selectedIndexes.indexOf(key) !== -1;
      return <li style={[styles.multiple.option, selected && styles.multiple.selected]} key={key}>{key + 1}. {option.title}</li>;
    });

    // check for Other answer
    if (_.last(selectedIndexes) >= answer.answer.props.options.length) {
      options.push(
        <li
          style={[styles.multiple.option, styles.multiple.other]}
          key={_.last(selectedIndexes)}>
          Other: {_.last(answer.answer.answer.options).title}
        </li>
      );
    }

    return <ul style={styles.multiple}>{options}</ul>;
  }

  render() {

    const { answer, gallery, identifiableIds, onMoveAnswerUp, onMoveAnswerDown, key } = this.props;
    let multipleChoice;

    if (_.has(answer, 'answer.props.multipleChoice') && answer.answer.props.multipleChoice) {
      multipleChoice = this.renderMultipleChoice(answer);
    }

    let unedited = answer.answer.answer.value ? answer.answer.answer.value : answer.answer.answer.text;
    let text = answer.answer.edited ? answer.answer.edited : unedited;
    const statusFlag = answer.answer.edited ? 'edited' : 'new';

    // render as a formatted Date if possible
    const possibleDateValue = new Date(text);
    if (_.isString(answer.answer.answer.value) && _.isDate(possibleDateValue) && !isNaN(possibleDateValue)) {
      text = moment(possibleDateValue).format('D MMM YYYY');
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
          {
            multipleChoice
            ? multipleChoice
            : <p style={styles.answerText}>{text}</p>
          }
        </div>
        <div style={styles.rightColumn}>
          <div style={styles.modButtons}>
            <div
              onClick={this.removeSubmission.bind(this)}
              style={styles.iconHolder}
              key="foo">
              <Trash style={styles.icon} />
            </div>
            <div onClick={() => onMoveAnswerUp(key)}
              style={styles.iconHolder} key="bar">
              <FaArrowCircleUp style={styles.icon} />
            </div>
            <div
              onClick={() => onMoveAnswerDown(key)}
              style={styles.iconHolder} key="baz">
              <FaArrowCircleDown style={styles.icon} />
            </div>
          </div>
          <div
            style={styles.editButton}
            category="info"
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
  },
  multiple: {
    option: {
      width: '49%',
      marginRight: '1%',
      padding: 10,
      display: 'inline-block',
      marginBottom: 8,
      borderRadius: 4,
      backgroundColor: 'white',
      border: '1px solid ' + settings.mediumGrey
    },
    selected: {
      backgroundColor: settings.darkerGrey,
      color: 'white'
    },
    other: {
      width: '99%',
      backgroundColor: settings.darkerGrey,
      color: 'white'
    }
  }
};
