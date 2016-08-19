import {expect} from 'chai';
import TagReducer from '../../src/tags/TagReducer';
import * as tagsActions from 'tags/TagActions';
import * as authActions from 'auth/AuthActions';

const types = Object.assign({}, tagsActions, authActions);

describe('TagReducer', () => {

  it('should assign an initial state', () => {
    let state = TagReducer(undefined, {type:'FAKE_ACTION'});
    expect(state.loading).to.be.false;
    expect(state.loadingTags).to.be.false;
    expect(state.authorized).to.be.false;
    expect(state.items).to.deep.equal([]);
  });

  describe('TAG_REQUEST_STARTED', () => {
    it('should not morph state', () => {
      let state = {existing:'state'};
      TagReducer(state,{type:types.TAG_REQUEST_STARTED});
      expect(state).to.deep.equal({existing:'state'});
    });

    it('should set loading to true and hasErrors to false', () => {
      let state = TagReducer(undefined,{type:types.TAG_REQUEST_STARTED});
      expect(state).to.have.property('loading').and.to.be.true;
      expect(state).to.have.property('hasErrors').and.to.be.false;
    });
  });

  describe('TAG_REQUEST_SUCCESS', () => {
    let state;

    beforeEach(() => {
      state = {
        loading:true,
        hasErrors:true,
        tags:['dinosaur','eagle', 'bear']
      };
    });

    it('should not morph state', () => {
      state = {existing:'state'};
      TagReducer(state,{type:types.TAG_REQUEST_SUCCESS});
      expect(state).to.deep.equal({existing:'state'});
    });


    it ('should have no effect if requestType is not valid', () => {
      let action= {
        type:types.TAG_REQUEST_SUCCESS,
        requestType:'notvalid'
      };
      let newState = TagReducer(state, action);
      expect(newState).to.deep.equal(state);
    });

    describe('create', () => {
      let action;

      beforeEach(()=> {
        action = {
          type:types.TAG_REQUEST_SUCCESS,
          requestType:'create',
          payload:'penguin'
        };
      });

      it ('should replace a the tag at the appropriate index', () => {
        action.index = 1;
        let newState = TagReducer(state, action);
        expect(newState.tags).to.deep.equal(['dinosaur','penguin', 'bear']);
        expect(newState).to.have.property('loading')
          .and.to.be.false;
        expect(newState).to.have.property('hasErrors')
          .and.to.be.false;
      });

      it('should insert a tag at the end of the array if no index is given', () => {
        let newState = TagReducer(state, action);
        expect(newState).to.have.property('tags')
          .and.to.deep.equal(['dinosaur','eagle', 'bear','penguin']);
        expect(newState).to.have.property('loading')
          .and.to.be.false;
        expect(newState).to.have.property('hasErrors')
          .and.to.be.false;
      });
    });

    describe('delete', () => {
      let action;

      beforeEach(()=> {
        action = {
          type:types.TAG_REQUEST_SUCCESS,
          requestType:'delete',
          index:1
        };
      });

      it('should delete the tag at the index', () => {
        let newState = TagReducer(state, action);
        expect(newState).to.have.property('tags')
          .and.to.deep.equal(['dinosaur', 'bear']);
        expect(newState).to.have.property('loading')
          .and.to.be.false;
        expect(newState).to.have.property('hasErrors')
          .and.to.be.false;
      });

      it('should have no effect if the index is invalid', () => {
        action.index=10;
        let newState = TagReducer(state, action);
        expect(newState).to.have.property('tags')
          .and.to.deep.equal(['dinosaur', 'eagle', 'bear']);
        expect(newState).to.have.property('loading')
          .and.to.be.false;
        expect(newState).to.have.property('hasErrors')
          .and.to.be.false;
      });
    });

    describe('list', () => {
      let action;
      beforeEach(()=> {
        action = {
          type:types.TAG_REQUEST_SUCCESS,
          requestType:'list',
          payload:['apple','banana','cactus']
        };
      });

      it('should replace the existing tags with a new set', () => {
        let newState = TagReducer(state, action);
        expect(newState).to.have.property('tags')
          .and.to.deep.equal(['apple','banana','cactus']);
        expect(newState).to.have.property('loading')
          .and.to.be.false;
        expect(newState).to.have.property('hasErrors')
          .and.to.be.false;
      });
    });
  });

  describe('TAG_REQUEST_FAILURE', () => {
    let action;

    beforeEach(() => {
      action = {
        type:types.TAG_REQUEST_FAILURE,
        err:'404 Not Found'
      };
    });

    it('should not morph state', () => {
      let state = {existing:'state'};
      TagReducer(state,action);
      expect(state).to.deep.equal({existing:'state'});
    });

    it('should return an error message', ()=> {
      let newState = TagReducer(undefined, action);
      expect(newState).to.have.property('loadingTags')
        .and.to.be.false;
      expect(newState).to.have.property('hasErrors')
        .and.to.be.true;
      expect(newState).to.have.property('errorMsg')
        .and.to.equal('Tag action failed: 404 Not Found');
    });
  });

  describe('LOGIN_SUCCESS', () => {
    let action;

    beforeEach(() => {
      action = {
        type:types.LOGIN_SUCCESS
      };
    });

    it('should not morph state', () => {
      let state = {existing:'state'};
      TagReducer(state,action);
      expect(state).to.deep.equal({existing:'state'});
    });

    it('should set authorized to true', ()=> {
      let newState = TagReducer(undefined, action);
      expect(newState).to.have.property('authorized')
        .and.to.be.true;
    });
  });

  describe('LOGGED_OUT', () => {
    let action;

    beforeEach(() => {
      action = {
        type:types.LOGGED_OUT
      };
    });

    it('should not morph state', () => {
      let state = {existing:'state'};
      TagReducer(state,action);
      expect(state).to.deep.equal({existing:'state'});
    });

    it('should set authorized to false', ()=> {
      let newState = TagReducer(undefined, action);
      expect(newState).to.have.property('authorized')
        .and.to.be.false;
    });
  });

  describe('REQUEST_ALL_TAGS', () => {
    let action;

    beforeEach(() => {
      action = {
        type:types.REQUEST_ALL_TAGS
      };
    });

    it('should not morph state', () => {
      let state = {existing:'state'};
      TagReducer(state,action);
      expect(state).to.deep.equal({existing:'state'});
    });

    it('should set authorized to false', ()=> {
      let newState = TagReducer(undefined, action);
      expect(newState).to.have.property('loadingTags')
        .and.to.be.true;
    });
  });

  describe('RECIEVE_ALL_TAGS', () => {
    let action;

    beforeEach(() => {
      action = {
        type:types.RECEIVE_ALL_TAGS,
        tags:['dinosaur','eagle','bear']
      };
    });

    it('should not morph state', () => {
      let state = {existing:'state'};
      TagReducer(state,action);
      expect(state).to.deep.equal({existing:'state'});
    });

    it('should add tags as items', ()=> {
      let newState = TagReducer(undefined, action);
      expect(newState).to.have.property('loadingTags')
        .and.to.be.false;
      expect(newState).to.have.property('items')
        .and.to.deep.equal(action.tags);
    });
  });


});
