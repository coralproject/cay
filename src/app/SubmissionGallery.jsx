import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchForm, fetchGallery} from 'forms/FormActions';
import {Link} from 'react-router';
import moment from 'moment';

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

  componentWillUpdate(props) {

  }

  renderGallery(gallery) {
    return gallery.answers.map((answer, i) => {
      console.log('answer', answer);
      return (
        <Card key={i}>
          <p>Added to Gallery 5/25 {answer.submission_id}</p>
          {answer.answer.answer}
          <div>
            <Button size="small">
              Edit <Edit />
            </Button>
            <Button size="small">
              Delete <Delete />
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

    if (this.props.formLoading) {
      return (<p>Loading form...</p>);
    }

    return (
      <p>
        There are currently no items in your gallery.
        You may add items by visiting <Link to={`/forms/${this.props.activeForm.id}/submissions`}>
        Review Submissions
        </Link>
      </p>
    );
  }

  render() {

    return (
      <Page>
        <FormChrome activeTab="gallery" form={this.props.activeForm} />
        <div style={styles.base}>
          <ContentHeader title={'Submission Gallery ' + this.props.params.id} />
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
  }
};
