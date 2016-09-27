import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

import FaTrash from 'react-icons/lib/fa/trash';
import FaClose from 'react-icons/lib/fa/close';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';

import { CoralButton } from '../components/ui/CoralButton';
import { CoralIcon } from '../components/ui/CoralIcon';

// DnD dependencies
import { DragSource } from 'react-dnd';
import DragHandler from 'forms/DragHandler';

// Actions
import { updateWidget } from 'forms/FormActions';

// Field Editors
import EditorFactory from 'forms/EditorFactory';

// Field types
import askTypes from 'forms/WidgetTypes';

// Tools
import cloneDeep from 'lodash/lang/cloneDeep';

@DragSource('DraggableFormField', DragHandler, (connect) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
}))
@connect(({ forms }) => ({
  isDragging: forms.isDragging,
  widgets: forms.widgets
}))
@Radium
export default class FormField extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    // fieldBackup is used to restore params when clicking Cancel
    this.state = {
      'expanded': props.autoExpand,
      field: props.field,
      fieldBackup: cloneDeep(props.field)
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.expandField = this.expandField.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ field: nextProps.field });
  }

  expandField() {
    // Create a backup copy of the field state before expanding
    this.setState({ fieldBackup: cloneDeep(this.state.field) });
    this.toggleExpanded();
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
    this.persistField(field);
  }

  onDescriptionChange(e) {
    var field = Object.assign({}, this.state.field);
    field.description = e.target.value;
    this.setState({ field: field });
    this.persistField(field);
  }

  onTitleChange(e) {
    var field = Object.assign({}, this.state.field);
    field.title = e.target.value;
    this.persistField(field);
  }

  persistField(field) {
    this.props.dispatch(updateWidget(this.props.id, field));
  }

  onSaveClick(e) {
    if (e) e.stopPropagation();
    this.toggleExpanded();
    this.setState({ fieldBackup: cloneDeep(this.state.field) });
    this.props.dispatch(updateWidget(this.props.id, this.state.field));
  }

  onCancelClick(e) {
    if (e) e.stopPropagation();
    // Restore the saved field backup on cancel
    this.props.dispatch(updateWidget(this.props.id, cloneDeep(this.state.fieldBackup)));
    this.toggleExpanded();
  }

  onEditorChange(field) {
    var fieldCopy = Object.assign({}, this.state.field, field);
    this.persistField(fieldCopy);
  }

  onClick() {
    const {onList, field, onClick } = this.props;
    if (!onList) {
      onClick(field);
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 27) {
      this.onCancelClick();
    }
  }

  getFieldEditor() {
    const { field } = this.state;
    // Passing listeners down from this class to the editors
    var localProps = { onEditorChange: this.onEditorChange };
    return EditorFactory[field.component] ? EditorFactory[field.component](field, localProps) : EditorFactory['TextField'](field, localProps);
  }

  render() {
    const { connectDragPreview } = this.props;
    return connectDragPreview(
      <div>
        { this.renderContainer() }
      </div>
    );
  }

  getIcon(field) {
    return askTypes.find(type => type.type === field[field.component ? 'component' : 'type']).icon;
  }

  renderContainer() {
    const { id, onMove, isLast, position, onDelete, onDuplicate, connectDragSource, isDragging, dragStarted } = this.props;
    const { field } = this.state;
    const FieldIcon = this.getIcon(field);
    const fieldTitle = field.title ? field.title : 'Ask readers a question';
    const requiredMark = field.wrapper && field.wrapper.required ? <span style={ styles.requiredAsterisk }>*</span> : null;
    const identityMark = field.identity ? <span style={ styles.identityLabel }><FaUser/></span> : null;

    const showExpanded = dragStarted ? false : this.state.expanded;

    return (
      <div className={field.component + ' ' + id} style={ styles.fieldContainer(showExpanded) } key={ id }>
        {connectDragSource(<div style={ styles.fieldPosition }>{ position + 1 }</div>)}
        <div style={ styles.fieldIcon }><FieldIcon /></div>
        <div style={ styles.fieldContents }>

          {
            !showExpanded
            ? <h4 style={ styles.fieldTitleHeader }  onClick={ this.expandField }>
              { fieldTitle }
              { requiredMark }
              { identityMark }
            </h4>
            : null
          }

          {
            showExpanded
            ? this.renderExpanded()
            : null
          }
          <div style={styles.arrowContainer}>
            <CoralIcon icon="content_copy" onClick={ onDuplicate.bind(this, position) } />
            <CoralIcon icon="delete" className="form-delete-widget-button" onClick={ onDelete.bind(this, position) } />
            <CoralIcon icon="arrow_upward" onClick={ position !== 0 ? onMove.bind(this, 'up', position) : null } disabled={position === 0} />
            <CoralIcon icon="arrow_downward" onClick={ !isLast ? onMove.bind(this, 'down', position) : null } disabled={!!isLast} />
          </div>
        </div>
      </div>
    );
  }

  renderExpanded() {
    const { field } = this.state;

    const { onTitleChange, onDescriptionChange, onCancelClick, onSaveClick, onKeyUp } = this;
    return  (
      <div className="widget-expanded" style={ styles.editSettingsPanel } onKeyUp={onKeyUp}>
        <div style={ styles.titleAndDescription }>
          <input
            className="field-title"
            onChange={onTitleChange}
            style={[styles.inputField, styles.fieldTitle]}
            defaultValue={ field.title }
            type="text"
            placeholder={ `Ask readers a question` }
            autoFocus={ true }
             />
          <input
            className="field-description"
            onChange={onDescriptionChange}
            defaultValue={field.description}
            style={[styles.inputField, styles.fieldDescription]}
            type="text"
            placeholder="Description text (optional)" />
        </div>

        { this.getFieldEditor() }

        <div style={ styles.bottomButtons }>
          <CoralButton
            icon="clear"
            onClick={onCancelClick}
            style={{ marginRight: 10 }}
          >
            Cancel
          </CoralButton>

          <CoralButton
            type="success"
            icon="done"
            onClick={onSaveClick}
            disabled={field.error}
          >
            Save
          </CoralButton>
        </div>
      </div>
    );
  }
}

export const styles = {
  base: {
    fontFamily: 'Roboto'
  },
  fieldContainer: function(isExpanded) {
    return {
      fontFamily: 'Roboto',
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
    color: '#262626',
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
    paddingLeft: 15,
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 100%)',
    right: 0,
    paddingRight: 5
  },
  arrow: {
    width: '30px',
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
    width: '30px',
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
    padding: '10px 20px 20px 10px',
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
    marginLeft: '10px',
    disabled: {
      background: 'grey'
    }
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
  inputField: {
    fontFamily: 'Roboto',
    fontSize: '12pt',
    width: '50%',
    display: 'block',
    border: 'none',
    background: 'none',
    padding: '0',
    margin: '2px 0'
  },
  fieldTitle: {
    fontSize: '12pt'
},
  fieldDescription: {
    fontSize: '10pt',
    marginBottom: '20px'
  },
  fieldPosition: {
    background: 'white',
    cursor: 'move',
    alignSelf: 'flex-start',
    fontWeight: 'normal',
    padding: '18px 12px',
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
