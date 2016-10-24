let loginPage;

export default {
  tags: ['login'],
  before: client => {
    const { baseUrl, testUser } = client.globals;
    loginPage = client.page.loginPage();

  },
  'User should be redirected': client => {
    client.pause(1000);
    client.assert.urlContains('https://auth.coralproject.net/connect');
  },
  after: client => {
    client.end()
  }
};