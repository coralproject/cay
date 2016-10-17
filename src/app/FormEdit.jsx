
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

import {
  fetchSubmissions,
  fetchGallery,
  updateFormStatus,
  requestEditAccess,
  leavingEdit,
  updateFormSettings,
  fetchForm } from 'forms/FormActions';
import { authSnackbarDisplayedOnce } from 'app/AppActions';
import Login from 'app/Login';
import Page from 'app/layout/Page';
import FormChrome from 'app/layout/FormChrome';
import FormBuilder from 'forms/FormBuilder.js';

/**
 * Expose Form Edit page component
 */

@connect(({ app, oidc, forms }) => ({ app, oidc, forms }))
@Radium
export default class FormEdit extends Component {

  constructor(props) {
    super(props);
    this.state = { preview: false };
    const { id } = props.params;
    props.dispatch(fetchForm(id));
    props.dispatch(fetchGallery(id));
    props.dispatch(fetchSubmissions(id));

    this.updateFormStatus = this.updateFormStatus.bind(this);
    this.onClosePreview = this.onClosePreview.bind(this);
    this.showPreview = this.showPreview.bind(this);
    this.updateInactive = this.updateInactive.bind(this);
    this.leavingEdit = this.leavingEdit.bind(this);
  }

  componentWillMount() {
    const {dispatch, params} = this.props;
    dispatch(requestEditAccess(params.id));
    dispatch(fetchForm(params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(authSnackbarDisplayedOnce());
  }

  leavingEdit() {
    const {dispatch, params} = this.props;
    dispatch(leavingEdit(params.id));
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
    const {dispatch, forms} = this.props;
    dispatch(updateFormStatus(forms.activeForm, value));
  }

  updateInactive(value) {
    this.props.dispatch(updateFormSettings({ inactiveMessage: value }));
  }

  render() {
    const { app, oidc, forms, route } = this.props;
    const { submissionList, activeForm, activeGallery } = forms;
    const submissions = submissionList.map(id => forms[id]);
    const form = forms[activeForm];
    const gallery = forms[activeGallery];

    if (!oidc.user) return <Login />;

    const authTimeout = new Date(oidc.user.expires_at * 1000);

    return (
      <Page authTimeout={authTimeout} displayAuthSnackbar={!app.authSnackbarDisplayedOnce}>
        <FormChrome
          activeTab="builder"
          updateStatus={this.updateFormStatus}
          updateInactive={this.updateInactive}
          gallery={gallery}
          submissions={submissions}
          form={form}/>
        <div>
          {
            form ?
              <FormBuilder
                activeForm={forms.activeForm}
                onClosePreview={this.onClosePreview}
                onOpenPreview={this.showPreview}
                route={route}
                preview={this.state.preview}
                leavingEdit={this.leavingEdit}
              />
            : null
          }
        </div>
      </Page>
    );
  }
}
