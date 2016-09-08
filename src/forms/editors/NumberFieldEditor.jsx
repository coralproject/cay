import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CommonFieldOptions from 'forms/CommonFieldOptions';

import editWidgetStyles from 'forms/editors/editWidgetStyles';

import CheckInput from '../../components/forms/CheckInput'

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class NumberFieldEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: props.field,
      minValueEnabled: props.field.props.minValue > 0,
      maxValueEnabled: props.field.props.maxValue > 0,
      error: false
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleMaxInput = this.handleMaxInput.bind(this)
    this.handleMinInput = this.handleMinInput.bind(this)
  }
  extendFieldProps(attrs){
    const { field, onEditorChange } = this.props
    onEditorChange({
      ...field,
      props: {
        ...field.props,
        ...attrs
      }
    })
  }
  deleteFieldProp(prop) {
    const { field, onEditorChange } = this.props
    const { [prop]:v, ...props } = field.props
    onEditorChange({
      ...field,
      props
    })
  }
  handleInputChange(value, prop) {
    this.extendFieldProps({
      [prop]: Number(value)
    })
  }
  handleMaxInput(e) {
    const maxValue = e.target.value;
    const { minValue } = this.props.field.props
    const { minValueEnabled, maxValueEnabled } = this.state
    const error = minValueEnabled && maxValueEnabled && maxValue < minValue

    if (!error) {
      this.handleInputChange(maxValue, 'maxValue')
    }

    this.setState({
      error: error
    })
  }
  handleMinInput(e) {
    const minValue = e.target.value;
    const { maxValue } = this.props.field.props
    const { minValueEnabled, maxValueEnabled } = this.state
    const error = minValueEnabled && maxValueEnabled && minValue > maxValue

    if (!error) {
      this.handleInputChange(minValue, 'minValue')
    }

    this.setState({
      error: error
    })
  }
  handleCheckboxChange(e, prop) {
    this.setState({
      [`${prop}Enabled`]: e.target.checked
    })

    if (!e.target.checked) {
      this.deleteFieldProp(prop)
    }
  }

  render() {
    const { handleMinInput, handleMaxInput, props, state } = this
    const { field } = props
    const { minValueEnabled, maxValueEnabled, error } = state

    return (
      <div>
        {
          error
            ? <span style={ [styles.error] }> {`Min. Value can't be greater than Max. Value`} </span>
            : null
        }
        <div style={ styles.bottomOptions }>
          <div style={styles.bottomOptionsLeft}>
            <CheckInput
              label={'Min. Value'}
              enabled={minValueEnabled}
              handleCheckbox={ (e) => this.handleCheckboxChange(e, 'minValue') }
              handleInput={handleMinInput}
              defaultValue={field.props.minValue}
            />
            <CheckInput
              label={'Max. Value'}
              enabled={maxValueEnabled}
              handleCheckbox={ (e) => this.handleCheckboxChange(e, 'maxValue') }
              handleInput={handleMaxInput}
              defaultValue={field.props.maxValue}
            />
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
  error: {
    color: 'red',
    display: 'block',
    fontSize: '12px'
  },
  page: {
    backgroundColor: '#F7F7F7'
  },
  bottomCheck: {
    display: 'inline-block',
    padding: '10px 10px 10px 0px',
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
    fontSize: '12pt',
    width: '50px',
    textAlign: 'center',
    padding: '4px'
  },
  disabled: {
    color: '#AAA'
  }

};
