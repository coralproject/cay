import React from 'react';
import Radium from 'radium';

import settings from '../settings';

import TextField from './forms/text-field';

@Radium
class DatePicker extends React.Component {
  render() {
    return (
      <div>
        <TextField />
      </div>
    );
  }
}

export default DatePicker;
