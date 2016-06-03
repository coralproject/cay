import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {fetchForm} from 'forms/FormActions';
import {Link} from 'react-router';

import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import ContentHeader from 'components/ContentHeader';
import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';

import Checkbox from 'components/forms/Checkbox';
import Button from 'components/Button';

@connect(state => state.forms)
@Radium
export default class SubmissionGallery extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchForm(this.props.params.id));
  }

  renderGallery(subs) {

  }

  renderBlank() {
    if (this.props.activeForm) {
      return (
        <p>
          There are currently no items in your gallery.
          You may add items by visiting <Link to={`/forms/${this.props.activeForm.id}/submissions`}>
            Review Submissions
          </Link>
        </p>
      );
    }

    return (<p>Loading submissions...</p>);
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
                this.props.galleryItems ?
                this.renderGallery(this.props.submissions) :
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
    flex: 1
  },
  gallery: {
    flex: 3
  }
};
