import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

import FaCalendar from 'react-icons/lib/fa/calendar';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import CommonFieldOptions from 'forms/CommonFieldOptions';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class DateFieldEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { field: props.field }
  }

  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField });
  }

  render() {
    let { field } = this.state;
    return (
      <div>

        <div style={ styles.responseArea }>
          <span style={ styles.responseAreaSelect }>
            MM
            <span style={ styles.caret }><FaCaretDown /></span>
          </span>
          <span style={ styles.responseAreaSelect }>
            DD
            <span style={ styles.caret }><FaCaretDown /></span>
          </span>
          <span style={ styles.responseAreaSelect }>
            YYYY
            <span style={ styles.caret }><FaCaretDown /></span>
          </span>
          <span style={ styles.calendarIcon }><FaCalendar /></span>
        </div>

        <div style={ styles.bottomOptions }>

          <CommonFieldOptions {...this.props} />

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
    padding: '10px',
    cursor: 'pointer'
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
    fontSize: '12pt'
  },
  responseAreaSelect: {
    padding: '0 10px',
    lineHeight: '40px',
    height: '40px',
    border: '1px solid #ccc',
    marginRight: '5px',
    display: 'inline-block'
  },
  caret: {
    position: 'relative',
    paddingLeft: '10px',
    top: '-2px'
  },
  calendarIcon: {
    fontSize: '20pt',
    marginLeft: '10px'
  }

};
