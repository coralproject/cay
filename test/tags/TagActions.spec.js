import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {expect} from 'chai';
import * as TagActions from '../../src/tags/TagActions';

const middlewares = [thunk]; // add your middlewares like `redux-thunk` 
const mockStore = configureStore(middlewares);

describe('TagActions', () => {

    const mocktag = {
      name: 'test_tag',
      description: 'test tag description',
      old_name: 'old_tag_name',
      index: 123
    };

  afterEach(() => {
    //Reset mock server after each test
    fetchMock.restore();
  });

  describe('getTags', () => {
    let getState;
    let store;

    beforeEach(() => {
      // Set the initial state of the store 
      getState = {
        app:{
          pillarHost:'pillarhost'
        }
      };

      store = mockStore(getState);

      // Mock a server response
      fetchMock.mock('pillarhost/api/tags', '{"tags":["tag1","tag2"]}');

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
      fetchMock.mock('pillarhost/api/tags', {status:404});
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
    let getState;
    let store;

    beforeEach(() => {
      // Set the initial state of the store 
      getState = {
        app:{
          pillarHost:'pillarhost'
        }
      };

      store = mockStore(getState);

      // Mock a server response
      fetchMock.mock((url, opts) => {
        if (url === 'pillarhost/api/tag' && opts.method === 'DELETE') {
          return true;
        } else {
          return false;
        }
      },'stuff');

    });

    it('should make a properly formatted DELETE request', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        expect(url).to.equal('pillarhost/api/tag');
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
        if (url === 'pillarhost/api/tag' && opts.method === 'DELETE') {
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
    let getState;
    let store;


    beforeEach(() => {
      // Set the initial state of the store 
      getState = {
        app:{
          pillarHost:'pillarhost'
        }
      };

      store = mockStore(getState);

      // Mock a server response
      fetchMock.mock((url, opts) => {
        if (url === 'pillarhost/api/tag' && opts.method === 'POST') {
          return true;
        } else {
          return false;
        }
      },JSON.stringify(mocktag));
    });

    it('should make a properly formatted POST request', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        expect(url).to.equal('pillarhost/api/tag');
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
        if (url === 'pillarhost/api/tag' && opts.method === 'POST') {
          return true;
        } else {
          return false;
        }
      }, 'Pillar is pissed yo');
      TagActions.storeTag(mocktag.name,mocktag.description, mocktag.index)(store.dispatch, store.getState)
        .then(() => {
          let action = store.getActions()[1];
          expect(action).to.have.property('type')
            .and.to.equal(TagActions.TAG_REQUEST_FAILURE);
          expect(action).to.have.property('err')
            .and.to.deep.equal('Error from pillar: Pillar is pissed yo');
          done();
        });
    });

    it ('should dispatch a TAG_REQUEST_FAILURE action on failure', (done) => {
      fetchMock.restore();
      fetchMock.mock((url, opts) => {
        if (url === 'pillarhost/api/tag' && opts.method === 'POST') {
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
});
