import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

import CommonFieldOptions from 'forms/CommonFieldOptions'
import editWidgetStyles from 'forms/editors/editWidgetStyles'

import { CharsInput } from '../../components/forms/CharsInput'

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class TextFieldEditor extends Component {

  constructor(props) {
    super(props)

    this.state = {
      field: props.field,
      minLengthEnabled: props.field.props.minLength > 0,
      maxLengthEnabled: props.field.props.maxLength > 0
    }

    this.onMinLengthChange = this.onMinLengthChange.bind(this)
    this.onMinCharsChange = this.onMinCharsChange.bind(this)
    this.onMaxCharsChange = this.onMaxCharsChange.bind(this)
    this.onMaxLengthChange = this.onMaxLengthChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    let { field } = this.state;
    let updatedField = Object.assign({}, field, nextProps.field);
    this.setState({ field: updatedField });
  }
  onMaxCharsChange(e) {
    const { field } = this.state
    const { onEditorChange } = this.props

    onEditorChange({
      ...field,
      props: {
        ...field.props,
        maxLength: e.target.value
      }
    })
  }
  onMaxLengthChange(e) {
    this.setState({
      maxLengthEnabled: e.target.checked
    })

    if (!e.target.checked) {
      const { field } = this.state
      const { onEditorChange } = this.props

      onEditorChange({
        ...field,
        props: {
          ...field.props,
          maxLength: 0
        }
      })
    }
  }
  onMinLengthChange(e) {
    this.setState({
      minLengthEnabled: e.target.checked
    })

    if (!e.target.checked) {
      const { field } = this.state
      const { onEditorChange } = this.props

      onEditorChange({
        ...field,
        props: {
          ...field.props,
          minLength: 0
        }
      })
    }
  }
  onMinCharsChange(e) {
    const { field } = this.state
    const { onEditorChange } = this.props

    onEditorChange({
      ...field,
      props: {
        ...field.props,
        minLength: e.target.value
      }
    })
  }
  render() {
    let { field, minLengthEnabled, maxLengthEnabled } = this.state;
    return (
      <div>
        <div style={styles.bottomOptions}>
          <div style={styles.bottomOptionsLeft}>
            <CharsInput
              label={'Min. Chars'}
              enabled={minLengthEnabled}
              handleCheckbox={this.onMinLengthChange}
              handleInput={this.onMinCharsChange}
              defaultValue={field.props.minLength || 0}
            />
            <CharsInput
              label={'Max. Chars'}
              enabled={maxLengthEnabled}
              handleCheckbox={this.onMaxLengthChange}
              handleInput={this.onMaxCharsChange}
              defaultValue={field.props.maxLength || 0}
            />
          </div>
          <CommonFieldOptions
            {...this.props}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
  bottomCheck: {
    display: 'inline-block',
    padding: '10px 10px 10px 0',
    cursor: 'pointer',
    lineHeight: '30px'
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
  bottomLabelText: {
    height: '30px',
    display: 'inline-block'
  },
  disabled: {
    color: '#AAA'
  }
}
