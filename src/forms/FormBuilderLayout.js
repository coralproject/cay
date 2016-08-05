
import React from 'react';
import FieldTypeButton from 'forms/FieldTypeButton';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
import FaEye from 'react-icons/lib/fa/eye';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import askTypes from 'forms/WidgetTypes';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

export const Header = ({ onTitleChange, form, forms, onSaveClick, onOpenPreview }) => (
  <div style={ styles.formHeader }>
    <div style={ styles.titleAndMeta }>
      <input onChange={onTitleChange} style={styles.headLine} type="text"
        placeholder={ "Write a title" } defaultValue={ form.header.title } />
    </div>
    <div style={ styles.formActions }>
      <Button
        onClick={onOpenPreview}
        category="brand"
        style={styles.topButton}>
        <FaEye style={styles.topButtonicon} />{` Preview `}
      </Button>
      <Button
        onClick={onSaveClick}
        category="success"
        style={styles.topButton}>
        { forms.savingForm ? <Spinner/> : <FaFloppyO /> }{` Save `}
      </Button>
    </div>
  </div>
);

export const Sidebar = ({ addToBottom, app, activeForm }) => (
  <div style={styles.leftPan}>
    <div style={styles.leftContainer}>
      <h4 style={styles.leftContainerTitle}>Question Fields</h4>
      <div style={styles.typeList}>
        {askTypes.map((type, i) => (
          <FieldTypeButton key={ i } field={ type } />
        ))}
      </div>
      {activeForm ? (
        <div style={styles.embedContainer}>
          <h4 style={styles.leftContainerTitle}>Embed codes</h4>
          <p>Embed code</p>
          <textarea style={styles.embedCode} value={`<div id="ask-form"></div><script src="${app.elkhornStaticHost}/${activeForm}.js"></script>`}/>
          <p>Embed code (iframe)</p>
          <textarea style={styles.embedCode} value={`<iframe width="100%" height="580" src="${app.elkhornHost}/iframe/${activeForm}"></iframe>`}/>
          <a href={ `${app.elkhornHost}/iframe/${activeForm}` } target="_blank" style={ styles.formSettingsAction }>
            <FaExternalLink /> Standalone Form
          </a>
        </div>
      ): null }
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
    padding: 20,
    paddingTop: 10,
    paddingLeft: 0,
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
    flexWrap: 'wrap',
    marginLeft: -8
  },
  leftContainerTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '.9em'
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
    color: 'white',
    marginTop: 10,
    width: '315px',
    padding: 10,
    border: 'none',
    borderRadius: '3px',
    background: '#4a4a4a',
    fontSize: '12pt',
    cursor: 'pointer',
    textAlign: 'center'
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
    width: 315,
    height: 50,
    marginBottom: 10
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
  topButton: {
    marginLeft: 10
  },
  topButtonIcon: {
    bottom: 5
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
  },
  embedContainer: {
    marginTop: 20
  }
};
