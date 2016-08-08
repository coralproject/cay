const DropHelper = {

  // Putting this function inside the DropHandler would cause an
  // invariant violation on ReactDnD (see: http://gaearon.github.io/react-dnd/docs-drop-target.html)
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

const DropHandler = {

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

export default DropHandler;
