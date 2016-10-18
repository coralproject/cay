import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import {
  fetchForm,
  fetchGallery,
  fetchSubmissions,
  removeFromGallery,
  updateFormSettings,
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
import {authSnackbarDisplayedOnce} from 'app/AppActions';
import {Link} from 'react-router';
import moment from 'moment';

import FloppyO from 'react-icons/lib/fa/floppy-o';
import Times from 'react-icons/lib/fa/times-circle';
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

import GalleryAnswer from 'forms/GalleryAnswer';
import PublishOptions from 'forms/PublishOptions';

import Login from 'app/Login';

import { showFlashMessage } from 'flashmessages/FlashMessagesActions';

@connect(({oidc, app, forms}) => ({oidc, app, forms}))
@Radium
export default class GalleryManager extends Component {

  constructor(props) {
    super(props);
    this.state = {publishModalOpen: false, previewOpen: false};
    this.setHeadline = this.setHeadline.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.removeSubmission = this.removeSubmission.bind(this);
    this.beginEditAnswer = this.beginEditAnswer.bind(this);
    this.updateFormStatus = this.updateFormStatus.bind(this);
    this.updateInactive = this.updateInactive.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.openPublishModal = this.openPublishModal.bind(this);
    this.updatePlacement = this.updatePlacement.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateEditableAnswer = this.updateEditableAnswer.bind(this);
    this.closePublishModal = this.closePublishModal.bind(this);
    this.closePreview = this.closePreview.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchForm(this.props.params.id));
    // for the nav to have the correct count of submissions for this form/gallery
    this.props.dispatch(fetchSubmissions(this.props.params.id));
    this.props.dispatch(fetchGallery(this.props.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(authSnackbarDisplayedOnce());
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
          <input
            style={styles.galleryTitles}
            type="text"
            value={gallery.headline}
            placeholder="Write a headline"
            onChange={this.setHeadline} />
          <input
            style={styles.galleryTitles}
            type="text"
            value={gallery.description}
            placeholder="Write a subhead for your gallery"
            onChange={this.setDescription} />
        </div>
        {gallery.answers.map((answer, i) => (
          <GalleryAnswer
            key={i}
            removeSubmission={this.removeSubmission}
            editAnswer={this.beginEditAnswer}
            answer={answer}
            gallery={gallery}
            identifiableIds={gallery.config.identifiableIds || []}
            onMoveAnswerDown={this.onMoveAnswerDown.bind(this, gallery.id, i)}
            onMoveAnswerUp={this.onMoveAnswerUp.bind(this, gallery.id, i)}
            position={i}
            isLast={gallery.answers.length - 1 === i}
          />
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
    const {dispatch, forms} = this.props;
    dispatch(updateFormStatus(forms.activeForm, value));
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
    this.props.dispatch(updateEditablePii(reply, idAnswer, updatedInfo));
  }

  renderIdentityAnswers(reply, identityAnswers) {
    if (!identityAnswers) return null;

    // where identityAnswers is the cloned state object,
    // not saved on the submission from the server

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
    this.props.dispatch(updateFormSettings({ inactiveMessage: value }));
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
    const {forms} = this.props;
    const gallery = forms[forms.activeGallery];

    if (!gallery) return;

    switch (type) {
    case 'script-tag':
      return `<div id="ask-gallery"></div><script src="${gallery.config.baseUrl}${forms.activeGallery}.js"></script>`;
    case 'iframe':
      return `<iframe width="100%" height="580" src="${gallery.config.baseUrl}${forms.activeGallery}.html"></iframe>`;
    case 'standalone':
      return `${gallery.config.baseUrl}${forms.activeGallery}.html`;
    default:
      // nothing
    }
  }

  setHeadline(e) {
    this.props.dispatch(updateGalleryTitle(e.target.value));
  }

  setDescription(e) {
    this.props.dispatch(updateGalleryDesc(e.target.value));
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
    ans.identity_answers.forEach(answer => {
      this.props.dispatch(updateEditablePii(ans, answer, answer.answer.text || ''));
    });
    this.props.dispatch(resetEditableTextToOriginal(ans));
  }

  onSaveClick() {
    this.props.dispatch(publishGallery(this.props.forms.activeForm)).then(() => {
      if (this.props.forms.publishGalleryError) {
        this.props.dispatch(showFlashMessage('Error publishing gallery to Elkhorn. Is Elkhorn running?', 'warning'));
      } else {
        this.props.dispatch(showFlashMessage('Your gallery saved.', 'success'));
      }
    });
  }

  render() {

    const {forms, oidc, app} = this.props;
    const authTimeout = app.features.authEnabled ? new Date(oidc.user.expires_at * 1000) : undefined;

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
      <Page authTimeout={authTimeout} displayAuthSnackbar={!app.authSnackbarDisplayedOnce}>
        <FormChrome
          activeTab="gallery"
          updateStatus={this.updateFormStatus}
          updateInactive={this.updateInactive}
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
            {/*
            <Button
              style={styles.modButton}
              onClick={this.togglePreview}
              category="brand"><Eye /> Preview</Button>
            <Button
              onClick={this.openPublishModal}
              style={styles.modButton}
              category="success"><Refresh /> Publish</Button>
              */}
          </div>
          <hr style={styles.rule} />
          <div style={styles.container}>
            <div style={styles.sidebar}>
              <Card>
                <CardHeader titleStyle={styles.readerInfoLabel}>Reader Information</CardHeader>

                <p style={styles.includeLabel}>Placement</p>
                <Select
                  style={styles.placementOpts}
                  value={gallery.config.placement}
                  options={placementOpts}
                  clearable={false}
                  searchable={false}
                  onChange={this.updatePlacement} />

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
                      style={ styles.includeCheck }
                      key={i} />
                    <span style={ styles.includeText }>{field.title}</span>
                  </label>
                );
              })}

              </Card>

              <PublishOptions
                 form={form}
                 forms={forms}
                 hideOptions={!forms.activeGallery || !forms[forms.activeGallery].config.baseUrl}
                 activeForm={forms.activeForm}
                 isGallery={true}
                 onOpenPreview={this.togglePreview.bind(this)}
                 onSaveClick={this.onSaveClick.bind(this)}
                 scriptCode={this.createEmbed('script-tag')}
                 iframeCode={this.createEmbed('iframe')}
                 standaloneCode={this.createEmbed('standalone')}
                />

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
                  onClick={this.cancelEdit}
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
                      onChange={this.updateEditableAnswer}
                      style={styles.replyModal.editText}
                      value={forms.editableAnswer}></textarea>
                    {this.renderIdentityAnswers(ans, forms.editablePii)}
                    <div style={styles.replyModal.footer}>
                      <p
                        key="resetButton"
                        onClick={this.resetText.bind(this, ans)}
                        style={styles.replyModal.resetButton}>Reset Changes</p>
                      <Button onClick={this.cancelEdit}><Times /> Cancel</Button>
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

        <GalleryPreview
          {...forms}
          closePreview={this.closePreview}
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
  successfulCopy: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: settings.successColor,
    color: 'white',
    padding: 10,
    pointerEvents: 'none',
    transition: 'opacity .3s'
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
    marginRight: 20,
    width: 310
  },
  gallery: {
    flex: 3
  },
  modButton: {
    marginLeft: 10
  },
  galleryTitle: {
    marginBottom: 15
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
    fontFamily: 'Roboto',
    borderRadius: 4,
    border: `1px solid ${settings.mediumGrey}`,
    width: '72%',
    height: 40,
    padding: '10px 15px',
    fontSize: '14.4px',
    display: 'block',
    marginBottom: 10,
    resize: 'none',
    overflow: 'hidden'
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
    marginBottom: 5,
    fontSize: '1em'
  },
  idLabel: {
    display: 'flex',
    cursor: 'pointer',
    marginBottom: 5,
    flexDirection: 'row'
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
  },
  readerInfoLabel: {
    fontSize: '1.2em'
  },
  includeCheck: {
    marginRight: '10px'
  }
};
