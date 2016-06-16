import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';

@connect(state => state.filters)
@Radium
export default class FilterDateProximity extends React.Component {

  onMaxChanged(e) {
    this.props.onChange(this.props.fieldName, 'userMax', +e.target.value);
  }

  render() {

    return (
      <div style={[styles.base, this.props.style]}>
        <span style={styles.description}>
          {this.props.description.split('_')[0]}
          <input
            onChange={this.onMaxChanged.bind(this)}
            style={styles.minMaxInputs}
            type="number"
             />
           {this.props.description.split('_')[1]}
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
