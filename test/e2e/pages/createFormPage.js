const createFormCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  },
  addTitle(title) {
    return this
      .setValue('@formTitle', title)
  },
  addHeadline(headline) {
    return this
      .setValue('@formHeadline', headline)
  },
  addDescription(description) {
    return this
      .setValue('@formDescription', description)
  },
  addShortAnswer(opt) {
    return this
      .click('@textField')
      .click('@firstWidget')
      .setValue('@fieldTitle', opt.title)
      .setValue('@fieldDescription', opt.description)
      .click('@widgetSaveButton')
  },
  saveForm() {
    return this
      .click('@formSaveButton')
      .waitForElementPresent('@statusToggle', 8000)
  },
  goLive() {
    return this
      .click('@statusToggle')
      .click('@liveStatusOption')
  },
  publishFormOptions() {
    return this
      .click('@formPublishButton')
  }
};

export default {
  commands: [createFormCommands],
  elements: {
    formTitle: {
      selector: '.form-title'
    },
    formHeadline: {
      selector: '.form-headline'
    },
    formDescription: {
      selector: '.form-description'
    },
    textField: {
      selector: '.field-types .TextField'
    },
    firstWidget: {
      selector: '.widget:first-of-type'
    },
    fieldTitle: {
      selector: '.widget-expanded .field-title'
    },
    fieldDescription: {
      selector: '.widget-expanded .field-description'
    },
    widgetSaveButton: {
      selector: '.widget-expanded .save-button'
    },
    formSaveButton: {
      selector: '.form-save-button'
    },
    formPreviewButton: {
      selector: '.form-preview-button'
    },
    formPublishButton: {
      selector: '.form-publish-button'
    },
    formSaveButton: {
      selector: '.form-save-button'
    },
    statusToggle: {
      selector: '.form-status-toggle'
    },
    liveStatusOption: {
      selector: '.form-status-dropdown div:nth-of-type(3) span span'
    }
  }
};