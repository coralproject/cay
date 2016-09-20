export default {
  'Form list': function (browser) {
    browser
      .url(`${browser.globals.baseUrl}forms`)
      // Wait for the table to render
      .waitForElementVisible('.mdl-data-table', 1000)
      // Wait for a table item
      .waitForElementVisible('.mdl-data-table__cell--non-numeric', 1000)

      // The name is clickable and should sort the table
      .click('.mdl-data-table__cell--non-numeric')
      browser.expect.element('.mdl-data-table__cell--non-numeric').to.have.attribute('class').which.contains('mdl-data-table__header--sorted-ascending')
      browser.click('.mdl-data-table__cell--non-numeric')
      browser.expect.element('.mdl-data-table__cell--non-numeric').to.have.attribute('class').which.contains('mdl-data-table__header--sorted-descending')

      // The copy action is not sortable
      browser.click('.mdl-data-table__cell--non-numeric:nth-of-type(5)')
      browser.expect.element('.mdl-data-table__cell--non-numeric:nth-of-type(5)').to.have.attribute('class').equal('mdl-data-table__cell--non-numeric')

      browser.end()
  }
};
