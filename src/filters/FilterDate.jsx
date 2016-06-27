import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import DatePicker from 'react-datepicker';
import moment from 'moment';

@connect()
@Radium
export default class FilterDate extends React.Component {

  static propTypes = {
    userMin: PropTypes.instanceOf(Date),
    userMax: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    fieldName: PropTypes.string.isRequired
  }

  // called after either <DatePicker /> changes
  updateDateRange(ref, m) {
    if (ref === 'date_start') {
      this.props.onChange(this.props.fieldName, 'userMin', m.toDate());
    } else {
      this.props.onChange(this.props.fieldName, 'userMax', m.toDate());
    }
  }

  render() {

    return (
      <div style={[styles.base, this.props.style]}>
        <p style={styles.description}>{this.props.description}</p>

        <div style={styles.row}>
          <div style={styles.cell}>
            <p style={styles.label}>between</p>
            <DatePicker
              selected={moment(this.props.userMin)}
              onChange={this.updateDateRange.bind(this, 'date_start')} />
          </div>
          <div style={styles.cell}>
            <p style={styles.label}>and</p>
            <DatePicker
              selected={moment(this.props.userMax)}
              onChange={this.updateDateRange.bind(this, 'date_end')}
               />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    padding: '6px 8px'
  },
  description: {
    fontWeight: 500,
    marginBottom: 10,
    color: 'rgb(130,130,130)',
    fontSize: 16
  },
  row: {
    display: 'flex'
  },
  cell: {
    flex: 1
  },
};
