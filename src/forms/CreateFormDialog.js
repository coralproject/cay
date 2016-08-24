/**
 * Module dependencies
 */

import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Button, Textfield, Dialog, DialogContent, DialogTitle, DialogActions } from 'react-mdl';

import L from 'i18n';
import { saveForm, updateFormHeader } from 'forms/FormActions';
import { showFlashMessage } from 'flashmessages/FlashMessagesActions';

// Forms, Widgets, Submissions
@connect(({ forms }) => ({ forms }))
@Radium
export default class FormList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMode: 'open',
      copying:{}
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open, showTitleIsRequired: false });
  }

  onCancelClick() {
    this.props.onCancelClick();
  }

  onFormHeadingChange(e) {
    this.props.dispatch(updateFormHeader({ heading: e.target.value }));
  }

  onFormDescriptionChange(e) {
    this.props.dispatch(updateFormHeader({ description: e.target.value }));
  }

  onFormTitleChange(e) {
    this.props.dispatch(updateFormHeader({ title: e.target.value }));
  }

  onAddQuestionsClick() {
    const { router } = this.context;
    const { forms, dispatch } = this.props;
    const { form, widgets } = forms;

    if (!form.header.title) {
      this.setState({ showTitleIsRequired: true });
      return;
    }
    dispatch(saveForm(form, widgets))
      .then(response => {
        if (response.data && response.data.id) {
          this.props.dispatch(showFlashMessage('Your form was created.', 'success'));
          return router.push(`/forms/${response.data.id}`);
        } else {
          this.props.dispatch(showFlashMessage('Uh-oh, we can\'t create your form. Try again or report the error to your technical team', 'warning', false));
        }
      });
  }

  render() {
    return (
      <Dialog open={this.state.open} style={{ width: '600px' }}>
          <DialogTitle>Create a form</DialogTitle>
          <DialogContent>
            <h5 style={ styles.dialogFieldTitle }>Write a form name for internal use</h5>
            <Textfield
              onChange={ this.onFormTitleChange.bind(this) }
              label=""
              required
              style={ { paddingTop: 10 } }
            />
            <label style={ styles.requiredLabel }>* required</label>
            { this.state.showTitleIsRequired ? <label style={ styles.validationError }>A title is required</label> : null }
          <h5 style={ styles.dialogFieldTitle }>Write a headline for the form</h5>
            <Textfield
              onChange={ this.onFormHeadingChange.bind(this) }
              label=""
              style={ { paddingTop: 10 } }
            />
          <h5 style={ styles.dialogFieldTitle }>Write a description/instructions for readers about the form</h5>
            <Textfield
              onChange={ this.onFormDescriptionChange.bind(this) }
              label=""
              style={ { paddingTop: 10 } }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.onAddQuestionsClick.bind(this) } raised accent type='button'>Add questions</Button>
            <Button type='button' onClick={this.onCancelClick.bind(this)}>Cancel</Button>
          </DialogActions>
        </Dialog>
    );
  }
}

const styles = {
  requiredLabel: {
    color: '#ccc',
    fontStyle: 'italic',
    fontSize: '10pt',
    display: 'block',
    marginBottom: 10
  },
  validationError: {
    color: '#a00',
    fontStyle: 'italic',
    fontSize: '10pt',
    display: 'block',
    marginBottom: 10
  }
};
