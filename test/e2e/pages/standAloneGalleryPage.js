const standAloneGalleryCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  }
};

export default {
  commands: [standAloneGalleryCommands],
  elements: {
    answerText: {
      selector: '.askGallery__answerText'
    },
    headline: {
      selector: '.askGallery__title'
    },
    subhead: {
      selector: '.askGallery__description'
    }
  }
}