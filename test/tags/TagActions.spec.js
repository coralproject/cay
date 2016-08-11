import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {expect} from 'chai';
import * as TagActions from '../../src/tags/TagActions';

const middlewares = [thunk]; // add your middlewares like `redux-thunk` 
const mockStore = configureStore(middlewares);

describe('TagActions', () => {

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

    it('should return method post if not body is given', ()=> {

    });
    
    it('should list body as undefined if it is not parsable JSON', () => {

    });
  });
});
