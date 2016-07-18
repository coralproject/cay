import React, {PropTypes} from 'react';
import Radium from 'radium';
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

  render() {

    const {answer, gallery} = this.props;

    // console.log('answer', answer);
    // console.log('gallery', gallery);

    const text = answer.answer.edited ? answer.answer.edited : answer.answer.answer.text;
    const statusFlag = answer.answer.edited ? 'edited' : 'new';

    if (!gallery) {
      return <p>Loading gallery...</p>;
    }

    return (
      <div style={styles.base}>
        <div style={styles.leftColumn}>
          <p style={styles.heading}><span style={styles.statusFlag}>{statusFlag}</span> Added to Gallery <span style={styles.date}>{moment(gallery.date_updated).format('D MMM YYYY H:ma')}</span></p>
          {
            answer.identity_answers && (
              <p style={styles.identityAnswers}>
                {answer.identity_answers.map(a => a.answer.text).join(' ')}
              </p>
            )
          }
          <p style={styles.answerText}>{text}</p>
        </div>
        <div style={styles.rightColumn}>
          <div style={styles.modButtons}>
            <div
              onClick={this.removeSubmission.bind(this)}
              style={styles.iconHolder}
              key="foo">
              <Trash style={styles.icon} />
            </div>
            <div style={styles.iconHolder} key="bar">
              <FaArrowCircleUp style={styles.icon} />
            </div>
            <div style={styles.iconHolder} key="baz">
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
  }
};
