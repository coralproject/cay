const config = require('../../public/config');

export default {
  waitForConditionTimeout: 20000,
  baseUrl: 'http://localhost:3000',
  authAuthority: config.authAuthority,
  publishedBaseUrl: config.published_base_url,
  testUser: {
    user: process.env.CORAL_TEST_USER,
    pass: process.env.CORAL_TEST_PASS
  }
};