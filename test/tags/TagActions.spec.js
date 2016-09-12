/*global fetchMock */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {expect} from 'chai';
import * as TagActions from '../../src/tags/TagActions';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('TagActions', () => {
  let store;
  const mocktag = {
    name: 'test_tag',
    description: 'test tag description',
    old_name: 'old_tag_name',
    index: 123
  };
  const mocktag2 = {
    name: 'another_test_tag',
    description: 'yet another test tag description',
    old_name: 'super_old_tag_name',
    index: 124
  };

  beforeEach(() => {
    // Set the initial state of the store
    store = mockStore({
      app:{
        trustHost:'trustHost'
      }
    });
  });

  afterEach(() => {
    //Reset mock server after each test
    fetchMock.restore();
  });

  describe('getTags', () => {

    beforeEach(() => {
      // Mock a server response
      fetchMock.mock('trustHost/api/tags', '{"tags":["tag1","tag2"]}');

    });

    it('should dispatch a TAG_REQUEST_STARTED action', (done) => {
      TagActions.getTags()(store.dispatch, store.getState)
        .then(() => {
          expect(store.getActions()[0]).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_STARTED);
          done();
        });
    });

    it ('should dispatch a TAG_REQUEST_SUCCESS action with the retrieved tags on success', (done) => {
      TagActions.getTags()(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_SUCCESS);
          expect(action).to.have.property('payload')
            .and.to.deep.equal({tags:['tag1','tag2']});
          done();
        });
    });

    it ('should dispatch a TAG_REQUEST_FAILURE action on failure', (done) => {
      fetchMock.restore();
      fetchMock.mock('trustHost/api/tags', {status:404});
      TagActions.getTags()(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_FAILURE);
          expect(action).to.have.property('err')
            .and.to.equal('404 Not Found');
          done();
        });
    });
  });

  describe('deleteTag', () => {

    beforeEach(() => {
      // Mock a server response
      fetchMock.mock((url, opts) => {
        if (url === 'trustHost/api/tag' && opts.method === 'DELETE') {
          return true;
        } else {
          return false;
        }
      },'stuff');

    });

    it('should make a properly formatted DELETE request', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        expect(url).to.equal('trustHost/api/tag');
        expect(opts.method).to.equal('DELETE');
        done();
        return true;
      },200);
      TagActions.deleteTag()(store.dispatch, store.getState);
    });

    it('should dispatch a TAG_REQUEST_STARTED action', (done) => {
      TagActions.deleteTag('test_tag','test tag description', 123)(store.dispatch, store.getState)
        .then(() => {
          expect(store.getActions()[0]).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_STARTED);
          done();
        });
    });

    it('should dispatch a TAG_REQUEST_SUCCESS action when successful', (done) => {
      TagActions.deleteTag('test_tag','test tag description', 123)(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_SUCCESS);
          expect(action).to.have.property('index')
            .and.to.equal(123);
          done();
        });
    });

    it ('should dispatch a TAG_REQUEST_FAILURE action on failure', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        if (url === 'trustHost/api/tag' && opts.method === 'DELETE') {
          return true;
        } else {
          return false;
        }
      },{status:404});
      TagActions.deleteTag('test_tag','test tag description', 123)(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_FAILURE);
          expect(action).to.have.property('err')
            .and.to.equal('404 Not Found');
          done();
        });
    });
  });

  describe('storeTag', () => {

    beforeEach(() => {
      // Mock a server response
      fetchMock.mock((url, opts) => {
        if (url === 'trustHost/api/tag' && opts.method === 'POST') {
          return true;
        } else {
          return false;
        }
      },JSON.stringify(mocktag));
    });

    it('should make a properly formatted POST request', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        expect(url).to.equal('trustHost/api/tag');
        expect(opts.method).to.equal('POST');

        let body = JSON.parse(opts.body);
        expect(body.name).to.equal(mocktag.name);
        expect(body.description).to.equal(mocktag.description);
        expect(body.old_name).to.equal(mocktag.old_name);
        done();
        return true;
      },200);
      TagActions.storeTag(mocktag.name, mocktag.description, mocktag.index, mocktag.old_name)(store.dispatch, store.getState);
    });

    it('should dispatch a TAG_REQUEST_STARTED action', (done) => {
      TagActions.storeTag(mocktag.name,mocktag.description, mocktag.index)(store.dispatch, store.getState)
        .then(() => {
          expect(store.getActions()[0]).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_STARTED);
          done();
        });
    });

    it('should dispatch a TAG_REQUEST_SUCCESS action with the stored tag when successful', (done) => {
      TagActions.storeTag(mocktag.name,mocktag.description, mocktag.index)(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_SUCCESS);
          expect(action).to.have.property('payload')
            .and.to.deep.equal(mocktag);
          expect(action).to.have.property('index')
            .and.to.equal(123);
          expect(action).to.have.property('requestType')
            .and.to.equal('create');
          done();
        });
    });

    it('should return an TAG_REQUEST_FAILURE when json from server is improperly formatted', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        if (url === 'trustHost/api/tag' && opts.method === 'POST') {
          return true;
        } else {
          return false;
        }
      }, 'The Trust service is pissed yo'); // Todo: update jive, don't know what's going down
      TagActions.storeTag(mocktag.name,mocktag.description, mocktag.index)(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_FAILURE);
          expect(action).to.have.property('err')
            .and.to.deep.equal('Error from trust: Trust is pissed yo');
          done();
        });
    });

    it ('should dispatch a TAG_REQUEST_FAILURE action on failure', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        if (url === 'trustHost/api/tag' && opts.method === 'POST') {
          return true;
        } else {
          return false;
        }
      },{status:404});
      TagActions.storeTag(mocktag.name,mocktag.description, mocktag.index)(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_FAILURE);
          expect(action).to.have.property('err')
            .and.to.equal('404 Not Found');
          done();
        });
    });

  });

  describe('fetchAllTags', () => {
    beforeEach(()=> {
      fetchMock.mock('trustHost/api/tags',JSON.stringify([mocktag,mocktag2]));
    });

    it('should disptach a REQUEST_ALL_TAGS action', (done) => {
      TagActions.fetchAllTags()(store.dispatch, store.getState)
        .then(() => {
          expect(store.getActions()[0]).to.have.property('type')
            .and.to.equal(TagActions.REQUEST_ALL_TAGS);
          done();
        });
    });

    it('should return false if currently loading tags', () => {
      // Set the initial state of the store
      store = mockStore({
        app:{
          trustHost:'trustHost'
        },
        loadingTags:true
      });
      expect(TagActions.fetchAllTags()(store.dispatch, store.getState)).to.be.false;
    });

    it('should dispatch a RECEIVE_ALL_TAGS action with tags on success', (done) => {
      TagActions.fetchAllTags()(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.RECEIVE_ALL_TAGS);
          expect(action).to.have.property('tags')
            .and.to.deep.equal([mocktag,mocktag2]);
          done();
        });
    });

    it('should dispatch an ALL_TAGS_REQUEST_ERROR action on failure', () => {
      fetchMock.restore();
      fetchMock.mock('trustHost/api/tags',{status:404});
      TagActions.fetchAllTags()(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.ALL_TAGS_REQUEST_ERROR);
          expect(action).to.have.property('err')
            .and.to.deep.equal('404 Not Found');
          done();
        });
    });
  });
});
