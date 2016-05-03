import React from 'react';
import Radium from 'radium';
import settings from '../../settings';

import TextField from './TextField';

@Radium
export default class InPlaceEditor extends React.Component {

  constructor(props) {
    super(props);
    this.previouslyFocused = false;
  }

  componentDidMount() {
    this.setState({ value: this.props.initialValue });
    // Since bind() will wrap onClickOutside, we need a proper ref
    // to the wrapped function to efectively remove the listener on unmount.
    this.bindedFunction = this.onClickOutside.bind(this);
    window.addEventListener('click', this.bindedFunction, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.bindedFunction);
  }

  onClickOutside(event) {
    this.setState({ isEditing: false });
  }

  onWrapperClick(event) {
    event.stopPropagation();
  }

  componentDidUpdate() {
    this.needsUpdate = true; // Updating the state to initialValue here would cause a recursion error
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(value, event) {
    event.stopPropagation();
    this.setState({ isEditing: true, value: value });
  }

  handleKeyPress(event) {
    if(event.key == 'Enter') this.handleSave(event);
  }

  handleSave(event) {
    event.stopPropagation();
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

  handleFocus(event) {
    if (!this.previouslyFocused) {
      event.target.selectionStart = event.target.selectionEnd = event.target.value.length;
      this.previouslyFocused = true;
    }
  }

  render() {

    var value = this.state.value;
    if (this.needsUpdate) {
      value = this.props.initialValue;
      this.needsUpdate = false;
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
              <input
                ref={function(input) {
                  if (input != null) {
                    input.focus();
                  }
                }}
                onClick={ this.onWrapperClick.bind(this) }
                onFocus={ this.handleFocus.bind(this) }
                style={ styles.textField }
                type="text"
                value={ this.state.value }
                onChange={ this.handleChange.bind(this) }
                onKeyPress={ this.handleKeyPress.bind(this) } />
              <button style={ styles.button } onClick={ this.handleSave.bind(this) }>Save</button>
            </div>
          :
            <div style={ styles.editableText } onClick={ this.handleClick.bind(this, value) }>{ value }</div>
        }
        { validationMessage }
      </div>
    );
  }
}

const styles = {
  base: {
    fontSize: '16px',
    //width: '400px',
    display: 'block',
    position: 'relative',
    backgroundColor: 'transparent'
  },
  textAndButtonWrapper: {
    width: '400px'
  },
  textField: {
    fontSize: '16px',
    width: '76%',
    padding: '0 2%',
    height: '40px',
    fontWeight: '300',
    margin: 0,
    display: 'inline-block',
    'float': 'left',
    borderTop: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRight: 'none',
  },
  editableText: {
    cursor: 'pointer'
  },
  validationError: {
    color: '#900',
    fontSize: '9pt',
    lineHeight: '1.1'
  },
  button: {
    width: '16%',
    padding: '0 2%',
    height: '40px',
    cursor: 'pointer',
    backgroundColor: settings.brandColor,
    color: 'white',
    border: 'none',
    display: 'inline-block',
    'float': 'left'
  }
}
