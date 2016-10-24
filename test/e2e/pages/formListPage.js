const formListPageCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('@formRow', 1000)
  },
  deleteForm(id) {
    return this
      .waitForElementVisible(`.form__row #form__id--${id}`, 4000)
      .click(`.form__row #form__id--${id}`)
      .waitForElementVisible('@confirmDialog', 4000)
      .waitForElementVisible('@confirmButton', 1000)
      .click('@confirmButton')
      .waitForElementNotPresent(`.form__row #form__id--${id}`, 4000)
  }
};

export default {
  commands: [formListPageCommands],
  elements: {
    textField: {
      selector: 'input.text-field'
    },
    formRow: {
      selector: '.form__row'
    },
    confirmDialog: {
      selector: '.confirmDialog'
    },
    confirmButton: {
      selector: '.confirmDialog__button--confirm'
    }
  }
}