
var config = require('../../nightwatch.conf.js')

module.exports = {
  'Create form and try it on a newsroom article': function(browser) {
    // Go to form creator and add headline and title
    browser
      .resizeWindow(1200, 800)
      .url(`${config.baseUrl}forms/create`)
      .waitForElementVisible('body', 1000)
      .setValue('.form-title', 'E2E created form (test)')
      .setValue('.form-headline', 'My e2e form')
      .setValue('.form-description', 'This is a sample description :)')


      // make it live 
      .click('.form-status-toggle')
      .click('.form-status-dropdown div:nth-of-type(3) span span')

      // Add a short answer
      .click('.field-types .TextField')
      .click('.widget:first-of-type')
      .setValue('.widget-expanded .field-title', 'This is my first question')
      .setValue('.widget-expanded .field-description', 'This is the description for the first question :)')
      .click('.widget-expanded .save-button')

      // Add a multiple choice
      .click('.field-types .MultipleChoice')
      .click('.widget:nth-of-type(2)')
      .waitForElementVisible('body', 1000)
      .setValue('.widget-expanded .field-title', 'This is my second question')
      .setValue('.widget-expanded .field-description', 'This is the description for the second question :O')
      .setValue('input[value="Option 1"]', ': Former')
      .click('.widget-expanded .add-option')
      .setValue('input[value="Option 2"]', ': Latter')
      .click('.widget-expanded .save-button')

      // Save the form
      .click('.form-actions .form-save-button')

      // Get embed code
      .waitForElementPresent('.embed-codes', 8000)

      // get the standalone form url
      browser.getAttribute('.embed-codes a', 'href', function(res) {

        // go to an article
        browser.url('http://www.nytimes.com/2016/06/22/sports/soccer/argentina-shows-its-class-with-decisive-win-over-us-in-copa-america-semifinal.html')
          .waitForElementPresent('.story-body-text', 1000)

          // inject the form
          .execute(function(){
            var modal = document.getElementById('https-modal')
            if (modal.parentNode) modal.parentNode.removeChild(modal)
            document.querySelector('#media-100000004486140').innerHTML = '<div id="ask-form"></div>';
          }, [], function(){

           browser
            .injectScript(res.value.replace('.html', '.js'), function(){

              // fill the form
              browser
                .waitForElementPresent('#ask-form input', 10000)
                .setValue('#ask-form input[type=text]', 'My first answer')
                .pause(3000)
              browser
                .click('#ask-form button')
                .pause(4000)

                // go back and check the submission was made
                var url = res.value.split('/')
                browser.url(`${config.baseUrl}forms/${url[url.length - 1].replace('.html', '')}/submissions`)
                .pause(4000)
                .end()
            })
          })
        
      })
  }
};

