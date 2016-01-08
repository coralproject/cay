import React from 'react';
import Radium from 'radium';

import settings from '../../settings';

import DateTime from '../utils/date-time';

import TextField from '../forms/text-field';
import Paper from '../paper';
import CalendarMonth from './calendar-month';

class DatePicker extends React.Component {

  constructor(props) {
    super(props);

    console.log('DateTime.getWeekArray', DateTime.getWeekArray(new Date()));

    this.state = {date: new Date()};
  }

  getSelectedDate() {
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${dayOfWeek[this.state.date.getDay()]}, ${month[this.state.date.getMonth()]} ${this.state.date.getDate()}`;
  }

  render() {
    return (
      <Paper style={styles.base}>
        <div style={styles.header}>
          <p style={styles.selectedYear}>{this.state.date.getFullYear()}</p>
          {/* I'm going to see how far I can get without using Moment.js */}
          <p style={styles.selectedDate}>{this.getSelectedDate.call(this)}</p>
        </div>
        <CalendarMonth />
      </Paper>
    );
  }
}

export default Radium(DatePicker);

const styles = {
  base: {
    width: 200
  },
  header: {
    background: settings.brandColor,
    color: 'white'
  },
  selectedYear: {
    color: 'white'
  },
  selectedDate: {
    color: 'white',
    fontSize: '2em'
  }
};
