export default {
  tags: ['form'],
  before: client => {
    const { baseUrl } = client.globals;
    const createFormPage = client.page.createFormPage();

    createFormPage
      .navigate(baseUrl + '/forms/create')
      .ready()
      .saveForm()
      .goLive()
  },
  'User adds Title': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .addHeadline('Test Headline')
  },
  'User adds Headline': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .addHeadline('Test Headline')
  },
  'User adds Headline': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .addDescription('Test Description')
  },
  'User adds a Short Answer': client => {
    const createFormPage = client.page.createFormPage();

    createFormPage
      .addShortAnswer({
        title: 'Test Title',
        description: 'Test Description'
      })
  },
  after: client => {
    client.end()
  }
};