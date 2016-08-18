import {expect} from 'chai';
import FormsReducer from '../../src/forms/FormsReducer';
import * as actions from 'forms/FormActions';

describe('FormReducer', () => {
  it('should assign an initial state', () => {
    let state = FormsReducer(undefined, {type: 'FAKE_ACTION'});
    expect(state.activeForm).to.be.null;
    expect(state.activeGallery).to.be.null;
    expect(state.activeSubmission).to.be.null;
    expect(state.answerBeingEdited).to.be.null;
    expect(state.answerList).to.deep.equal([]);
    expect(state.editableAnswer).to.be.empty;
    expect(state.editableAnswer).to.be.a('string');
    expect(state.editablePii).to.be.empty;
    expect(state.editablePii).to.be.instanceof(Array);
    expect(state.editAccess).to.be.empty;
    expect(state.form).to.be.null;
    expect(state.formCreationError).to.be.null;
    expect(state.formCounts).to.deep.equal({
      totalSearch: 0,
      totalSubmissions: 0,
      bookmarked: 0,
      flagged: 0
    });
    expect(state.formList).to.be.empty;
    expect(state.galleryCode).to.be.empty;
    expect(state.galleryCode).to.be.a('string');
    expect(state.galleryList).to.deep.equal([]);
    expect(state.galleryUrls).to.deep.equal([]);
    expect(state.loadingAnswerEdit).to.be.false;
    expect(state.loadingGallery).to.be.false;
    expect(state.savedForm).to.be.null;
    expect(state.savingForm).to.be.false;
    expect(state.submissionFilterBy).to.equal('default');
    expect(state.submissionList).to.deep.equal([]);
    expect(state.submissionOrder).to.equal('dsc');
    expect(state.submissionSearch).to.be.empty;
    expect(state.submissionSearch).to.be.a('string');
    expect(state.widgets).to.deep.equal([]);
  });

  describe('form creation', () => {
    let state;

    beforeEach(() => {

      state = FormsReducer(undefined, {
        type: actions.CREATE_EMPTY_FORM,
        saveDestination: 'a_save_destination'
      });

    });

    it('should update the form settings', () => {
      state = FormsReducer(state, actions.updateFormSettings({inactiveMessage: 'an inactive message'}));

      expect(state.activeForm).to.be.null;
      expect(state.form.settings.saveDestination).to.equal('a_save_destination');
      expect(state.form.settings.inactiveMessage).to.equal('an inactive message');
    });

    it('should update the form header', () => {
      state = FormsReducer(state, actions.updateFormHeader({title: 'some title', description: 'a description'}));

      expect(state.activeForm).to.be.null;
      expect(state.form.header.title).to.equal('some title');
      expect(state.form.header.description).to.equal('a description');
      expect(state.form.header.heading).to.equal('');
    });

    it('should update the form footer', () => {
      state = FormsReducer(state, actions.updateFormFooter({conditions: 'a conditions string'}));

      expect(state.activeForm).to.be.null;
      expect(state.form.footer.conditions).to.equal('a conditions string');
    });

    it('should update the form finished screen', () => {
      state = FormsReducer(state, actions.updateFormFinishedScreen({description: 'a description'}));

      expect(state.activeForm).to.be.null;
      expect(state.form.finishedScreen.title).to.equal('Thanks.');
      expect(state.form.finishedScreen.description).to.equal('a description');
    });
  });

  describe('editing a form', () => {

    it('should update the form settings when a form is being edited', () => {


      // check that saveDestination exists
      // check that active form is not null
      // chec that inactiveMessage matches
    });

    it('should update the form header', () => {

    });

    it('should update the form footer', () => {

    });

    it('should update the form finished screen', () => {

    });
  });
});
