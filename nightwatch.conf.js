
module.exports = {
  "src_folders": [ "test/e2e" ],
  "output_folder": "./reports",
  "selenium": {
    "start_process": true,
    "server_path": "./bin/selenium-server.jar",
    "port": 6666,
    "cli_args": {
      "webdriver.chrome.driver": "./bin/chromedriver"
    }
  },
  "test_settings": {
    "default": {
      "launch_url": "http://localhost",
      "selenium_port": 6666,
      "desiredCapabilities": {
        "browserName": "chrome",
        "jacascriptEnabled": true
      },
      "screenshots": {
        "enabled": true,
        "on_failure": true,
        "on_error": true,
        "path": "./reports/screenshots"
      }
    }
  },
  "baseUrl": "http://localhost:3000/"
};
