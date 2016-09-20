export default {
  tags: ['form'],
  beforeEach: browser => {
  },
  'Creating a Form': client => {
    const { baseUrl } = client.globals;
    const createFormPage = client.page.createFormPage();

    createFormPage
      .navigate(baseUrl + '/forms/create')
      .addTitle('Test Title')
      .addHeadline('Test Headline')
      .addDescription('Test Description')

      .addShortAnswer({
        title: 'Test Title',
        description: 'Test Description'
      })
      .saveForm()

    client.end()
  },
};