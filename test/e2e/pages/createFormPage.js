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
      .waitForElementVisible('@statusToggle', 1000)
      .click('@statusToggle')
      .waitForElementNotPresent('@flashMessage', 3000)
      .waitForElementVisible('@liveStatusOption', 1000)
      .click('@liveStatusOption')
      .waitForElementVisible('@statusApplyButton', 1000)
      .click('@statusApplyButton')
  },
  publishFormOptions() {
    return this
      .click('@formPublishButton')
  },
  getUrlStandaloneForm(cb) {
    return this
      .getValue('@standaloneFormUrl', result => cb({ value: result.value }))
  },
  addMinCharsLimit(limit) {
    return this
      .click('@firstWidget')
      .click('@minLengthCheckbox')
      .setValue('@minLengthInput', limit)
  },
  addMaxCharsLimit(limit) {
    return this
      .click('@firstWidget')
      .click('@maxLengthCheckbox')
      .setValue('@maxLengthInput', limit)
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
    statusApplyButton: {
      selector: '.form-status-apply-button'
    },
    liveStatusOption: {
      selector: '.form-status-dropdown > div:nth-child(3) > span'
    },
    standaloneFormUrl: {
      selector: '.standalone-form-url'
    },
    flashMessage: {
      selector: '.flashmessage'
    },
    'minLengthCheckbox': {
      selector: '.form-min-limit > input[type="checkbox"]:nth-child(1)'
    },
    'minLengthInput': {
      selector: '.form-min-limit > input[type="number"]:nth-child(3)'
    },
    'maxLengthCheckbox': {
      selector: '.form-max-limit > input[type="checkbox"]:nth-child(1)'
    },
    'maxLengthInput': {
      selector: '.form-max-limit > input[type="number"]:nth-child(3)'
    }
  }
};