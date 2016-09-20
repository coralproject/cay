export default {
  tags: ['form'],
  before: client => {
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
  'User makes the form go live': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
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
  'User adds Headline': client => {
    const createFormPage = client.page.createFormPage();

    const headline = 'Test Headline';

    createFormPage
      .addHeadline(headline)

    // Expect
    createFormPage.expect.element('@formHeadline').to.be.present;
    createFormPage.expect.element('@formHeadline').to.have.value.that.equals(headline);
  },
  'User adds Description': client => {
    const createFormPage = client.page.createFormPage();

    const description = 'Test Description';

    createFormPage
      .addDescription(description)

    // Expect
    createFormPage.expect.element('@formDescription').to.be.present;
    createFormPage.expect.element('@formDescription').to.have.value.that.equals(description);
  },
  'User adds a Short Answer': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .addShortAnswer({
        title: 'Test Title',
        description: 'Test Description'
      })
  },
  'User saves form': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .saveForm()
  },
  'User checks published options' : client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .publishFormOptions()
  },
  after: client => {
    client.end()
  }
};