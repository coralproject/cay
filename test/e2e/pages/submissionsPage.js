const submissionsCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  }
}

export default {
  commands: [submissionsCommands],
  elements: {
    inputEmail: {
      selector: '#inputEmail'
    },
  }
}