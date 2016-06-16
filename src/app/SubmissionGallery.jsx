import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {
  fetchForm,
  fetchGallery,
  fetchSubmissions,
  removeFromGallery,
  updateFormStatus,
  updateEditableAnswer,
  editAnswer,
  cancelEdit,
  beginEdit
} from 'forms/FormActions';
import {Link} from 'react-router';
import moment from 'moment';

import settings from 'settings';
import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import ContentHeader from 'components/ContentHeader';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

import Delete from 'react-icons/lib/md/delete';
import Edit from 'react-icons/lib/md/edit';

import TextField from 'components/forms/TextField';
import Checkbox from 'components/forms/Checkbox';
import Button from 'components/Button';
import Modal from 'components/modal/Modal';

@connect(state => state.forms)
@Radium
export default class SubmissionGallery extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchForm(this.props.params.id));
    // for the nav to have the correct count of submissions for this form/gallery
    this.props.dispatch(fetchSubmissions(this.props.params.id));
    this.props.dispatch(fetchGallery(this.props.params.id));
  }

  removeSubmission(galleryId, submissionId, answerId) {
    this.props.dispatch(removeFromGallery(galleryId, submissionId, answerId));
  }

  beginEditAnswer(galleryId, submissionId, answerId) {
    this.props.dispatch(beginEdit(galleryId, submissionId, answerId));
  }

  renderGallery(gallery) {
    return gallery.answers.map((answer, i) => {
      return (
        <Card key={i}>
          <p>Added to Gallery > {moment(gallery.date_updated).format('D MMM YYYY')}</p>
          <p style={styles.answerText}>{answer.answer.answer.text}</p>
            <p>Gallery id: {gallery ? gallery.id : 'loading gallery'}</p>
            {/*
            <p>Answer id: {answer.answer_id}</p>
            <p>widget id: {answer.answer.widget_id}</p>
            <p>submission id: {answer.submission_id}</p>
            */}
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
              onClick={this.beginEditAnswer.bind(this, gallery.id, answer.submission_id, answer.answer_id)}>
              Edit <Edit />
            </Button>
            <Button
              category="warning"
              onClick={this.removeSubmission.bind(this, gallery.id, answer.submission_id, answer.answer_id)}
              size="small">
              Remove From Gallery <Delete />
            </Button>
          </div>
        </Card>
      );
    });
  }

  renderBlank() {
    if (this.props.loadingGallery) {
      return (<p>Loading submissions...</p>);
    }

    if (this.props.formLoading && !this.props.activeForm) {
      return (<p>Loading form...</p>);
    }

    return (
      <p>
        There are currently no items in your gallery.
        You may add items by visiting <Link to={`/forms/${this.props.activeForm}/submissions`}>
        Review Submissions
        </Link>
      </p>
    );
  }

  updateFormStatus(option) {
    this.props.dispatch(updateFormStatus(this.props.activeForm, option.value));
  }

  getAttributionFields(form) {

    if (! form || ! form.steps) {
      return [];
    }

    const fields = form.steps.map(step => {
      return step.widgets.filter(widget => widget.identity);
    });

    // flatten the array we just created
    return [].concat(...fields);
  }

  confirmEdit(answer) {
    this.props.dispatch(editAnswer(this.props.editableAnswer, answer, this.props.activeForm));
  }

  cancelEdit() {
    this.props.dispatch(cancelEdit());
  }

  updateEditableAnswer(e) {
    this.props.dispatch(updateEditableAnswer(e.currentTarget.value));
  }

  showIdentityAnswers(answer) {
    return answer.identity_answers.map(a => {
      return <TextField label={a.question} value={a.answer.text} />;
    });
  }

  render() {

    const form = this.props[this.props.activeForm];
    const gallery = this.props[this.props.activeGallery];
    const submissions = this.props.submissionList.map(id => this.props[id]);
    const ans = this.props[this.props.answerBeingEdited];

    const attributionFields = this.getAttributionFields(form);

    return (
      <Page>
        <FormChrome
          activeTab="gallery"
          updateStatus={this.updateFormStatus.bind(this)}
          form={form}
          submissions={submissions}
          gallery={gallery} />
        <div style={styles.base}>
          <ContentHeader title={'Submission Gallery'} />
          <div style={styles.container}>
            <div style={styles.sidebar}>
              <Card>
                <CardHeader>Author Attribution</CardHeader>

                {attributionFields.map(function (field, i) {
                  return <Checkbox key={i} label={field.title} />;
                })}


              </Card>
              <Card>
                <CardHeader>Gallery Settings</CardHeader>
                <Button category="primary" size="small">Publish Gallery/Updates</Button>
                <p>Embed Code</p>
                <textarea style={styles.embedCode}></textarea>
              </Card>
            </div>
            <div style={styles.gallery}>
              {
                this.props.activeGallery ?
                this.renderGallery(gallery) :
                this.renderBlank()
              }
            </div>

          </div>

        </div>
        {
          ans ?
            <Modal
              title="Edit Submission for Gallery"
              isOpen={!!ans}
              confirmAction={this.confirmEdit.bind(this, ans)}
              cancelAction={this.cancelEdit.bind(this)}>
              <div style={styles.modalBody}>
                <div style={styles.original}>
                  <h3 style={styles.modalHeading}>Original Text</h3>
                    <div>
                      <p style={styles.editHighlight}>{ans.answer.question}</p>
                      <p>{ans.answer.answer.text}</p>
                    </div>
                </div>
                <div style={styles.modified}>
                  <h3 style={styles.modalHeading}>Edit</h3>
                  <p>Submission</p>
                    <div>
                      <textarea
                        style={styles.editText}
                        onChange={this.updateEditableAnswer.bind(this)}
                        value={this.props.editableAnswer}></textarea>
                      {this.showIdentityAnswers(ans)}
                    </div>
                </div>
              </div>
            </Modal>
          : null
        }
      </Page>
    );
  }
}

const styles = {
  base: {
    marginTop: 40
  },
  embedCode: {
    width: '100%',
    height: 100
  },
  container: {
    display: 'flex'
  },
  sidebar: {
    flex: 1,
    marginRight: 10
  },
  gallery: {
    flex: 3
  },
  editButton: {
    marginRight: 10
  },

  modalBody: {
    display: 'flex'
  },
  modalHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  original: {
    flex: 1
  },
  modified: {
    flex: 1,
    marginLeft: 20
  },
  editHighlight: {
    backgroundColor: settings.grey,
    padding: '5px 10px',
    borderRadius: 4,
    marginBottom: 8,
    color: 'white',
    display: 'inline-block'
  },
  editText: {
    width: '100%',
    height: 100,
    fontSize: '16px'
  },
  answerText: {
    marginBottom: 10,
    fontSize: '16px'
  }
};
