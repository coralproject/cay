import React from 'react';
import Radium from 'radium';

import {connect} from 'react-redux';
import {fetchForm} from 'forms/FormActions';
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

  render() {

    return (
      <Page>
        <FormChrome activeTab="gallery" form={this.props.activeForm} />
        <div style={styles.base}>
          <ContentHeader title="Submission Gallery" />
          <p>{this.props.params.id}</p>
          <Card>
            <CardHeader>Submission Author Attribution</CardHeader>
            <Checkbox label="Name" />
            <Checkbox label="Email" />
            <Checkbox label="Location" />
            <Checkbox label="Phone" />
          </Card>
          <Card>
            <CardHeader>Gallery Settings</CardHeader>
            <Button category="primary" size="medium">Publish Gallery/Updates</Button>
            <p>Embded Code</p>
            <textarea style={styles.embedCode}></textarea>
          </Card>
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
  }
};
