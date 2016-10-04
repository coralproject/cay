import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { appendWidget } from 'forms/FormActions';
import DragHandler from 'forms/DragHandler';
import uuid from 'node-uuid';

@DragSource('DraggableFormField', DragHandler, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@connect(({ forms }) => ({
  widgets: forms.widgets
}))
export default class FieldTypeButton extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { field: props.field };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ field: nextProps.field });
  }

  render() {
    const { isDragging, connectDragSource, field } = this.props;

    return connectDragSource(
      <div className={field.type} onClick={ this.onClick.bind(this, field) } style={ styles.baseStyles(isDragging) }>
        <field.icon style={ styles.icon } />
        <span style={ styles.title }>{ field.friendlyType }</span>
      </div>
    );
  }

  onClick(fieldModel) {
    const { markAsUnsaved, dispatch } = this.props;
    markAsUnsaved();
    dispatch(appendWidget({
      title: fieldModel.title,
      description: fieldModel.description,
      friendlyType: fieldModel.friendlyType,
      type: 'field',
      component: fieldModel.type,
      identity: fieldModel.identity ? fieldModel.identity : false,
      wrapper: {},
      props: { ...fieldModel.props },
      id: uuid.v4()
    }));
  }
}

export const styles = {
  baseStyles: function(isDragging) {
    return {
      opacity: isDragging ? 0.75 : 1,
      marginRight: '10px',
      marginBottom: '10px',
      shadowOffset: { height: 1, width: 0},
      boxShadow: '0 1px 3px #9B9B9B',
      lineHeight: '40px',
      cursor: 'pointer',
      padding: '0 10px',
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 3,
      width: 150,
      textAlign: 'left',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center'
    };
  },
  icon: {
    marginRight: 8,
    fontSize: '11pt'
  },
  title: {
    fontSize: '.9em',
    fontWeight: 'normal',
    lineHeight: '1em'
  }
};
