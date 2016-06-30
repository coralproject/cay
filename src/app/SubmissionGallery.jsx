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

import settings from 'settings';
import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import ContentHeader from 'components/ContentHeader';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

import TextField from 'components/forms/TextField';
import Checkbox from 'components/forms/Checkbox';
import Button from 'components/Button';
import Modal from 'components/modal/Modal';

import GalleryAnswer from 'forms/GalleryAnswer';

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
        <GalleryAnswer
          removeSubmission={this.removeSubmission.bind(this)}
          editAnswer={this.beginEditAnswer.bind(this)}
          answer={answer}
          gallery={gallery}
          key={i} />
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
