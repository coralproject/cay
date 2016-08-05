import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { appendWidget, moveWidget, deleteWidget, duplicateWidget, updateForm } from 'forms/FormActions';

// Components
import FormFieldPlaceHolder from 'forms/FormFieldPlaceHolder';
import FormField from 'forms/FormField';

@connect(({ forms, app }) => ({ forms, app }))
export default class FormFieldsContainer extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { widgets: [], isHovering: false, currentFields: [], showTitleIsRequired: false, itemBeingDragged: -1, canDrop: false };
    this.stateBeforeDrag = []; // a copy of state.fields
    this.previousHover = null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ widgets: nextProps.forms.widgets, currentFields: nextProps.forms.widgets, isHovering: false });
    this.stateBeforeDrag = nextProps.forms.widgets;
  }

  resetForm() {
    this.setState({ widgets: this.stateBeforeDrag.slice(), currentFields: this.stateBeforeDrag.slice() });
  }

  saveState() {
    this.stateBeforeDrag = this.state.widgets.slice();
  }

  getForm() {
    return this.props.activeForm ? this.props.forms[this.props.activeForm] : this.props.forms.form;
  }

  // TODO: Refactor: All this methods look very similar, maybe generalize into one?

  onFormHeadingChange(e) {
    let form = this.getForm();
    this.props.markAsUnsaved();
    this.props.dispatch(updateForm({
      header: {
        ...form.header,
        heading: e.target.value
      }
    }));
  }

  onFormDescriptionChange(e) {
    let form = this.getForm();
    this.props.markAsUnsaved();
    this.props.dispatch(updateForm({
      header: {
        ...form.header,
        description: e.target.value
      }
    }));
  }

  onThankYouDescriptionChange(e) {
    let form = this.getForm();
    this.props.markAsUnsaved();
    this.props.dispatch(updateForm({
      finishedScreen: {
        title: form.finishedScreen.title,
        description: e.target.value
      }
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
    this.props.dispatch(updateForm({
      footer: {
        conditions: e.target.value
      }
    }));
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

  appendWidget(field, targetPosition) {
    this.props.markAsUnsaved();
    this.props.dispatch(appendWidget({
      title: field.title,
      description: field.description,
      type: 'field',
      component: field.type,
      identity: false,
      wrapper: {},
      props: { ...field.props },
      id: Math.floor(Math.random() * 99999) + ''
    }, targetPosition));
  }

  render() {
    const { onFieldSelect, forms } = this.props;
    const form = this.props.activeForm ? forms[this.props.activeForm] : forms.form;
    return (
      <div style={ styles.fieldsListContainer }>
        <input onChange={ this.onFormHeadingChange.bind(this) } style={ styles.headLine } type="text" placeholder={ "Write a headline" } defaultValue={ form.header.heading } />
        {
          this.state.showTitleIsRequired ?
            <p style={ styles.titleIsRequired }>Title is required</p>
          :
            null
        }
        <textarea onChange={ this.onFormDescriptionChange.bind(this) } style={ styles.description } placeholder={ "Write instructions and a description for the form below" } defaultValue={ form.header.description } />

        <div style={ styles.fieldsList }>

          {
            // Render form fields
            this.state.currentFields.map((field, i) => (
              <FormFieldPlaceHolder key={i} container={ this } position={ i } dropped={ field.dropped }>
                <FormField
                  id={ field.id }
                  key={ i }
                  field={ field }
                  container={ this }
                  expanded={ true }
                  position={ i }
                  onFieldSelect={ onFieldSelect }
                  onList={ true }
                  isLast={ i === this.state.currentFields.length - 1 }
                  onMove={ this.onMove.bind(this) }
                  onDuplicate={ this.onDuplicate.bind(this) }
                  onDelete={ this.onDelete.bind(this) }
                   />
              </FormFieldPlaceHolder>
          ))}

          {
            // Render last placeholder
            !this.state.isHovering || this.state.currentFields.length === 0
            ? <FormFieldPlaceHolder container={ this } position={ this.state.currentFields.length } key={ this.state.currentFields.length } />
            : null
          }

        </div>

        <div style={ styles.extraFields }>
          <h3 style={ styles.extraFieldTitle }>Thank you message (optional)</h3>
          <textarea
            defaultValue={ form.finishedScreen.description }
            style={ styles.extraFieldTextArea }
            onChange={ this.onThankYouDescriptionChange.bind(this) }></textarea>

          <h3 style={ styles.extraFieldTitle }>Include Privacy Policy</h3>
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
    border: '1px dashed #ccc',
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
  headLine: {
    fontSize: '1.25em',
    width: '100%',
    display: 'block',
    border: 'none',
    background: 'none',
    fontWeight: 'normal',
    color: 'black'
  },
  description: {
    fontSize: '1em',
    marginBottom: '20px',
    width: '100%',
    display: 'block',
    border: 'none',
    background: 'none',
    resize: 'none'
  },
  extraFieldTextArea: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '12pt',
    border: '1px solid #ddd'
  },
  extraFieldTitle: {
    fontSize: '1em',
    fontWeight: 'bold',
    margin: '30px 0 20px 0'
  }
};
