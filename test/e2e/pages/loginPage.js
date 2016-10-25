const loginCommands = {
  ready() {
    return this
      .waitForElementVisible('body', 1000)
  },
  login(testUser) {
    const { user, pass } = testUser
    return this
      .waitForElementVisible('@goToLoginButton')
      .click('@goToLoginButton')
      .waitForElementVisible('@inputEmail')
      .setValue('@inputEmail', user)
      .setValue('@inputPassword', pass)
      .waitForElementVisible('@loginButton')
      .click('@loginButton')
      .waitForElementVisible('body', 1000)
  },
  validateCredentials(user) {
    return this
      .assert.notEqual(user.user, 'undefined', 'Check provided credentials')
  }
}

export default {
  commands: [loginCommands],
  elements: {
    goToLoginButton: {
      selector: '.login__button'
    },
    inputEmail: {
      selector: '#inputEmail'
    },
    inputPassword: {
      selector: '#inputPassword'
    },
    loginButton: {
      selector: '.coral-sign-in'
    }
  }
}
