import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import { DropTarget } from 'react-dnd';

import DropPlaceHolder from 'forms/DropPlaceHolder';
import { appendWidget, moveWidget } from 'forms/FormActions';
import FormComponent, {styles as askComponentStyles} from 'forms/FormComponent';

import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up';
import FaUserPlus from 'react-icons/lib/fa/user-plus';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';

@connect(({ forms }) => ({ forms }))
export default class FormDiagram extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { widgets: [], isHovering: false, tempWidgets: [] };
    this.previousState = []; // a copy of state.fields
    this.previousHover = null; // cache the element previously hovered
  }

  render() {
    const { onFieldSelect, forms } = this.props;
    const { widgets } = forms;
    return (
      <div style={styles.formDiagramContainer}>
        <div style={ styles.formHeader }>
          <div style={ styles.titleAndMeta }>
            <h4 style={ styles.formTitle }>Untitled</h4>
            <div>
              <span style={ styles.created }>
                <strong style={ styles.strong }>Created by</strong> First Name, Last Name
              </span>
              <span style={ styles.created }>
                <strong style={ styles.strong }>Created on</strong> MM/DD/YYYY
              </span>
            </div>
          </div>
          <div style={ styles.formActions }>
            <button style={ styles.formAction }><FaUserPlus /></button>
            <button style={ styles.formAction }><FaArrowCircleUp /></button>
            <button style={ styles.formAction }><FaFloppyO /></button>
          </div>
        </div>
        <h4 style={ styles.headLine }>Write a Headline</h4>
        <p style={ styles.description }>Add instructions or a description</p>
        <div style={styles.formDiagram}>

          { this.state.tempWidgets.map((field, i) => (
            <DropPlaceHolder key={i} formDiagram={ this } position={ i }>
              <FormComponent onFieldSelect={onFieldSelect}
                onList={true} field={field} position={ i } isLast={i === this.state.tempWidgets.length - 1} id={i} key={i}
                onMove={this.onMove.bind(this)} />
            </DropPlaceHolder>
          ))}
          {
            this.state.isHovering ?
              null
            :
              <DropPlaceHolder empty={ true } formDiagram={ this } position={ this.state.tempWidgets.length } key={ this.state.tempWidgets.length } />
          }
        </div>
      </div>
    );
  }

  onMove(direction, id) {
    this.props.dispatch(moveWidget(id, id + (direction === 'up' ? -1 : 1)));
  }

  appendWidget(field) {
    this.props.dispatch(appendWidget({
      title: field.label,
      type: 'field',
      component: field.type,
      wrapper: {},
      props: {},
      id: Math.floor(Math.random() * 99999)
    }));
  }
}


const styles = {
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
    padding: '0',
    lineHeight: '20px',
    marginLeft: '10px',
    border: '1px solid #AAA',
    background: 'none',
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
    fontSize: '20pt'
  },
  description: {
    fontSize: '14pt',
    marginBottom: '20px'
  }
};
