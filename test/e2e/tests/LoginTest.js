let loginPage;

export default {
  tags: ['login'],
  before: client => {
    const { baseUrl, testUser } = client.globals;
    loginPage = client.page.loginPage();

    loginPage
      .navigate(baseUrl + '/login')
      .ready()
  },
  'User should be redirected': client => {
    const { authAuthority } = client.globals;

    client.pause(1000);
    client.assert.urlContains(authAuthority);
  },
  'User logs in': client => {
    const { testUser } = client.globals;

    loginPage.login(testUser)
    client.pause(1000)
  },
  after: client => {
    client.end()
  }
};