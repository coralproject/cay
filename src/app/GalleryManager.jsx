import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import {
  fetchForm,
  fetchGallery,
  fetchSubmissions,
  removeFromGallery,
  updateForm,
  updateFormStatus,
  updateEditableAnswer,
  updateGalleryOrientation,
  updateReaderInfoPlacement,
  updateGalleryTitle,
  updateGalleryDesc,
  toggleIdentifiable,
  publishGallery,
  updateEditablePii,
  editAnswer,
  resetEditableTextToOriginal,
  cancelEdit,
  beginEdit,
  reinsertGalleryAnswer
} from 'forms/FormActions';
import {Link} from 'react-router';
import moment from 'moment';

import Eye from 'react-icons/lib/fa/eye';
import Refresh from 'react-icons/lib/fa/refresh';
import FloppyO from 'react-icons/lib/fa/floppy-o';
import Times from 'react-icons/lib/fa/times-circle';
import Clipboard from 'react-icons/lib/fa/clipboard';
import Select from 'react-select';

import settings from 'settings';
import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import ContentHeader from 'components/ContentHeader';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';
import GalleryPreview from 'forms/GalleryPreview';

import TextField from 'components/forms/TextField';
import Button from 'components/Button';
import Modal from 'components/modal/Modal';

import GalleryAnswer from 'forms/GalleryAnswer';

@connect(({app, forms}) => ({app, forms}))
@Radium
export default class GalleryManager extends Component {

  constructor(props) {
    super(props);
    this.state = {publishModalOpen: false, previewOpen: false};
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

  onMoveAnswerUp(id, key) {
    this.props.dispatch(reinsertGalleryAnswer(id, key, -1));
  }

  onMoveAnswerDown(id, key) {
    this.props.dispatch(reinsertGalleryAnswer(id, key, 1));
  }

  renderGallery(gallery) {
    return (
      <div>
        <div style={styles.galleryTitle}>
          <TextField
            value={gallery.headline}
            onChange={this.setHeadline.bind(this)}
            style={styles.galleryTitles}
            label="Write a headline (optional)" />
          <br />
          <TextField
            value={gallery.description}
            onChange={this.setDescription.bind(this)}
            style={styles.galleryTitles}
            label="Write description for the gallery (optional)" />
        </div>
        {gallery.answers.map((answer, i) => (
          <GalleryAnswer
            key={i}
            removeSubmission={this.removeSubmission.bind(this)}
            editAnswer={this.beginEditAnswer.bind(this)}
            answer={answer}
            gallery={gallery}
            identifiableIds={gallery.config.identifiableIds || []}
            onMoveAnswerDown={this.onMoveAnswerDown.bind(this, gallery.id, i)}
            onMoveAnswerUp={this.onMoveAnswerUp.bind(this, gallery.id, i)}
            position={i} />
        ))}
      </div>
    );
  }

  renderBlank() {
    if (this.props.forms.loadingGallery) {
      return (<p>Loading submissions...</p>);
    }

    if (this.props.forms.formLoading && !this.props.forms.activeForm) {
      return (<p>Loading form...</p>);
    }

    return (
      <p>
        There are currently no items in your gallery.
        You may add items by visiting <Link to={`/forms/${this.props.forms.activeForm}/submissions`}>
        Review Submissions
        </Link>
      </p>
    );
  }

  updateFormStatus(value) {
    this.props.dispatch(updateFormStatus(this.props.forms.activeForm, value));
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
    this.props.dispatch(editAnswer(this.props.forms.editableAnswer, answer.submission_id, answer.answer_id, this.props.forms.activeForm));

    // probably a better way to do this.
    // UI is going to get weird if there are lots of PII answers

    // filter out answers that have not changed
    this.props.forms.editablePii
      // this is going to re-edit an edited question, but oh well.
      .filter(idAns => idAns.edited)
      .forEach(idAns => {
        this.props.dispatch(editAnswer(idAns.edited, answer.submission_id, idAns.widget_id, this.props.forms.activeForm));
      });
  }

  cancelEdit() {
    this.props.dispatch(cancelEdit());
  }

  updateEditableAnswer(e) {
    this.props.dispatch(updateEditableAnswer(e.currentTarget.value));
  }

  // user is updating PII info from inside the edit Answer modal (onBlur)
  // this updates the state, but does not save to the server.
  // confirmEdit saves PII stuff to the server
  updatePiiInfo(reply, idAnswer, updatedInfo) {
    // console.log('updatePiiInfo', idAnswer, updatedInfo);
    this.props.dispatch(updateEditablePii(reply, idAnswer, updatedInfo));
  }

  renderIdentityAnswers(reply, identityAnswers) {
    if (!identityAnswers) return null;

    // where identityAnswers is the cloned state object,
    // not saved on the submission from the server
    // console.log('renderIdentityAnswers', identityAnswers);

    return identityAnswers.map(idAnswer => {
      const text = idAnswer.edited ? idAnswer.edited : idAnswer.answer.text;

      return <div>
        <TextField
          onBlur={this.updatePiiInfo.bind(this, reply, idAnswer)}
          label={idAnswer.question}
          value={text} />
        <p>Original: {idAnswer.answer.text}</p>
      </div>;
    });
  }

  updateOrientation(option) {
    this.props.dispatch(updateGalleryOrientation(option.value));
  }

  updatePlacement(option) {
    this.props.dispatch(updateReaderInfoPlacement(option.value));
  }

  updateInactive(value) {
    this.props.dispatch(updateForm({ settings: { inactiveMessage: value } }));
  }

  openPublishModal() {
    this.props.dispatch(publishGallery(this.props.forms.activeForm)).then(() => {
      this.setState({publishModalOpen: true});
    });
  }

  closePublishModal() {
    this.setState({publishModalOpen: false});
  }

  createEmbed(type) {
    const {app, forms} = this.props;
    switch (type) {
    case 'script-tag':
      return `<script src="${forms.galleryUrl}"></script><div id="ask-gallery" />`;
    case 'iframe':
      return `<iframe width="100%" height="580" src="${app.elkhornHost}/iframe-gallery/${forms.activeGallery}"></iframe>`;
    case 'standalone':
      return `${app.elkhornHost}/iframe-gallery/${forms.activeGallery}`;
    default:
      // nothing
    }
  }

  copyEmbedToClipboard(type) {
    if (!document.queryCommandSupported('copy')) return;
  }

  setHeadline(title) {
    this.props.dispatch(updateGalleryTitle(title));
  }

  setDescription(description) {
    this.props.dispatch(updateGalleryDesc(description));
  }

  togglePreview() {
    const previewOpen = !this.state.previewOpen;
    if (previewOpen) {
      // fetch gallery from server
      this.props.dispatch(publishGallery(this.props.forms.activeForm)).then(gallery => {
        this.setState({previewOpen});
      });
    } else {
      // close it
      this.setState({previewOpen});
    }
  }

  closePreview() {
    this.setState({previewOpen: false});
  }

  updateIdentifiable(id, add) {
    this.props.dispatch(toggleIdentifiable(id, add));
  }

  resetText(ans) {
    this.props.dispatch(resetEditableTextToOriginal(ans));
  }

  render() {

    const {forms, app} = this.props;

    const form = forms[forms.activeForm];
    const gallery = forms[forms.activeGallery] || {
      headline: '', description: '',
      config: { placement: 'below', identifiableIds: [] },
      answers: []
    };

    const submissions = forms.submissionList.map(id => forms[id]);
    const ans = forms[forms.answerBeingEdited];

    const attributionFields = this.getAttributionFields(form);
    /*const orientationOpts = [
      {label: 'Gallery Orientation - Vertical', value: 'vertical'},
      {label: 'Gallery Orientation - Horizontal', value: 'horizontal'}
    ];*/
    const placementOpts = [
      {label: 'Above the submission', value: 'above'},
      {label: 'Below the submission', value: 'below'}
    ];

    return (
      <Page>
        <FormChrome
          activeTab="gallery"
          updateStatus={this.updateFormStatus.bind(this)}
          updateInactive={this.updateInactive.bind(this)}
          form={form}
          submissions={submissions}
          gallery={gallery} />
        <div style={styles.base}>
          <ContentHeader
            title={'Submission Gallery'}
            subhead={gallery ? `Created on ${moment(gallery.date_created).format('D MMM YYYY H:ma')}` : ''} />
          <div style={styles.headingButtonHolder}>
            {/*<div style={styles.orientationOpts}>
              <Select
                clearable={false}
                options={orientationOpts}
                value={forms.galleryOrientation}
                onChange={this.updateOrientation.bind(this)} />
            </div>*/}
            <Button
              style={styles.modButton}
              onClick={this.togglePreview.bind(this)}
              category="brand"><Eye /> Preview</Button>
            <Button
              onClick={this.openPublishModal.bind(this)}
              style={styles.modButton}
              category="success"><Refresh /> Publish</Button>
          </div>
          <hr style={styles.rule} />
          <div style={styles.container}>
            <div style={styles.sidebar}>
              <Card>
                <CardHeader>Reader Information</CardHeader>

                <p style={styles.includeLabel}>Placement</p>
                <Select
                  style={styles.placementOpts}
                  value={gallery.config.placement}
                  options={placementOpts}
                  clearable={false}
                  onChange={this.updatePlacement.bind(this)} />

                <p style={[
                  styles.includeLabel,
                  {display: attributionFields.length ? 'block' : 'none'}
                ]}>Include</p>
              {attributionFields.map((field, i) => {
                const isChecked = gallery.config.identifiableIds && gallery.config.identifiableIds.indexOf(field.id) !== -1;
                return (
                  <label style={styles.idLabel} key={i}>
                    <input
                      onChange={this.updateIdentifiable.bind(this, field.id, !isChecked)}
                      type="checkbox"
                      checked={isChecked}
                      key={i} />
                    {field.title}
                  </label>
                );
              })}

              </Card>
              <div
                style={styles.embedCodes}
                onClick={this.openPublishModal.bind(this)}><Refresh /> Get embed codes</div>
            </div>
            <div style={styles.gallery}>
              {
                forms.activeGallery ?
                this.renderGallery(gallery) :
                this.renderBlank()
              }
            </div>

          </div>

        </div>
        {/* this is the Edit Answer modal */}
        {
          ans
            ? <div style={styles.replyModal}>
              <div style={styles.replyModal.container}>
                <div
                  onClick={this.cancelEdit.bind(this)}
                  key="closebutton"
                  style={styles.replyModal.close}>×</div>
                <p style={styles.replyModal.heading}>Edit Submission</p>
                <div style={styles.replyModal.panels}>
                  <div style={styles.replyModal.leftPanel}>
                    <p style={styles.replyModal.subhead}>Original Submission</p>
                    <p style={styles.replyModal.originalQuestion}>{ans.answer.question}</p>
                    <p style={styles.replyModal.originalText}>{ans.answer.answer.text}</p>
                  </div>
                  <div style={styles.replyModal.rightPanel}>
                    <p style={styles.replyModal.subhead}>Edit</p>
                    <textarea
                      onChange={this.updateEditableAnswer.bind(this)}
                      style={styles.replyModal.editText}
                      value={forms.editableAnswer}></textarea>
                    {this.renderIdentityAnswers(ans, forms.editablePii)}
                    <div style={styles.replyModal.footer}>
                      <p
                        key="resetButton"
                        onClick={this.resetText.bind(this, ans)}
                        style={styles.replyModal.resetButton}>Reset Changes</p>
                      <Button onClick={this.cancelEdit.bind(this)}><Times /> Cancel</Button>
                      <Button
                        onClick={this.confirmEdit.bind(this, ans)}
                        category="success"
                        style={styles.replyModal.save}>
                        <FloppyO /> Save Edits</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : null
        }

        {/* this is the Embed Code modal */}

        <Modal
          style={styles.publishModal}
          title="Get embed codes"
          isOpen={this.state.publishModalOpen}
          confirmAction={this.closePublishModal.bind(this)}
          cancelAction={this.closePublishModal.bind(this)}>
          {
            forms.publishGalleryError
            ? <div style={styles.publishGalleryError}>Error publishing gallery to Elkhorn.<br/>Is Elkhorn running?</div>
            : <div>
              <p>Embed code</p>
              <textarea style={styles.embedTextarea} value={this.createEmbed('script-tag')}></textarea>
              <Button
                style={styles.copyButton}
                onClick={this.copyEmbedToClipboard.bind(this, 'script-tag')}>
                Copy <Clipboard />
              </Button>
              <p style={{clear: 'both'}}>Embed code (with iframe)</p>
              <textarea style={styles.embedTextarea} value={this.createEmbed('iframe')}></textarea>
              <Button
                style={styles.copyButton}
                onClick={this.copyEmbedToClipboard.bind(this, 'iframe')}>
                Copy <Clipboard />
              </Button>
              <p style={{clear: 'both'}}>Standalone link</p>
              <input
                type="text"
                value={this.createEmbed('standalone')}
                style={styles.standalone} />
              <Button
                style={styles.copyButton}
                onClick={this.copyEmbedToClipboard.bind(this, 'standalone')}>
                Copy <Clipboard />
              </Button>
            </div>
        }

        </Modal>

        <GalleryPreview
          {...forms}
          closePreview={this.closePreview.bind(this)}
          open={this.state.previewOpen} />

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
    fontFamily: 'monospace',
    fontSize: 16,
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
  },
  idLabel: {
    display: 'block',
    cursor: 'pointer',
    marginBottom: 5
  },
  embedCodes: {
    backgroundColor: settings.darkGrey,
    color: 'white',
    padding: 8,
    borderRadius: 4,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#444'
    }
  },
  standalone: {
    fontFamily: 'monospace',
    fontSize: 14,
    width: '100%',
    marginBottom: 10
  },

  publishGalleryError: {
    backgroundColor: settings.dangerColor,
    lineHeight: '1.3em',
    color: 'white',
    padding: 10
  },

  replyModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    container: {
      padding: 20,
      minWidth: 800,
      backgroundColor: 'white',
      position: 'relative'
    },
    close: {
      position: 'absolute',
      top: 6,
      right: 10,
      color: settings.grey,
      cursor: 'pointer',
      fontSize: '35px',
      fontWeight: 'bold',
      ':hover': {
        color: 'black'
      }
    },
    heading: {
      fontWeight: 'bold',
      fontSize: 30
    },
    subhead: {
      color: settings.brandColor,
      fontSize: 16,
      fontWeight: 'bold'
    },
    panels: {
      display: 'flex'
    },
    leftPanel: {
      flex: 1,
      marginRight: 10
    },
    rightPanel: {
      flex: 1
    },
    originalQuestion: {
      fontSize: 20
    },
    editText: {
      width: '100%',
      height: 100,
      fontSize: '16px',
      padding: 8
    },
    footer: {
      marginTop: 10,
      display: 'flex'
    },
    resetButton: {
      flex: 1,
      fontWeight: 'bold',
      cursor: 'pointer',
      fontStyle: 'italic',
      color: settings.grey,
      ':hover': {
        color: 'black'
      }
    },
    save: {
      marginLeft: 10
    }
  }
};
