import React from 'react';
import Radium from 'radium';
import settings from '../../settings';

import TextField from './TextField';

@Radium
export default class InPlaceEditor extends React.Component {

  componentDidMount() {
    this.setState({ value: this.props.initialValue });
  }

  componentDidUpdate() {
    this.needsUpdate = true; // Updating the state to initialValue here would cause a recursion error
  }

  handleChange(newValue) {
    this.setState({value: newValue});
  }

  handleClick() {
    this.setState({ isEditing: true });
  }

  handleKeyPress(event) {
    if(event.key == 'Enter') this.handleSave(event);
  }

  handleSave(event) {
    if (this.props.validatorFunction) {
      if(!this.props.validatorFunction(this.state.value)) {
        this.setState({ showValidationError: true });
        return false;
      }
    }
    this.setState({ isEditing: false });
    if (this.props.onSave) {
      this.setState({ showValidationError: false });
      this.props.onSave(this.state.value);
    }
  }

  render() {

    var value = this.state.value;
    if (this.needsUpdate) {
      value = this.props.initialValue;
    }

    var validationMessage = this.state.showValidationError ?
      <div style={ styles.validationError }>
        { this.props.validationMessage }
      </div>
    : 
      null;

    return (
      <div style={[styles.base, this.props.style]}>
        {
          this.state.isEditing ?
            <div style={ styles.textAndButtonWrapper }>
              <TextField style={ styles.textField } defaultValue={ value } focusOnMount={ true } onChange={ this.handleChange.bind(this) } onKeyPress={ this.handleKeyPress.bind(this) } />
              <button onClick={ this.handleSave.bind(this) }>Save</button>
            </div>
          : 
            <div style={ styles.editableText } onClick={ this.handleClick.bind(this) }>{ value }</div>
        }
        { validationMessage }
      </div>
    );
  }
}

const styles = {
  base: {
    fontSize: '16px',
    width: '400px',
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'transparent'
  },
  textAndButtonWrapper: {
    width: '400px'
  },
  textField: {
    width: '50%'
  },
  editableText: {
    cursor: 'pointer'
  },
  validationError: {
    color: '#900',
    fontSize: '9pt',
    lineHeight: '1.1'
  }
}
