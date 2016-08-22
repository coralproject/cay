import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

// Icons
import FaTrash from 'react-icons/lib/fa/trash';
import FaClose from 'react-icons/lib/fa/close';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';

// DnD dependencies
import { DragSource } from 'react-dnd';
import DragHandler from 'forms/DragHandler';

// Actions
import { updateWidget } from 'forms/FormActions';

// Field Editors
import EditorFactory from 'forms/EditorFactory';

// Field types
import askTypes from 'forms/WidgetTypes';

@DragSource('DraggableFormField', DragHandler, (connect) => ({
  connectDragSource: connect.dragSource()
}))
@connect(({ forms }) => ({
  isDragging: forms.isDragging,
  widgets: forms.widgets
}))
export default class FormField extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    // fieldBackup is used to restore params when clicking Cancel
    this.state = { 'expanded': props.autoExpand, field: props.field, fieldBackup: props.field };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ field: nextProps.field, fieldBackup: nextProps.field });
  }

  toggleExpanded() {
    this.props.container.setState({ autoExpand: -1 });
    if (this.props.onList) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  onIdentityClick(e) {
    if (e) e.stopPropagation();
    var field = Object.assign({}, this.state.field);
    field.identity = e.target.checked;
    this.setState({ field: field });
  }

  onDescriptionChange(e) {
    var field = Object.assign({}, this.state.field);
    field.description = e.target.value;
    this.setState({ field: field });
  }

  onTitleChange(e) {
    var field = Object.assign({}, this.state.field);
    field.title = e.target.value;
    this.setState({ field: field });
  }

  onSaveClick(e) {
    if (e) e.stopPropagation();
    this.toggleExpanded();
    this.setState({ fieldBackup: this.state.field });
    this.props.dispatch(updateWidget(this.props.id, this.state.field));
  }

  onCancelClick(e) {
    if (e) e.stopPropagation();
    this.setState({ field: this.state.fieldBackup });
    this.toggleExpanded();
  }

  onEditorChange(field) {
    var fieldCopy = Object.assign({}, this.state.field, field);
    this.setState({ field: fieldCopy });
  }

  onClick() {
    const {onList, field, onClick } = this.props;
    if (!onList) {
      onClick(field);
    }
  }

  onKeyUp(e) {
    switch (e.keyCode) {
    case 13: // ENTER
      this.onSaveClick();
      break;
    case 27: // ESCAPE
      this.onCancelClick();
      break;
    }
  }

  getFieldEditor() {
    const { field } = this.state;
    // Passing listeners down from this class to the editors
    var localProps = { onEditorChange: this.onEditorChange.bind(this) };
    return EditorFactory[field.component] ? EditorFactory[field.component](field, localProps) : EditorFactory['TextField'](field, localProps);
  }

  render() {
    return this.props.connectDragSource(
      <div>
        { this.renderContainer() }
        {
          /*!this.props.isDragging && this.state.expanded
          ? this.renderExpanded()
          : this.renderCollapsed()*/
        }
      </div>
    );
  }

  getIcon(fieldType) {
    for (var i in askTypes) {
      if (askTypes[i].friendlyType == fieldType) return askTypes[i].icon;
    }
  }

  renderContainer() {
    const { id, onMove, isLast, position, onDelete, onDuplicate } = this.props;
    const { field } = this.state;
    const FieldIcon = this.getIcon(field.friendlyType);
    return (
      <div className={field.component + ' ' + id} style={ styles.fieldContainer(!this.props.isDragging && this.state.expanded) } key={ id }>
        <div style={ styles.fieldPosition }>{ position + 1 }</div>
        <div style={ styles.fieldIcon }><FieldIcon /></div>
        <div style={ styles.fieldContents }>

          {
            !this.state.expanded
            ? <h4 style={ styles.fieldTitleHeader }  onClick={ this.toggleExpanded.bind(this) }>
              { field.title ? field.title : 'Ask readers a question' }
              {
                field.wrapper && field.wrapper.required ?
                  <span style={ styles.requiredAsterisk }>*</span>
                :
                  null
              }
              {
                field.identity ?
                  <span style={ styles.identityLabel }><FaUser/></span>
                :
                  null
              }
            </h4>
            : null
          }

          {
            !this.props.isDragging && this.state.expanded
            ? this.renderExpanded()
            : null
          }

          <div style={styles.arrowContainer}>
            <button style={styles.copy} onClick={ onDuplicate.bind(this, position) }><FaCopy /></button>
            <button style={styles.delete} onClick={ onDelete.bind(this, position) }><FaTrash /></button>
            <button onClick={ position !== 0 ? onMove.bind(this, 'up', position) : null } style={styles.arrow} disabled={position === 0}><FaArrowUp /></button>
            <button onClick={ !isLast ? onMove.bind(this, 'down', position) : null } style={styles.arrow} disabled={!!isLast}><FaArrowDown /></button>
          </div>

        </div>
      </div>
    );
  }

  renderExpanded() {
    const { field } = this.state;
    const { id } = this.props;

    return  (
      <div className="widget-expanded" style={ styles.editSettingsPanel } onKeyUp={ this.onKeyUp.bind(this) }>

        <div style={ styles.titleAndDescription }>
          <input
            className="field-title"
            onChange={ this.onTitleChange.bind(this) }
            style={ styles.fieldTitle }
            defaultValue={ field.title }
            type="text"
            placeholder={ `Ask readers a question` }
            autoFocus={ true } />
          <input
            className="field-description"
            onChange={ this.onDescriptionChange.bind(this) }
            defaultValue={ field.description }
            style={ styles.fieldDescription }
            type="text"
            placeholder="Description text (optional)" />
        </div>

        { this.getFieldEditor() }

        <div style={ styles.bottomButtons }>
          <button className="field-close-button" style={ styles.cancelButton } onClick={ this.onCancelClick.bind(this) }><FaClose /> Cancel</button>
          <button className="field-close-button save-button" style={ styles.saveButton } onClick={ this.onSaveClick.bind(this) }><FaFloppyO /> Save</button>
        </div>

      </div>
    );
  }

}

export const styles = {
  fieldContainer: function(isExpanded) {
    return {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'top',
      backgroundColor: '#fff',
      width: '100%',
      boxShadow: '0 1px 3px #9B9B9B',
      borderRadius: 4,
      height: !isExpanded ? '50px' : 'auto',
      lineHeight: '1',
      cursor: 'pointer',
      flexDirection: 'row',
      position: 'relative'
    };
  },
  fieldHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  fieldContents: {
    flexGrow: 2
  },
  fieldIcon: {
    width: '40px',
    padding: '14px 10px',
    display: 'inline-block',
    textAlign: 'center',
    'float': 'left',
    marginLeft: '40px'
  },
  fieldTitleHeader: {
    flex: 1,
    alignSelf: 'flex-start',
    padding: '15px 10px 15px 0'
  },
  editBody: {
    flex: 1,
    alignSelf: 'flex-start',
    padding: '15px 10px'
  },
  arrowContainer: {
    position: 'absolute',
    top: '8px',
    right: '10px'
  },
  arrow: {
    width: '25px',
    height: '30px',
    padding: 0,
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  arrowPlaceHolder: {
    width: '25px',
    height: '30px',
    padding: 0,
    marginLeft: '5px',
    display: 'inline-block'
  },
  delete: {
    width: '25px',
    height: '30px',
    padding: 0,
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  copy: {
    width: '25px',
    height: '30px',
    padding: 0,
    lineHeight: '20px',
    border: 'none',
    background: 'none',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  editSettingsPanel: {
    position: 'relative',
    top: '0px',
    left: '0px',
    width: '100%',
    height: 'auto',
    padding: '10px 20px 20px 0px',
    backgroundColor: 'white'
  },
  saveButton: {
    display: 'inline-block',
    fontSize: '11pt',
    height: '40px',
    color: 'white',
    background: '#36B278',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0 20px',
    marginLeft: '10px'
  },
  cancelButton: {
    fontSize: '11pt',
    height: '40px',
    color: '#777',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '0 20px',
    marginLeft: '10px'
  },
  label: {
    display: 'block',
    width: '100%',
    marginBottom: '10px'
  },
  fieldTitle: {
    fontSize: '12pt',
    padding: '5px 0',
    width: '75%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  fieldDescription: {
    fontSize: '11pt',
    padding: '5px 0',
    marginBottom: '20px',
    width: '50%',
    display: 'block',
    border: 'none',
    background: 'none'
  },
  fieldPosition: {
    alignSelf: 'flex-start',
    fontWeight: 'normal',
    padding: '15px 15px',
    textAlign: 'center',
    borderRight: '1px solid #ddd',
    height: '100%',
    position: 'absolute'
  },
  fieldAndPosition: {
    display: 'flex',
    flexGrow: '1'
  },
  requiredAsterisk: {
    color: '#B22'
  },
  identity: {
    padding: '20px 0'
  },
  identityLabel: {
    color: '#333',
    padding: '0 5px',
    marginLeft: '5px',
    display: 'inline-block'
  },
  bottomButtons: {
    textAlign: 'right'
  },
  icon: {
    marginRight: 8,
    fontSize: '11pt'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '1em'
  }
};
