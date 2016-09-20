const createFormCommands = {
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
      selector: '.form-actions .form-save-button'
    }
  }
};