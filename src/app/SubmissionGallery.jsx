import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {
  fetchForm,
  fetchGallery,
  removeFromGallery,
  updateFormStatus,
  editAnswer
} from 'forms/FormActions';
import {Link} from 'react-router';

import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import ContentHeader from 'components/ContentHeader';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

import Delete from 'react-icons/lib/md/delete';
import Edit from 'react-icons/lib/md/edit';

import Checkbox from 'components/forms/Checkbox';
import Button from 'components/Button';
import Modal from 'components/modal/Modal';

@connect(state => state.forms)
@Radium
export default class SubmissionGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editModalOpen: false};
  }

  componentWillMount() {
    this.props.dispatch(fetchForm(this.props.params.id));
    this.props.dispatch(fetchGallery(this.props.params.id));
  }

  removeSubmission(galleryId, submissionId, answerId) {
    this.props.dispatch(removeFromGallery(galleryId, submissionId, answerId));
  }

  editSubmission(galleryId, submissionId, answerId) {
    this.setState({editModalOpen: true});
    console.log('editSubmission', ...arguments);
    // this.props.dispatch(editAnswer(galleryId, submissionId, answerId));
  }

  renderGallery(galleryId) {
    const gallery = this.props[galleryId];

    return gallery.answers.map((answer, i) => {
      console.log('answer', answer);
      return (
        <Card key={i}>
          {/*<p>Added to Gallery 5/25 {answer.submission_id}</p>*/}
          {answer.answer.answer.text}
          {/*
            <p>Gallery id: {galleryId ? galleryId : 'loading gallery'}</p>
            <p>Answer id: {answer.answer_id}</p>
            <p>widget id: {answer.answer.widget_id}</p>
            <p>submission id: {answer.submission_id}</p>
          */}
          <div>
            <Button
              style={styles.editButton}
              category="info"
              size="small"
              onClick={this.editSubmission.bind(this, galleryId, answer.submission_id, answer.answer_id)}>
              Edit <Edit />
            </Button>
            <Button
              category="warning"
              onClick={this.removeSubmission.bind(this, galleryId, answer.submission_id, answer.answer_id)}
              size="small">
              Remove <Delete />
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

  confirmEdit() {
    this.setState({editModalOpen: false});
  }

  cancelEdit() {
    this.setState({editModalOpen: false});
  }

  render() {

    const form = this.props[this.props.activeForm];
    const gallery = this.props[this.props.activeGallery];
    const submissions = this.props.submissionList.map(id => this.props[id]);

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
          <ContentHeader title={'Submission Gallery '} />
          <div style={styles.container}>
            <div style={styles.sidebar}>
              <Card>
                <CardHeader>Author Attribution</CardHeader>

                {attributionFields.map(function (field) {

                  return <Checkbox label={field.title} />;

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
                this.renderGallery(this.props.activeGallery) :
                this.renderBlank()
              }
            </div>

          </div>

        </div>
        <Modal
          title="Edit Submission for Gallery"
          isOpen={this.state.editModalOpen}
          confirmAction={this.confirmEdit.bind(this)}
          cancelAction={this.cancelEdit.bind(this)}>
          <div style={styles.modalBody}>
            <div style={styles.original}>
              original
            </div>
            <div style={styles.modified}>
              modified
            </div>
          </div>
        </Modal>
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
  original: {
    flex: 1
  },
  modified: {
    flex: 1
  }
};
