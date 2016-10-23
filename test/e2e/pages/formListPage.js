const formListPageCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  }
};

export default {
  commands: [formListPageCommands],
  elements: {
    textField: {
      selector: 'input.text-field'
    },
    submitButton: {
      selector: '.submit-button'
    },
    finalScreen: {
      selector: '.final-screen'
    }
  }
}