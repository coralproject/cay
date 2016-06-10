import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {
  fetchForm,
  fetchGallery,
  removeFromGallery,
  updateFormStatus
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

@connect(state => state.forms)
@Radium
export default class SubmissionGallery extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchForm(this.props.params.id));
    this.props.dispatch(fetchGallery(this.props.params.id));
  }

  removeSubmission(galleryId, submissionId, answerId) {
    console.log('removeSubmission', galleryId, submissionId, answerId);
    this.props.dispatch(removeFromGallery(galleryId, submissionId, answerId));
  }

  renderGallery(galleryId) {
    const gallery = this.props[galleryId];

    return gallery.answers.map((answer, i) => {
      console.log('answer', answer);
      return (
        <Card key={i}>
          <p>Added to Gallery 5/25 {answer.submission_id}</p>
          {answer.answer.answer}
          <p>Gallery id: {galleryId ? galleryId : 'loading gallery'}</p>
          <p>Answer id: {answer.answer_id}</p>
          <p>widget id: {answer.answer.widget_id}</p>
          <p>submission id: {answer.submission_id}</p>
          <div>
            <Button style={styles.editButton} category="info" size="small">
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

  render() {

    const form = this.props[this.props.activeForm];
    const gallery = this.props[this.props.activeGallery];
    const submissions = this.props.submissionList.map(id => this.props[id]);

    return (
      <Page>
        <FormChrome
          activeTab="gallery"
          updateStatus={this.updateFormStatus.bind(this)}
          form={form}
          submissions={submissions}
          gallery={gallery} />
        <div style={styles.base}>
          <ContentHeader title={'Submission Gallery ' + this.props.activeGallery} />
          <div style={styles.container}>
            <div style={styles.sidebar}>
              <Card>
                <CardHeader>Submission Author Attribution</CardHeader>
                <Checkbox label="Name" />
                <Checkbox label="Email" />
                <Checkbox label="Location" />
                <Checkbox label="Phone" />
              </Card>
              <Card>
                <CardHeader>Gallery Settings</CardHeader>
                <Button category="primary" size="small">Publish Gallery/Updates</Button>
                <p>Embded Code</p>
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
  }
};
