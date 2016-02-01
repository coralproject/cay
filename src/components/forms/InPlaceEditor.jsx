import React from 'react';
import Radium from 'radium';
import settings from '../../settings';

import TextField from './TextField';

@Radium
export default class InPlaceEditor extends React.Component {

  componentDidMount() {
    this.setState({ value: this.props.initialValue, initialValue: this.props.initialValue });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick() {
    this.setState({ isEditing: true });
  }

  handleSave() {
    this.setState({ isEditing: false });
  }

  render() {

    return (
      <div style={[styles.base, this.props.style]}>
        {
          this.state.isEditing ?
            <div style={ styles.textAndButtonWrapper }>
              <TextField style={ styles.textField } defaultValue={ this.state.value } focusOnMount={ true } onChange={ this.handleChange.bind(this) } />
              <button onClick={ this.handleSave.bind(this) }>Save</button>
            </div>
          : 
            <div style={ styles.editableText } onClick={ this.handleClick.bind(this) }>{ this.state.value }</div>
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
