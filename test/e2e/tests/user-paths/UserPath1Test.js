const testData = {
  FORM_ID: '',
  FORM_TITLE: '[TEST] - Testing Title Path 1',
  FORM_HEADLINE: 'Testing path for user 1',
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
  FORM_SHORT_ANSWER_DESCRIPTION: 'Mate? Sounds like a good choice',
  FORM_SUBMISSION_BODY: 'Mate',
  GALLERY_HEADLINE: '[TEST] What do you drink for breakfast?',
  GALLERY_SUBHEAD: 'Gallery testing subhead'
}

export default {
  tags: ['user-path-1'],
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
      .waitForElementPresent('@flashMessage', 8000); //NEEDED - AWS takes more than 6s to respond
  },
  'User saves form and publishes the form': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .saveForm()
      .goLive()
  },
  'User adds title, headline and description': client => {
    const createFormPage = client.page.createFormPage();

    const { FORM_TITLE, FORM_HEADLINE, FORM_DESCRIPTION } = testData;

    createFormPage
      .addTitle(FORM_TITLE)
      .addHeadline(FORM_HEADLINE)
      .addDescription(FORM_DESCRIPTION)

    // Expect
    createFormPage.expect.element('@formTitle').to.be.present;
    createFormPage.expect.element('@formTitle').to.have.value.that.equals(FORM_TITLE);
    createFormPage.expect.element('@formHeadline').to.be.present;
    createFormPage.expect.element('@formHeadline').to.have.value.that.equals(FORM_HEADLINE);
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
  'User add a submission': client => {
    const createFormPage = client.page.createFormPage();
    const standAloneFormPage = client.page.standAloneFormPage();

    const { FORM_SUBMISSION_BODY } = testData;

    createFormPage
      .saveForm()

    client.pause(2000)

    createFormPage
      .publishFormOptions()
      .getUrlStandaloneForm(({ url }) => {

        testData.FORM_ID = url.match(/(\S{24}).html$/)[1]

        createFormPage
          .closeModal()

        standAloneFormPage
          .navigate(url)
          .ready()

        client
          .url(url)
          .refresh((e) => {
            standAloneFormPage
              .addValueToTextField(FORM_SUBMISSION_BODY, ({ value }) => {
                standAloneFormPage.submitStandAloneForm();
                standAloneFormPage.waitForElementPresent('@finalScreen', 8000);
              });
          })
      })

    client.back()
  },
  'User check the submission': client => {
    const submissionsPage = client.page.submissionsPage();
    const { baseUrl } = client.globals;
    const { FORM_ID, FORM_SHORT_ANSWER_TITLE, FORM_SUBMISSION_BODY } = testData;

    submissionsPage
      .navigate(`${baseUrl}/forms/${FORM_ID}/submissions`)
      .ready()

    submissionsPage.expect.element('@submission').to.be.present;
    submissionsPage.expect.element('@submissionTitle').to.be.present;
    submissionsPage.expect.element('@submissionTitle').text.to.equal(FORM_SHORT_ANSWER_TITLE);
    submissionsPage.expect.element('@submissionBody').to.be.present;
    submissionsPage.expect.element('@submissionBody').text.to.equal(FORM_SUBMISSION_BODY);

  },
  'User sends submission to the gallery': client => {
    const galleryPage = client.page.galleryPage();
    const submissionsPage = client.page.submissionsPage();
    const standAloneGalleryPage = client.page.standAloneGalleryPage();

    const { baseUrl } = client.globals;
    const { FORM_ID, FORM_SHORT_ANSWER_TITLE, FORM_SUBMISSION_BODY, GALLERY_HEADLINE, GALLERY_SUBHEAD } = testData;

    submissionsPage.sendSubmissionToGallery()

    galleryPage
      .navigate(`${baseUrl}/forms/${FORM_ID}/gallery`)
      .ready()
      .addHeadline(GALLERY_HEADLINE)
      .addSubhead(GALLERY_SUBHEAD)
      .saveGallery()
      .publishFormOptions()
      .getGalleryStandaloneUrl(({ url }) => {
        galleryPage.closeModal()
        standAloneGalleryPage
          .navigate(url)
          .ready()

        standAloneGalleryPage.expect.element('@headline').text.to.equal(GALLERY_HEADLINE);
        standAloneGalleryPage.expect.element('@subhead').text.to.equal(GALLERY_SUBHEAD);
        // Checking the submission
        standAloneGalleryPage.expect.element('@answerText').text.to.equal(FORM_SUBMISSION_BODY);
      })
  },
  'User deletes the form' : client => {
    const { baseUrl } = client.globals;
    const { FORM_ID } = testData;
    const formListPage = client.page.formListPage();

    formListPage
      .navigate(baseUrl + '/forms')
      .ready()
      .deleteForm(FORM_ID)

  },
  after: client => {
    client.end()
  }
};