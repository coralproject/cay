import * as TagActions from '../../src/tags/TagActions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {expect} from 'chai';
// import fetch from 'node-fetch';
import fetch from 'fetch-mock';

global fetch=fetch

const middlewares = [thunk]; // add your middlewares like `redux-thunk` 
const mockStore = configureStore(middlewares);

describe('TagActions', () => {
  describe('getTags', () => {
    it('should dispatch a TAG_REQUEST_STARTED action', () => {
      const getState = {}; // initial state of the store 

      const store = mockStore(getState);
      TagActions.getTags()(store.dispatch, getState);
      console.log(store.getActions())
      expect(store.getActions()).to.have.property('type').and.to.equal(TagActions.TAG_REQUEST_STARTED);
    });

    it('should return method post if not body is given', ()=> {

    });
    
    it('should list body as undefined if it is not parsable JSON', () => {

    });
  });
});
