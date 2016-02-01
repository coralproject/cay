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

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick() {
    this.setState({ isEditing: true });
  }

  handleKeyPress(event) {
    if(event.key == 'Enter') this.handleSave(event);
  }

  handleSave(event) {
    this.setState({ isEditing: false });
    if (this.props.onSave) {
      this.props.onSave(this.state.value);
    }
  }

  render() {

    var value = this.state.value;
    if (this.needsUpdate) {
      value = this.props.initialValue;
    }

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
  }
}
