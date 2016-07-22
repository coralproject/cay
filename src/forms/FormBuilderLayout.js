
import React from 'react';
import FormComponent from 'forms/FormComponent';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaEye from 'react-icons/lib/fa/eye';
import askTypes from 'forms/WidgetTypes';
import Spinner from 'components/Spinner';

export const Header = ({ onTitleChange, form, forms, activeForm, onSaveClick, onOpenPreview }) => (
  <div style={ styles.formHeader }>
    <div style={ styles.titleAndMeta }>
      <input onChange={onTitleChange} style={styles.headLine} type="text"
        placeholder={ "Write a title" } defaultValue={ form.header.title } />
      {activeForm ?
        <div>
          <span style={ styles.created }>
            <strong style={ styles.strong }>Created by</strong> First Name, Last Name
          </span>
          <span style={ styles.created }>
            <strong style={ styles.strong }>Created on</strong> { form.createdAt }
          </span>
        </div>
    : ''}
    </div>
    <div style={ styles.formActions }>
      <button onClick={onOpenPreview} style={ styles.formAction }><FaEye /></button>
      <button onClick={onSaveClick} style={ styles.formAction }>{ forms.savingForm ? <Spinner/> : <FaFloppyO /> }</button>
    </div>
  </div>
);

export const Sidebar = ({ form, addToBottom, onFormStatusChange, activeForm, app }) => (
  <div style={styles.leftPan}>
    <div style={styles.leftContainer}>
      <h4 style={styles.leftContainerTitle}>Question Fields</h4>
      <p>Click on an field type to add it to the form.</p>
      <div style={styles.typeList}>
        {askTypes.map((type, i) => (
          <FormComponent key={i} field={type} onClick={() => addToBottom(type)} />
        ))}
      </div>
    </div>

    <div style={styles.leftContainer}>
      <h4 style={styles.leftContainerTitle}>Form Settings</h4>
      <h5 style={ styles.leftContainerSubTitle }>Set Form Status</h5>
      <label style={ styles.switch }>
        <input
          style={ styles.switchInput }
          checked={ form.settings.isActive }
          onChange={onFormStatusChange} type="checkbox" />
        <div style={ styles.switchSlider(form.settings.isActive) }>
          <span style={ styles.switchInactiveText }>Inactive</span>
          <span style={ styles.switchHandle }></span>
          <span style={ styles.switchActiveText }>Active</span>
        </div>
      </label>
      {
        activeForm ?
        (
          <div>
            <p>Embed code</p>
            <textarea style={styles.embedCode} value={`<div id="ask-form"></div><script src="${app.elkhornStaticHost}/${activeForm}.js"></script>`}/>
            <p>Embed code (iframe)</p>
            <textarea style={styles.embedCode} value={`<iframe width="100%" height="580" src="${app.elkhornHost}/iframe/${activeForm}"></iframe>`}/>
            <a href={ `${app.elkhornHost}/iframe/${activeForm}` } target="_blank" style={styles.formSettingsAction}>Standalone Form</a>
          </div>
        )
        : <p>This form is not saved. Once you save it you will see embed code here.</p>
      }
    </div>
  </div>
);

const styles = {
  leftPan: {
    width: 400
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
    backgroundColor: '#D8D8D8',
    padding: 20,
    color: '#5D5D5D',
    borderRadius: 4,
    marginBottom: 20
  },
  formDiagram: {
    height: 'auto',
    minHeight: '300px'
  },
  formDiagramContainer: {
    flex: 2,
    marginRight: 20,
    padding: 20,
    color: '#5d5d5d'
  },
  typeList: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  leftContainerTitle: {
    fontSize: 18.78,
    fontWeight: 'bold',
    marginBottom: 10
  },
  leftContainerSubTitle: {
    margin: '20px 0',
    fontSize: '14pt'
  },
  inactiveMessage: {
    width: '100%',
    padding: '10px',
    resize: 'none',
    height: '100px',
    color: '#AAA',
    border: '1px solid #BBB',
    borderRadius: '4px',
    fontSize: '12pt'
  },
  typesSubTitle: {
    fontSize: 16,
    marginBottom: 10
  },
  formSettingsAction: {
    display: 'inline-block',
    textDecoration: 'none',
    color: 'black',
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    border: '1px solid #BBB',
    borderRadius: '3px',
    background: 'white',
    fontSize: '12pt',
    cursor: 'pointer'
  },
  switchSlider: function(isActive) {
    return {
      position: 'absolute',
      width: '280px',
      left: isActive ? '-80px' : '0px',
      background: isActive ? '#292' : '#333',
      transition: 'all .5s',
      cursor: 'pointer',
      height: '45px'
    };
  },
  switch: {
    position: 'relative',
    height: '42px',
    display: 'inline-block',
    padding: 0,
    margin: 0,
    width: '120px',
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,.2)',
    borderRadius: '4px'
  },
  switchHandle: {
    display: 'block',
    'float': 'left',
    position: 'relative',
    width: '30px',
    height: '30px',
    margin: '5px',
    background: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 4px #aaa'
  },
  switchInput: {
    position: 'absolute',
    top: '-9000px',
    left: '-9000px'
  },
  switchActiveText: {
    display: 'block',
    'float': 'left',
    textAlign: 'center',
    width: '80px',
    height: '40px',
    lineHeight: '40px',
    color: 'white',
    textShadow: '0px 1px 2px #444'
  },
  switchInactiveText: {
    display: 'block',
    'float': 'left',
    textAlign: 'center',
    width: '80px',
    height: '40px',
    lineHeight: '40px',
    color: 'white',
    textShadow: '0px 1px 2px #444'
  },
  embedCode: {
    width: '100%',
    height: 50
  },
  formHeader: {
    display: 'flex',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottom: '1px solid #ccc'
  },
  titleAndMeta: {
    width: '70%'
  },
  formActions: {
    width: '30%',
    textAlign: 'right'
  },
  formAction: {
    width: '40px',
    height: '40px',
    padding: 0,
    lineHeight: '20px',
    marginLeft: '10px',
    border: '1px solid #AAA',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    fontSize: '14pt',
    display: 'inline-block',
    cursor: 'pointer'
  },
  strong: {
    fontWeight: 'bold'
  },
  formTitle: {
    fontSize: '15pt',
    marginBottom: '7px'
  },
  created: {
    marginRight: '15px'
  },
  headLine: {
    fontSize: '20pt',
    width: '100%',
    display: 'block',
    border: 'none',
    background: 'none',
    marginBottom: 10
  }
};
