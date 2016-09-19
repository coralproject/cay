export default {
  tags: ['modal'],
  beforeEach: browser => {
  },
  'The text that describes what the test is doing': client => {
    console.log('client = ', client);
    client.end()
  },
};