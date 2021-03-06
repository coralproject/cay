import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {
  appendWidget,
  moveWidget,
  deleteWidget,
  duplicateWidget,
  updateFormHeader,
  updateFormFooter,
  updateFormSettings,
  updateFormFinishedScreen
} from 'forms/FormActions';
import uuid from 'node-uuid';
import { Checkbox } from 'react-mdl';

import { DropTarget } from 'react-dnd';
import Tooltip from 'react-tooltip';

import FaQuestionCircle from 'react-icons/lib/fa/question-circle';

// Components
import FormFieldPlaceHolder from 'forms/FormFieldPlaceHolder';
import FormField from 'forms/FormField';

import settings from 'settings';

@connect(({ forms, app }) => ({ forms, app }))
export default class FormFieldsContainer extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      savedFields: [],
      dragStarted: false,
      currentFields: [],
      showTitleIsRequired: false,
      autoExpand: -1
    };
    this.previousHover = null;
  }

  componentWillMount() {
    if (this.props.forms) {
      this.setState({ savedFields: this.props.forms.widgets, currentFields: this.props.forms.widgets, dragStarted: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ savedFields: nextProps.forms.widgets, currentFields: nextProps.forms.widgets, dragStarted: false });
  }

  resetForm() {
    this.setState({ currentFields: this.state.savedFields.slice() });
  }

  getForm() {
    return this.props.activeForm ? this.props.forms[this.props.activeForm] : this.props.forms.form;
  }

  // TODO: Refactor: All this methods look very similar, maybe generalize into one?

  onFormCtaChange(e) {
    this.props.markAsUnsaved();
    this.props.dispatch(updateFormFooter({ cta: e.target.value }))
  }

  onFormHeadingChange(e) {
    this.props.markAsUnsaved();
    this.props.dispatch(updateFormHeader({ heading: e.target.value }));
  }

  onFormDescriptionChange(e) {
    this.props.markAsUnsaved();
    this.props.dispatch(updateFormHeader({ description: e.target.value }));
  }

  onThankYouDescriptionChange(e) {
    let form = this.getForm();
    this.props.markAsUnsaved();
    this.props.dispatch(updateFormFinishedScreen({
      title: form.finishedScreen.title,
      description: e.target.value
    }));
  }

  onThankYouTitleChange(e) {
    let form = this.getForm();
    this.props.markAsUnsaved();
    this.props.dispatch(updateFormFinishedScreen({
      title: e.target.value,
      description: form.finishedScreen.description
    }));
  }

  enqueueReset() {
    // Ensure we are not setting the timeout over and over
    this.previousHover = -1;
    if (!this._timeout) {
      this._timeout = setTimeout(() => this.resetForm(), 10);
    }
  }

  cancelReset() {
    clearTimeout(this._timeout);
    this._timeout = false;
  }

  onConditionsChange(e) {
    this.props.markAsUnsaved();
    this.props.dispatch(updateFormFooter({ conditions: e.target.value }));
  }

  onDelete(position, e) {
    e.stopPropagation();
    this.props.markAsUnsaved();
    this.props.dispatch(deleteWidget(position));
  }

  onDuplicate(position, e) {
    e.stopPropagation();
    this.props.markAsUnsaved();
    this.props.dispatch(duplicateWidget(position));
  }

  onMove(direction, position, e) {
    e.stopPropagation();
    this.props.markAsUnsaved();
    this.props.dispatch(moveWidget(position, position + (direction === 'up' ? -1 : 1)));
  }

  moveWidget(origin, target) {
    this.props.markAsUnsaved();
    this.props.dispatch(moveWidget(origin, target));
  }

  onRecaptchaChange(e) {
    this.props.dispatch(updateFormSettings({ recaptcha: e.target.checked  }));
  }

  appendWidget(field, targetPosition) {
    this.setState({ autoExpand: targetPosition });
    this.props.markAsUnsaved();
    this.props.dispatch(appendWidget({
      title: field.title,
      description: field.description,
      friendlyType: field.friendlyType,
      type: 'field',
      component: field.type,
      identity: false,
      wrapper: {},
      props: { ...field.props },
      id: uuid.v4()
    }, targetPosition));
  }

  render() {
    const { onFieldSelect, forms } = this.props;
    const form = this.props.activeForm ? forms[this.props.activeForm] : forms.form;
    return (
      <div style={ styles.fieldsListContainer }>
        <input className="form-headline" onChange={ this.onFormHeadingChange.bind(this) } style={ styles.formTitles } type="text" placeholder={ "Write a headline" } defaultValue={ form.header.heading } />
        {
          this.state.showTitleIsRequired ?
            <p style={ styles.titleIsRequired }>Title is required</p>
          :
            null
        }
        <textarea className="form-description" onChange={ this.onFormDescriptionChange.bind(this) } style={ styles.formTitles } placeholder={ "Write instructions and a description for the form below" } defaultValue={ form.header.description } />

        <div style={ styles.fieldsList } className="widgets-container">

          {
            // Render form fields
            this.state.currentFields.map((field, i) => (
              <FormFieldPlaceHolder key={i} container={ this } position={ i }>
                <FormField
                  id={ field.id }
                  key={ i }
                  field={ field }
                  container={ this }
                  position={ i }
                  onFieldSelect={ onFieldSelect }
                  onList={ true }
                  dragStarted={ this.state.dragStarted }
                  autoExpand={ i === this.state.autoExpand }
                  isLast={ i === this.state.currentFields.length - 1 }
                  onMove={ this.onMove.bind(this) }
                  onDuplicate={ this.onDuplicate.bind(this) }
                  onDelete={ this.onDelete.bind(this) }
                   />
              </FormFieldPlaceHolder>
          ))}

          {
            // Render last placeholder
            !this.state.dragStarted || this.state.currentFields.length === 0
            ? <FormFieldPlaceHolder container={ this } position={ this.state.currentFields.length } key={ this.state.currentFields.length } />
            : null
          }

        </div>

        <div style={ styles.extraFields }>
        { this.props.app.recaptcha ? <Checkbox checked={form.settings.recaptcha} label="Include reCAPTCHA"
            ripple onChange={this.onRecaptchaChange.bind(this)} /> : null }
          <h3 style={ styles.extraFieldTitle }>
          Call To Action
          <FaQuestionCircle data-tip data-for="cta" />
          <Tooltip class="cayTooltip" id="cta" place="bottom" effect="solid" type="light">
            <p>Enter the text for the submit button.</p>
          </Tooltip>
          </h3>
          <input className="form-cta" onChange={ this.onFormCtaChange.bind(this) } style={ styles.formTitles } type="text" placeholder={ "Write a Call to Action" } defaultValue={ form.footer.cta } />
          <h3 style={ styles.extraFieldTitle }>
          Finished Screen (optional)
          <FaQuestionCircle data-tip data-for="finished-screen" />
          <Tooltip class="cayTooltip" id="finished-screen" place="bottom" effect="solid" type="light">
            <p>Enter a title and message to display when the form has been submitted.</p>
          </Tooltip>
          </h3>
          <input className="form-finished-screen-title" onChange={ this.onThankYouTitleChange.bind(this) } style={ styles.formTitles } type="text" placeholder={ "Write a Title" } defaultValue={ form.finishedScreen.title } />
          <textarea
            defaultValue={ form.finishedScreen.description }
            style={ styles.extraFieldTextArea }
            onChange={ this.onThankYouDescriptionChange.bind(this) }></textarea>

          <h3 style={ styles.extraFieldTitle }>
            Include Privacy Policy
            <FaQuestionCircle data-tip data-for="privacyPolicy" />
            <Tooltip class="cayTooltip" id="privacyPolicy" place="bottom" effect="solid" type="light">
              <p>To enter a link, use this format: [This is a link](http://www.link.com)</p>
            </Tooltip>
          </h3>
          <textarea
            defaultValue={ form.footer.conditions }
            style={ styles.extraFieldTextArea }
            onChange={ this.onConditionsChange.bind(this) }></textarea>
        </div>

      </div>
    );
  }

}

const styles = {
  blankContainer: {
    background: '#fff',
    border: `1px dashed ${settings.mediumGrey}`,
    width: '100%'
  },
  blankTitle: {
    textAlign: 'center',
    padding: 20,
    fontSize: '1em'
  },
  fieldsList: {
    height: 'auto',
    minHeight: 130,
    minWidth: 350,
    position: 'relative'
  },
  fieldsListContainer: {
    flex: 1,
    paddingLeft: 10,
    color: '#5d5d5d'
  },
  typeList: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  typesTitle: {
    fontSize: 18.78,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5
  },
  typesSubTitle: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 5
  },
  formTitles: {
    fontFamily: 'Roboto',
    borderRadius: 4,
    border: `1px solid ${settings.mediumGrey}`,
    width: '72%',
    height: 40,
    padding: '10px 15px',
    fontSize: '14.4px',
    display: 'block',
    marginBottom: 10,
    resize: 'none',
    overflow: 'hidden'
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: '1em',
    marginBottom: 15,
    width: '100%',
    display: 'block',
    border: 'none',
    background: 'none',
    resize: 'none'
  },
  extraFieldTextArea: {
    fontFamily: 'Roboto',
    display: 'block',
    width: '100%',
    padding: 10,
    fontSize: '12pt',
    border: `1px solid ${settings.mediumGrey}`,
  },
  extraFieldTitle: {
    fontSize: '1em',
    fontWeight: 'bold',
    margin: '30px 0 20px 0'
  }
};
