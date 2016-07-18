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
  publishGallery,
  editAnswer,
  cancelEdit,
  beginEdit
} from 'forms/FormActions';
import {Link} from 'react-router';
import moment from 'moment';

import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import Clipboard from 'react-icons/lib/fa/clipboard';
import Select from 'react-select';

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

  constructor(props) {
    super(props);
    this.state = {publishModalOpen: false};
  }

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

  updateFormStatus(value) {
    this.props.dispatch(updateFormStatus(this.props.activeForm, value));
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

  updateOrientation(value) {

  }

  updatePlacement(value) {

  }

  openPublishModal() {
    this.props.dispatch(publishGallery()).then(gallery => {
      this.setState({publishModalOpen: true});
    });
  }

  closePublishModal() {
    this.setState({publishModalOpen: false});
  }

  copyEmbedToClipboard(iframe) {
    if (iframe) {

    }
  }

  render() {

    const form = this.props[this.props.activeForm];
    const gallery = this.props[this.props.activeGallery];
    const submissions = this.props.submissionList.map(id => this.props[id]);
    const ans = this.props[this.props.answerBeingEdited];

    const attributionFields = this.getAttributionFields(form);
    const orientationOpts = [
      {label: 'Gallery Orientation - Vertical', value: 'vertical'},
      {label: 'Gallery Orientation - Horizontal', value: 'horizontal'}
    ];
    const placementOpts = [
      {label: 'Above the submission', value: 'above'},
      {label: 'Below the submission', value: 'below'}
    ];

    // console.log('SubmissionGallery.render', gallery);

    return (
      <Page>
        <FormChrome
          activeTab="gallery"
          updateStatus={this.updateFormStatus.bind(this)}
          form={form}
          submissions={submissions}
          gallery={gallery} />
        <div style={styles.base}>
          <ContentHeader
            title={'Submission Gallery'}
            subhead={gallery ? `Created on ${moment(gallery.created_date).format('D MMM YYYY H:ma')}` : ''} />
          <div style={styles.headingButtonHolder}>
            <div style={styles.orientationOpts}>
              <Select
                options={orientationOpts}
                onChange={this.updateOrientation.bind(this)} />
            </div>
            <Button style={styles.modButton} category="brand">Preview</Button>
            <Button style={styles.modButton} category="success">Save <FaFloppyO /></Button>
            <Button
              onClick={this.openPublishModal.bind(this)}
              style={styles.modButton}
              category="inverse">Publish</Button>
          </div>
          <hr style={styles.rule} />
          <div style={styles.container}>
            <div style={styles.sidebar}>
              <Card>
                <CardHeader>Reader Information</CardHeader>

                <p style={styles.includeLabel}>Placement</p>
                <Select
                  style={styles.placementOpts}
                  options={placementOpts}
                  onChange={this.updatePlacement.bind(this)} />

                <p style={styles.includeLabel}>Include</p>
                {attributionFields.map(function (field, i) {
                  return <Checkbox key={i} label={field.title} />;
                })}

              </Card>
            </div>
            <div style={styles.gallery}>
              <div style={styles.galleryTitle}>
                <TextField style={styles.galleryTitles} label="Write a headline (optional)" />
                <br />
                <TextField style={styles.galleryTitles} label="Write description for the gallery (optional)" />
              </div>
              {
                this.props.activeGallery ?
                this.renderGallery(gallery) :
                this.renderBlank()
              }
            </div>

          </div>

        </div>
        {/* this is the Edit Answer modal */}
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

        {/* this is the Embed Code modal */}

        <Modal
          style={styles.publishModal}
          title="Get embed codes"
          isOpen={this.state.publishModalOpen}
          confirmAction={() => {}}
          cancelAction={this.closePublishModal.bind(this)}>
          <div>
            <p>Embed code</p>
            <textarea style={styles.embedTextarea}></textarea>
            <Button
              style={styles.copyButton}
              onClick={this.copyEmbedToClipboard.bind(this)}>
              Copy <Clipboard />
            </Button>
            <p style={{clear: 'both'}}>Embed code (with iframe)</p>
            <textarea style={styles.embedTextarea}></textarea>
            <Button
              style={styles.copyButton}
              onClick={this.copyEmbedToClipboard.bind(this, 'iframe')}>
              Copy <Clipboard />
            </Button>
          </div>
        </Modal>

      </Page>
    );
  }
}

const styles = {
  base: {

  },
  publishModal: {
    modalContainer: {
      minWidth: 400
    }
  },
  embedTextarea: {
    width: '100%',
    marginBottom: 5,
    border: '1px solid ' + settings.mediumGrey,
    minHeight: 100
  },
  copyButton: {
    float: 'right',
    marginBottom: 10,
    backgroundColor: settings.lightGrey,
    ':hover': {
      backgroundColor: settings.mediumGrey
    }
  },
  container: {
    display: 'flex'
  },
  sidebar: {
    flex: 1,
    marginRight: 20
  },
  gallery: {
    flex: 3
  },
  modButton: {
    marginLeft: 10
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
  galleryTitle: {

  },
  rule: {
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    borderBottom: '1px solid ' + settings.mediumGrey,
    marginBottom: 20
  },
  headingButtonHolder: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  galleryTitles: {
    width: '75%',
    marginBottom: 15,
    marginTop: -25
  },
  orientationOpts: {
    display: 'inline-block',
    minWidth: 300,
    position: 'relative',
    top: 10
  },
  placementOpts: {
    marginBottom: 10
  },
  includeLabel: {
    marginBottom: 5
  }
};
