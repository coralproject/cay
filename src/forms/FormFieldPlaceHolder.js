import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import { appendWidget, moveWidget } from 'forms/FormActions';

const DropHelper = {

  showDropCandidate(draggedItem, container, targetPosition, component) {

    let currentFields = container.stateBeforeDrag.slice();

    // If item was present on the list
    if (draggedItem.onList) {

      // First we make a copy removing the dragged element
      let fieldsCopy = currentFields.slice();
      fieldsCopy.splice(draggedItem.position, 1);

      let fieldsBefore = fieldsCopy.slice(0, targetPosition);
      let fieldsAfter = fieldsCopy.slice(targetPosition);
      currentFields = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);

    } else {

      draggedItem.field.dropped = true;
      // If hovering over the default empty placeholder (the bottom one)
      if (component.props.empty) {
        currentFields[targetPosition] = draggedItem.field;
      } else {
        // if hovering over an existing field
        let fieldsBefore = currentFields.slice(0, targetPosition);
        let fieldsAfter = currentFields.slice(targetPosition);
        currentFields = fieldsBefore.concat(draggedItem.field).concat(fieldsAfter);
      }
    }

    container.setState({ currentFields });

  }
};

const askTarget = {

  // Hover changes the component's internal state
  hover(props, monitor, component) {

    let container = component.props.container;
    let targetPosition = component.props.position;
    container.cancelReset();

    // Hover is fired a gazillion times, this is to prevent
    // unnecessary re-renders
    if (targetPosition != container.previousHover) {
      container.previousHover = targetPosition;
    } else {
      return; // hovering the same as before? early return, do nothing.
    }

    container.setState({ isHovering: true });

    let draggedItem = monitor.getItem();

    DropHelper.showDropCandidate(draggedItem, container, targetPosition, component);

  },

  // persist state only on drop
  drop(props, monitor, component) {

    let container = component.props.container;
    let targetPosition = component.props.position;

    console.log('drop', component.props);

    var draggedItem = monitor.getItem();

    draggedItem.field.dropped = true;

    // If we are dragging an item already on the form
    if (draggedItem.onList) {
      container.moveWidget(draggedItem.position, targetPosition);
    } else {
      container.appendWidget(draggedItem.field, targetPosition);
    }

  }
};

@DropTarget('form_component', askTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
@connect(({ app, forms }) => ({ app, forms }))
export default class FormFieldPlaceHolder extends Component {

  componentWillReceiveProps(nextProps) {
    // This acts as an onLeave handler
    if (this.props.isOver && !nextProps.isOver) {
      this.props.container.enqueueReset();
    }
  }

  render() {
    return (
      this.props.connectDropTarget(
        <div style={ styles.padder }>
          {
            this.props.isOver
              ? <div style={ styles.dropPlaceHolderActive }></div>
              : <div style={ styles.dropPlaceHolder }>
                  {
                    this.props.children ?
                      this.props.children
                    :
                      <p style={ styles.emptyPlaceholderText }>Drag and drop fields here to add a question</p>
                  }
                </div>
          }
        </div>
      )
    );
  }
}

const styles = {
  dropPlaceHolder: {
    minHeight: '70px',
    background: '#eee',
    borderRadius: '4px',
    //marginBottom: '10px',
    transition: 'background .3s'
  },
  dropPlaceHolderActive: {
    border: '1px dashed #111',
    minHeight: '70px',
    background: '#aaccbb',
    padding: '30px',
    borderRadius: '4px',
    //marginBottom: '10px',
    transition: 'background .3s'
  },
  emptyPlaceholderText: {
    textAlign: 'center',
    fontSize: '15pt',
    lineHeight: '70px',
    border: '1px dashed #111'
  },
  padder: {
    minHeight: '80px',
    paddingBottom: '10px'
  }
};
