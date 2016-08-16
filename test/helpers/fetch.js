import fetchMock from 'fetch-mock';
global.fetch = fetchMock.fetchMock
global.fetchMock = fetchMock
