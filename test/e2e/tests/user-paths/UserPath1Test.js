const testData = {
  FORM_ID: '',
  FORM_HEADLINE: '[TEST] - Testing Title Path 1',
  FORM_DESCRIPTION: `
    The following test will:
    - Create form with a single question, Save, Publish
    - Go to that form, fill it out
    - Check that the submission was received
    - Add the submission to the Gallery
    - Publish the gallery
    - Ensure that the gallery file is present and written to
    - Delete the form
  `,
  FORM_SHORT_ANSWER_TITLE: 'What do you drink for breakfast?',
  FORM_SHORT_ANSWER_DESCRIPTION: 'Mate? Sounds like a good choice'
}


export default {
  tags: ['path-1'],
  'User logs in': client => {
    const loginPage = client.page.loginPage();
    const { baseUrl, testUser } = client.globals;

    loginPage
      .navigate(baseUrl + '/login')
      .ready()

    loginPage.login(testUser)
    client.pause(2000);
  },
  'User goes to forms': client => {
    const { baseUrl } = client.globals;
    const createFormPage = client.page.createFormPage();

    createFormPage
      .navigate(baseUrl + '/forms/create')
      .ready()
  },
  'User creates a Form': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .saveForm()
  },
  'User saves form and publishes the form': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .saveForm()
      .goLive()
  },
  'User adds Title': client => {
    const createFormPage = client.page.createFormPage();

    const title = 'Test Title';

    createFormPage
      .addTitle(title)

    // Expect
    createFormPage.expect.element('@formTitle').to.be.present;
    createFormPage.expect.element('@formTitle').to.have.value.that.equals(title);
  },
  'User fills the form': client => {
    const createFormPage = client.page.createFormPage();

    const { FORM_HEADLINE, FORM_DESCRIPTION } = testData;

    createFormPage
      .addHeadline(FORM_HEADLINE)

    // Expect
    createFormPage.expect.element('@formHeadline').to.be.present;
    createFormPage.expect.element('@formHeadline').to.have.value.that.equals(FORM_HEADLINE);

    createFormPage
      .addDescription(FORM_DESCRIPTION)

    // Expect
    createFormPage.expect.element('@formDescription').to.be.present;
    createFormPage.expect.element('@formDescription').to.have.value.that.equals(FORM_DESCRIPTION);
  },
  'User adds a Short Answer': client => {
    const createFormPage = client.page.createFormPage();
    const { FORM_SHORT_ANSWER_TITLE, FORM_SHORT_ANSWER_DESCRIPTION } = testData;

    createFormPage
      .addShortAnswer({
        title: FORM_SHORT_ANSWER_TITLE,
        description: FORM_SHORT_ANSWER_DESCRIPTION
      })
  },
  'User saves form': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .saveForm()
  },
  after: client => {
    client.end()
  }
};