const galleryCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  }
}

export default {
  commands: [galleryCommands],
  elements: {
    inputEmail: {
      selector: '#inputEmail'
    },
  }
}