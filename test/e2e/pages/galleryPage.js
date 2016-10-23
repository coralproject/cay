const galleryCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  },
  saveGallery() {
    return this
      .click('@formSaveButton')
      .waitForElementPresent('@statusToggle', 8000)
      .waitForElementPresent('@flashMessage', 8000)
  },
  publishFormOptions() {
    return this
      .waitForElementPresent('@formPublishButton', 5000)
      .click('@formPublishButton')
  },
  closeModal() {
    return this
      .click('@closeModal')
  },
  getGalleryStandaloneUrl(cb) {
    return this
      .getValue('@standaloneFormUrl', result => cb({ url: result.value }))
  },
}

export default {
  commands: [galleryCommands],
  elements: {
    inputEmail: {
      selector: '#inputEmail'
    },
    formPublishButton: {
      selector: '.form-publish-button'
    },
    standaloneFormUrl: {
      selector: '.standalone-form-url'
    },
    closeModal: {
      selector: ' dialog > div:nth-child(1) > span'
    },
    formSaveButton: {
      selector: '.form-save-button'
    },
    statusToggle: {
      selector: '.form-status-toggle'
    },
    flashMessage: {
      selector: '.flashmessage'
    }
  }
}