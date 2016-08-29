/*global fetchMock */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {expect} from 'chai';
import * as FormActions from '../../src/forms/FormActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FormActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app: {pillarHost: 'pillarHost'}
    });
  });

  afterEach(() => {
    fetchMock.restore();
  })

  describe('updateFormHeader', () => {

  });

  describe('updateFormFooter', () => {

  });

  describe('updateFormSettings', () => {

  });

  describe('updateFormFinishedScreen', () => {

  });
});
