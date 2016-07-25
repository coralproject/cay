import React, { Component } from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import {
  fetchSubmissions,
  fetchGallery,
  updateFormStatus,
  requestEditAccess,
  leavingEdit,
  updateForm,
  fetchForm } from 'forms/FormActions';

import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import FormBuilder from 'forms/FormBuilder.js';

@connect(({ forms }) => ({ forms }))
@Radium
export default class FormEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {preview: false};
    console.log('form id', props.params.id);
    props.dispatch(fetchForm(props.params.id));
    props.dispatch(fetchGallery(props.params.id));
    props.dispatch(fetchSubmissions(props.params.id));
  }

  componentWillMount() {
    const {dispatch, params} = this.props;
    dispatch(requestEditAccess(params.id));
    dispatch(fetchForm(params.id));
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    this.props.history.listenBefore(() => {
      dispatch(leavingEdit(params.id));
      return true;
    });
  }

  onClosePreview() {
    this.setState({
      preview: false
    });
  }

  showPreview() {
    this.setState({
      preview: true
    });
  }

  updateFormStatus(value) {
    this.props.dispatch(updateFormStatus(this.props.forms.activeForm, value));
  }

  updateInactive(value) {
    this.props.dispatch(updateForm({ settings: { inactiveMessage: value } }));
  }

  render() {
    const canEdit = this.props.forms.editAccess[this.props.params.id];
    const {preview} = this.state;
    const { forms } = this.props;
    const { submissionList, activeSubmission, activeForm, activeGallery } = this.props.forms;
    const submissions = submissionList.map(id => this.props.forms[id]);
    const submission = this.props.forms[activeSubmission];
    const form = this.props.forms[activeForm];
    const gallery = this.props.forms[activeGallery];

    return (
      <Page>
        <FormChrome
          activeTab="builder"
          updateStatus={this.updateFormStatus.bind(this)}
          updateInactive={this.updateInactive.bind(this)}
          gallery={gallery}
          submissions={submissions}
          form={form}/>
        <div style={styles.base}>
          {
            form ?
              <FormBuilder
                activeForm={ this.props.forms.activeForm }
                onClosePreview={this.onClosePreview.bind(this)}
                onOpenPreview={ this.showPreview.bind(this) }
                route={ this.props.route }
                preview={preview} />
            : null
          }
        </div>
      </Page>
    );
  }
}

const styles = {
  base: {
  }
};
