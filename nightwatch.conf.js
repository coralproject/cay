require('babel-core/register');

module.exports = {
  "src_folders": ["./test/e2e"],
  "output_folder": "./reports",
  "page_objects_path": "./test/pages",
  "globals_path": "test/globals",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",

  "selenium": {
  "start_process": true,
    "server_path": "./node_modules/selenium-standalone/.selenium/selenium-server/2.53.1-server.jar",
    "log_path": "./nightwatch/reports",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
    "webdriver.chrome.driver": "./node_modules/selenium-standalone/.selenium/chromedriver/2.24-x64-chromedriver"
  }
},
  "test_settings": {
  "default": {
    "selenium_port": 4444,
      "selenium_host": "localhost",
      "silent": true,
      "desiredCapabilities": {
      "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "webStorageEnabled" : true,
        "databaseEnabled" : true,
        "applicationCacheEnabled" : false,
        "nativeEvents" : true
    }
  }
}
};
