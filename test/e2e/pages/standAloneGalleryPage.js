const standAloneGalleryCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  }
};

export default {
  commands: [standAloneGalleryCommands],
  elements: {
    answerText: '.askGallery__answerText'
  }
}