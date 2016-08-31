import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CommonFieldOptions from 'forms/CommonFieldOptions';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextAreaEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { field: props.field, minLengthEnabled: props.field.props.minLength > 0, maxLengthEnabled: props.field.props.maxLength > 0 }
  }

  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField, minLengthEnabled: nextProps.field.props.minLength > 0, maxLengthEnabled: nextProps.field.props.maxLength > 0 });
  }



  render() {
    let { field } = this.state;
    return (
      <div>
        <div style={ styles.bottomOptions }>
          <div style={ styles.bottomOptionsLeft }>
          </div>
          <CommonFieldOptions
            {...this.props}
          />
        </div>
      </div>
    );
  }

}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
  bottomCheck: {
    display: 'inline-block',
    padding: '10px 20px 10px 0',
    cursor: 'pointer',
  },
  bottomOptions: {
    display: 'flex',
    width: '100%'
  },
  bottomOptionsLeft: {
    flexGrow: '1'
  },
  bottomOptionsRight: {
    textAlign: 'right',
    flexGrow: '1'
  },
  bottomCheckTextInput: {
    display: 'inline-block',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    marginLeft: '10px',
    fontSize: '12pt',
    width: '50px',
    textAlign: 'center',
    padding: '4px'
  },
  disabled: {
    color: '#AAA'
  }

};
