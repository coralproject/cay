import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import { DropTarget } from 'react-dnd';

import DropPlaceHolder from 'forms/DropPlaceHolder';
import { appendWidget, moveWidget, replaceWidgets, deleteWidget, duplicateWidget, updateForm } from 'forms/FormActions';
import FormComponent, {styles as askComponentStyles} from 'forms/FormComponent';

@connect(({ forms, app }) => ({ forms, app }))
export default class FormDiagram extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { widgets: [], isHovering: false, tempWidgets: [], showTitleIsRequired: false };
    this.previousState = []; // a copy of state.fields
    this.previousHover = null; // cache the element previously hovered
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ widgets: nextProps.forms.widgets, tempWidgets: nextProps.forms.widgets, isHovering: false });
    this.previousState = nextProps.forms.widgets;
  }

  // TODO: Refactor: All this methods look very similar, maybe generalize into one?
  onFormHeadingChange(e) {
    const { form, activeForm } = this.props.forms;
    const header = activeForm ? this.props.forms[activeForm].header : form.header;
    this.props.dispatch(updateForm({
      header: {
        ...header,
        heading: e.target.value
      }
    }));
  }

  onFormDescriptionChange(e) {
    const { form, activeForm } = this.props.forms;
    const header = activeForm ? this.props.forms[activeForm].header : form.header;
    this.props.dispatch(updateForm({
      header: {
        ...header,
        description: e.target.value
      }
    }));
  }

  onThankYouDescriptionChange(e) {
    let { form } = this.props.forms;
    this.props.dispatch(updateForm({
      finishedScreen: {
        title: form.finishedScreen.title,
        description: e.target.value
      }
    }));
  }

  render() {
    const { onFieldSelect, forms } = this.props;
    const form = this.props.activeForm ? forms[this.props.activeForm] : forms.form;
    return (
      <div style={styles.formDiagramContainer}>
        <input onChange={ this.onFormHeadingChange.bind(this) } style={ styles.headLine } type="text" placeholder={ "Write a headline" } defaultValue={ form.header.heading } />
        {
          this.state.showTitleIsRequired ?
            <p style={ styles.titleIsRequired }>Title is required</p>
          :
            null
        }
        <textarea onChange={ this.onFormDescriptionChange.bind(this) } style={ styles.description } placeholder={ "Add instructions or a description" } defaultValue={ form.header.description } />
        <div style={styles.formDiagram}>
          { this.props.forms.widgets.map((field, i) => (
            <DropPlaceHolder key={i} formDiagram={ this } position={ i } dropped={ field.dropped }>
              <FormComponent
                id={ field.id }
                key={ i }
                field={ field }
                position={ i }
                onFieldSelect={ onFieldSelect }
                onList={ true }
                isLast={ i === this.props.forms.widgets.length - 1 }
                onMove={ this.onMove.bind(this) }
                onDuplicate={ this.onDuplicate.bind(this) }
                onDelete={ this.onDelete.bind(this) }
                 />
            </DropPlaceHolder>
          ))}
        </div>
        <div style={ styles.extraFields }>
          <h3 style={ styles.thankYouMessageTitle }>Thank you message</h3>
          <textarea
            defaultValue={ form.finishedScreen.description }
            style={ styles.customThankYouMessage }
            onChange={ this.onThankYouDescriptionChange.bind(this) }></textarea>
        </div>
      </div>
    );
  }

  onDelete(position, e) {
    e.stopPropagation();
    this.props.dispatch(deleteWidget(position));
  }

  onDuplicate(position, e) {
    e.stopPropagation();
    this.props.dispatch(duplicateWidget(position));
  }

  onMove(direction, position, e) {
    e.stopPropagation();
    this.props.dispatch(moveWidget(position, position + (direction === 'up' ? -1 : 1)));
  }

  moveWidget(origin, target) {
    this.props.dispatch(moveWidget(origin, target));
  }

  appendWidget(field, targetPosition) {
    this.props.dispatch(appendWidget({
      title: field.title,
      type: 'field',
      component: field.type,
      identity: false,
      wrapper: {},
      props: { ...field.props },
      id: Math.floor(Math.random() * 99999) + ''
    }, targetPosition));
  }

  persist(fields) {
    this.props.dispatch(replaceWidgets(fields));
  }

}


const styles = {
  formDiagram: {
    height: 'auto',
    minHeight: '300px',
    position: 'relative'
  },
  formDiagramContainer: {
    flex: 1,
    padding: 20,
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
    fontSize: '20pt',
    width: '100%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  description: {
    fontSize: '14pt',
    marginBottom: '20px',
    width: '100%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  customThankYouMessage: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '12pt'
  },
  thankYouMessageTitle: {
    fontSize: '14pt',
    fontWeight: 'bold',
    margin: '30px 0 20px 0'
  }
};
