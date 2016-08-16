
var config = require('../../nightwatch.conf.js')

module.exports = {
  'Create form and try it on a newsroom article': function(browser) {
    // Go to form creator and add headline and title
    browser
      .resizeWindow(1200, 800)
      .url(`${config.baseUrl}forms/create`)
      .waitForElementVisible('div[draggable=true]', 1000)
      .setValue('input[type=text]', 'E2E created form (test)')
      .setValue('input[placeholder="Write a headline"]', 'My e2e form')
      .setValue('textarea', 'This is a sample description :)')


      // make it live 
      .click('.form-status-toggle')
      .click('.form-status-dropdown div:nth-of-type(3) span span')

      // Add a short answer
      .click('div[draggable=true]:first-of-type')
      .click('.widget:first-of-type')
      .setValue('.widget-expanded input:first-child', 'This is my first question')
      .setValue('.widget-expanded input:nth-child(2)', 'This is the description for the first question :)')
      .click('.widget-expanded .save-button')

      // Add a multiple choice
      .click('div[draggable=true]:nth-of-type(4)')
      .click('.widget:nth-of-type(2)')
      .setValue('.widget-expanded input:first-child', 'This is my second question')
      .setValue('.widget-expanded input:nth-child(2)', 'This is the description for the second question :O')
      .setValue('input[value="Option 1"]', ': Former')
      .click('.widget-expanded .add-option')
      .setValue('input[value="Option 2"]', ': Latter')
      .click('.widget-expanded .save-button')

      // Save the form
      .click('.form-actions button:nth-of-type(2)')

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

