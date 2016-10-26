const submissionsCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  },
  sendSubmissionToGallery() {
    return this
      .click('@sendToGallery')
      .waitForElementPresent('@removeFromGallery', 2000);
  }
}

export default {
  commands: [submissionsCommands],
  elements: {
    submission: {
      selector: '.submission'
    },
    submissionTitle: {
      selector: '.submission .submission__title h2'
    },
    submissionBody: {
      selector: '.submission .submission__body'
    },
    submissionActions: {
      selector: '.submission .submission__actions'
    },
    removeFromGallery: {
      selector: '.submission .submission__actions .button__remove'
    },
    sendToGallery: {
      selector: '.submission .submission__actions .button__send'
    }
  }
}