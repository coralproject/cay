const standAloneFormCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  },
  getTextFieldValue(cb) {
    return this
      .getValue('@textField', result => cb({ value: result.value }))
  },
  setTextFieldValue(value) {
    return this
      .setValue('@textField', value)
  }
};

export default {
  commands: [standAloneFormCommands],
  elements: {
    textField: {
      selector: 'input.text-field'
    }
  }
}