import React from 'react';

// Field Editors
import TextFieldEditor from 'forms/editors/TextFieldEditor';
import TextAreaEditor from 'forms/editors/TextAreaEditor';
import MultipleChoiceEditor from 'forms/editors/MultipleChoiceEditor';
import DateFieldEditor from 'forms/editors/DateFieldEditor';
import NumberFieldEditor from 'forms/editors/NumberFieldEditor';
import EmailFieldEditor from 'forms/editors/EmailFieldEditor';
import PhoneNumberEditor from 'forms/editors/PhoneNumberEditor';

// TODO: Generalize this into dynamically generated components
// Not really a "Factory" design pattern, it's just a naming choice
const EditorFactory = {

  DateField(field, props) {
    return (
      <DateFieldEditor field={ field } { ...props } />
    );
  },

  NumberField(field, props) {
    return (
      <NumberFieldEditor field={ field } { ...props } />
    );
  },

  TextField(field, props) {
    return (
      <TextFieldEditor field={ field } { ...props } />
    );
  },

  EmailField(field, props) {
    return (
      <EmailFieldEditor field={ field } { ...props } />
    );
  },

  TextArea(field, props) {
    return (
      <TextAreaEditor field={ field } { ...props } />
    );
  },

  MultipleChoice(field, props) {
    return (
      <MultipleChoiceEditor field={ field } { ...props } />
    );
  },

  PhoneNumber(field, props) {
    return (
      <PhoneNumberEditor field={ field } { ...props } />
    );
  }
};

export default EditorFactory;
