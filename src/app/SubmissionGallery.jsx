import React from 'react';
import Radium from 'radium';

import {connect} from 'react-redux';
import {fetchForm} from 'forms/FormActions';
import Page from 'app/layout/Page';
import ContentHeader from 'components/ContentHeader';

@connect(state => state.forms)
@Radium
export default class SubmissionGallery extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchForm(this.props.params.id));
  }

  render() {

    return (
      <Page>
        <ContentHeader title="Submission Gallery" />
        <p>{this.props.params.id}</p>
      </Page>
    );
  }
}
