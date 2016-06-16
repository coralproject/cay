import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Checkbox from 'components/forms/Checkbox';
import TextField from 'components/forms/TextField';

@connect(({ forms, app }) => ({ forms, app }))
@Radium
export default class MultipleChoiceEditor extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p><TextField label='option 1' /></p>
        <p><TextField label='option 2' /></p>
        <p><TextField label='option 3' /></p>
        <Checkbox label='required' />
      </div>
    );
  }

}

const styles = {
  page: {
    backgroundColor: '#F7F7F7'
  },
};
