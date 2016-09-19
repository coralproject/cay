import React, { Component } from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import DropHandler from 'forms/DropHandler';

@DropTarget('DraggableFormField', DropHandler, (connect, monitor) => ({
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
        <div style={ styles.padder } className="widget">
          {
            this.props.isOver
              ? <div style={ styles.dropPlaceHolderActive }></div>
              : <div style={ styles.dropPlaceHolder }>
                  {
                    this.props.children ?
                      this.props.children
                    :
                      <p style={ styles.emptyPlaceholderText }>Click or drag and drop fields here to add a question</p>
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
    minHeight: '50px',
    background: '#eee',
    borderRadius: '4px',
    transition: 'background .3s'
  },
  dropPlaceHolderActive: {
    border: '1px dashed #111',
    minHeight: '50px',
    background: '#aaccbb',
    padding: '25px',
    borderRadius: '4px',
    transition: 'background .3s'
  },
  emptyPlaceholderText: {
    textAlign: 'center',
    fontSize: '15pt',
    lineHeight: '70px',
    border: '1px dashed #111'
  },
  padder: {
    minHeight: '50px',
    paddingBottom: '10px'
  }
};
