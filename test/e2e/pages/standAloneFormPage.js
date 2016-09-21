const standAloneFormCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  }
};

export default {
  commands: [standAloneFormCommands],
  elements: {

  }
}