import { formDragStarted, formDragEnded } from 'forms/FormActions';

const DragHandler = {
  beginDrag(props, monitor, component) {
    if (component && component.dispatchProps) component.dispatchProps.dispatch(formDragStarted());

    console.log('beginDrag', props);

    return {
      field: props.field,
      id: props.id,
      onList: props.onList,
      position: props.position,
      component: component
    };
  },
  endDrag(props, monitor, component) {
    // dispatchProps should be merged with props but looks like it's not inside this call
    if (component && component.dispatchProps) component.dispatchProps.dispatch(formDragEnded());
    if (props.container) props.container.setState({ isHovering: false });
  }
};

export default DragHandler;
