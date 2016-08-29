
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
  updateForm,
  updateFormSettings,
  updateOrder,
  updateSearch,
  updateFilterBy,
  cleanSubmissionFilters
} from 'forms/FormActions';

import SubmissionDetail from 'forms/SubmissionDetail';
import FormChrome from 'app/layout/FormChrome';
import Page from 'app/layout/Page';

/**
 * Export submission list component
 */

@connect(({ forms }) => ({ forms }))
@Radium
export default class SubmissionList extends Component {
  constructor(props) {
    const { dispatch, params } = props;
    super(props);
    dispatch(cleanSubmissionFilters());
    dispatch(fetchForm(params.id));
    dispatch(fetchGallery(params.id));
    dispatch(fetchSubmissions(params.id));
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
    this.props.dispatch(updateFormStatus(this.props.forms.activeForm, value));
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

  onFilterByChange(filterBy) {
    this.props.dispatch(updateFilterBy(filterBy));
    this.props.dispatch(fetchSubmissions(this.props.params.id));
  }

  render() {

    const { submissionList, activeSubmission, activeForm, activeGallery,
      submissionFilterBy, submissionOrder, formCounts } = this.props.forms;
    const submissions = submissionList.map(id => this.props.forms[id]);
    const submission = this.props.forms[activeSubmission];
    const form = this.props.forms[activeForm];
    const gallery = this.props.forms[activeGallery];

    return (
      <Page style={styles.page}>
        <div style={styles.container}>
          <FormChrome
            activeTab="submissions"
            updateStatus={this.updateFormStatus.bind(this)}
            updateInactive={this.updateInactive.bind(this)}
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
            onSelect={this.onSubmissionSelect.bind(this)}
            onFilterByChange={this.onFilterByChange.bind(this)}
            onOrderChange={this.onOrderChange.bind(this)}
            onSearchChange={this.onSearchChange.bind(this)}
            onFlag={this.onFlag.bind(this)}
            onBookmark={this.onBookmark.bind(this)}
            onSelect={this.onSubmissionSelect.bind(this)} />
          <SubmissionDetail
            dispatch={this.props.dispatch}
            submission={submission}
            removeFromGallery={this.removeFromGallery.bind(this)}
            sendToGallery={this.sendToGallery.bind(this)}
            gallery={gallery}
            onFlag={this.onFlag.bind(this)}
            onBookmark={this.onBookmark.bind(this)}/>
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
