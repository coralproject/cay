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
  },
  submitStandAloneForm () {
    return this
      .click('@submitButton')
  },
  addValueToTextField(textValueTest, cb) {
    return this
      .setTextFieldValue(textValueTest)
      .getTextFieldValue(({value}) => {
        this.expect.element('@textField').to.have.value.that.equals(textValueTest);
        cb({ value })
      })
  }
};

export default {
  commands: [standAloneFormCommands],
  elements: {
    textField: {
      selector: 'input.text-field'
    },
    submitButton: {
      selector: '.submit-button'
    },
    finishScreen: {
      selector: 'finish-screen'
    }
  }
}