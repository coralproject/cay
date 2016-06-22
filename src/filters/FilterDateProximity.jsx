import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

@connect(state => state.filters)
@Radium
export default class FilterDateProximity extends React.Component {

  onMaxChanged(e) {
    if (e.target.value.match(/[0-9]/)) {
      this.props.onChange(this.props.fieldName, 'userMax', +e.target.value);
    } else { // if the user enters a non-numeric or an empty string
      this.props.onChange(this.props.fieldName, 'userMax', this.props.max);
    }
  }

  render() {
    const [startDesc, endDesc] = this.props.description.split('_');
    return (
      <div style={[styles.base, this.props.style]}>
        <span style={styles.description}>
          {startDesc}
          <input
            onChange={this.onMaxChanged.bind(this)}
            style={styles.minMaxInputs}
            type="number"
            min="0"
             />
           {endDesc}
        </span>
      </div>
    );
  }
}

const styles = {
  base: {
    padding: '8px'
  },
  description: {
    fontWeight: 500,
    marginBottom: 10,
    color: 'rgb(130,130,130)',
    fontSize: 16
  },
  minMaxInputs: {
    padding: '7px 3px',
    marginLeft: 10,
    marginRight: 10,
    border: '1px solid lightgrey',
    width: 50,
    borderRadius: 3
  },
};
