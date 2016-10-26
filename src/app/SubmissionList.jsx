
/**
 * Module dependencies
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import Sidebar from 'forms/SubmissionListSidebar';

import {
  fetchSubmissions,
  fetchGallery,
  setActiveSubmission,
  updateSubmissionFlags,
  sendToGallery,
  removeFromGallery,
  updateFormStatus,
  fetchForm,
  updateFormSettings,
  updateOrder,
  updateSearch,
  updateFilterBy,
  cleanSubmissionFilters,
  downloadCSV
} from 'forms/FormActions';
import {authSnackbarDisplayedOnce} from 'app/AppActions';
import SubmissionDetail from 'forms/SubmissionDetail';
import FormChrome from 'app/layout/FormChrome';
import Page from 'app/layout/Page';

/**
 * Export submission list component
 */

@connect(({ app, oidc, forms }) => ({ app, oidc, forms }))
@Radium
export default class SubmissionList extends Component {
  constructor(props) {
    const { dispatch, params } = props;
    super(props);
    dispatch(cleanSubmissionFilters());
    dispatch(fetchForm(params.id));
    dispatch(fetchGallery(params.id));
    dispatch(fetchSubmissions(params.id));

    this.updateFormStatus = this.updateFormStatus.bind(this);
    this.updateInactive = this.updateInactive.bind(this);
    this.onSubmissionSelect = this.onSubmissionSelect.bind(this);
    this.onFilterByChange = this.onFilterByChange.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFlag = this.onFlag.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.onDownloadCSV = this.onDownloadCSV.bind(this);
    this.removeFromGallery = this.removeFromGallery.bind(this);
    this.sendToGallery = this.sendToGallery.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(authSnackbarDisplayedOnce());
  }

  sendToGallery(galleryId, subId, key) {
    this.props.dispatch(sendToGallery(galleryId, subId, key));
  }

  removeFromGallery(galleryId, subId, key) {
    this.props.dispatch(removeFromGallery(galleryId, subId, key));
  }

  onFlag(flagged) {
    this.props.dispatch(updateSubmissionFlags({ flagged }));
  }

  onBookmark(bookmarked) {
    this.props.dispatch(updateSubmissionFlags({ bookmarked }));
  }

  updateFormStatus(value) {
    const {dispatch, forms} = this.props;
    dispatch(updateFormStatus(forms.activeForm, value));
  }

  updateInactive(value) {
    this.props.dispatch(updateFormSettings({ inactiveMessage: value }));
  }

  onOrderChange(order) {
    this.props.dispatch(updateOrder(order));
    this.props.dispatch(fetchSubmissions(this.props.params.id));
  }

  onSearchChange(search) {
    this.props.dispatch(updateSearch(search));
    this.props.dispatch(fetchSubmissions(this.props.params.id));
  }

  onDownloadCSV() {
    this.props.dispatch(downloadCSV(this.props.params.id));
  }

  onFilterByChange(filterBy) {
    this.props.dispatch(updateFilterBy(filterBy));
    this.props.dispatch(fetchSubmissions(this.props.params.id));
  }

  render() {

    const {oidc, app} = this.props;
    const { submissionList, activeSubmission, activeForm, activeGallery,
      submissionFilterBy, submissionOrder, formCounts } = this.props.forms;
    const submissions = submissionList.map(id => this.props.forms[id]);
    const submission = this.props.forms[activeSubmission];
    const form = this.props.forms[activeForm];
    const gallery = this.props.forms[activeGallery];
    const authTimeout = app.features.authEnabled ? new Date(oidc.user.expires_at * 1000) : undefined;

    return (
      <Page
        style={styles.page}
        authTimeout={authTimeout}
        displayAuthSnackbar={!app.authSnackbarDisplayedOnce}
        >
        <div style={styles.container}>
          <FormChrome
            activeTab="submissions"
            updateStatus={this.updateFormStatus}
            updateInactive={this.updateInactive}
            gallery={gallery}
            submissions={submissions}
            form={form}/>
          <Sidebar
            form={form}
            formCounts={formCounts}
            submissions={submissions}
            activeSubmission={activeSubmission}
            filterBy={submissionFilterBy}
            order={submissionOrder}
            onSelect={this.onSubmissionSelect}
            onFilterByChange={this.onFilterByChange}
            onOrderChange={this.onOrderChange}
            onSearchChange={this.onSearchChange}
            onFlag={this.onFlag}
            onBookmark={this.onBookmark}
            onSelect={this.onSubmissionSelect}
            onDownloadCSV={this.onDownloadCSV} />
          <SubmissionDetail
            dispatch={this.props.dispatch}
            submission={submission}
            removeFromGallery={this.removeFromGallery}
            sendToGallery={this.sendToGallery}
            gallery={gallery}
            onFlag={this.onFlag}
            onBookmark={this.onBookmark}/>
        </div>
      </Page>
    );
  }

  onSubmissionSelect(submissionId) {
    this.props.dispatch(setActiveSubmission(submissionId));
  }
}

const styles = {
  page: {
    position: 'absolute',
    top: 50,
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    display: 'flex',
    height: '100%'
  }
};
