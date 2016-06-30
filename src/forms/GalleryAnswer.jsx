import React, {PropTypes} from 'react';
import Radium from 'radium';
import moment from 'moment';
import Delete from 'react-icons/lib/md/delete';
import Edit from 'react-icons/lib/md/edit';

import Button from 'components/Button';

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

    return (
      <div style={styles.base}>
        <p>Added to Gallery > {moment(gallery.date_updated).format('D MMM YYYY')}</p>
        <p>Gallery id: {gallery ? gallery.id : 'loading gallery'}</p>

        {
          answer.answer.edited ?
          (
            <div>
              <p style={styles.editHighlight}>Edit:</p>
              <p style={styles.answerText}>{answer.answer.edited}</p>
            </div>
          ) :
          null
        }
        <div>
          <Button
            style={styles.editButton}
            category="info"
            size="small"
            onClick={this.editAnswer.bind(this)}>
            Edit <Edit />
          </Button>
          <Button
            category="warning"
            onClick={this.removeSubmission.bind(this)}
            size="small">
            Remove From Gallery <Delete />
          </Button>
        </div>
      </div>
    );
  }
}

/*

<Card key={i}>
  <p style={styles.answerText}>{answer.answer.answer.text}</p>
    {/*
    <p>Answer id: {answer.answer_id}</p>
    <p>widget id: {answer.answer.widget_id}</p>
    <p>submission id: {answer.submission_id}</p>
    }
</Card>

*/

const styles = {
  base: {
    padding: 20,
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
    marginBottom: 15
  }
};
