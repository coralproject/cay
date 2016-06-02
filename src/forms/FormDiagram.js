import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import { DropTarget } from 'react-dnd';

import DropPlaceHolder from 'forms/DropPlaceHolder';
import { appendWidget, moveWidget } from 'forms/FormActions';
import FormComponent, {styles as askComponentStyles} from 'forms/FormComponent';

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
        <h4>This is the form name for the public</h4>
        <p>This is the form description for the users</p>
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
  builderContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  leftPan: {
    flex: 1
  },
  typesContainer: {
    flex: 1,
    marginRight: 20,
    backgroundColor: '#D8D8D8',
    padding: 20,
    color: '#5D5D5D',
    borderRadius: 4
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
};
