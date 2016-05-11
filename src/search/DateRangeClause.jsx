import React, {Component} from 'react';
import Radium from 'radium';
import moment from 'moment';

@Radium
export default class DateRangeClaus extends Component {
  createText() {
    const {description, userMin, userMax, min, max} = this.props;
    let text = '';

    console.log(min, max, userMin, userMax)
    if (userMin > min && userMax >= max) {
      text = `more than ${moment(userMin).format('l')} ${description}`;
    }

    if (userMin === min && userMax < max) {
      text = `less than ${moment(userMax).format('l')} ${description}`;
    }

    if (userMin > min && userMax < max) {
      text = `
        between ${moment(userMin).format('l')}
        and ${moment(userMax).format('l')}
        ${description}
      `;
    }
    /* sliders on same number, equality, so "exactly n" */
    if (userMin === userMax) {
      text = `exactly ${moment(userMin).format('l')} ${description}`;
    }

    return text;
  }
  render() {
    return (
      <span style={[
        styles.base,
        this.props.style
      ]}>
        {this.createText()}
      </span>
    );
  }
}

const styles = {
  base: {
    backgroundColor: 'darkGrey',
    color: 'white',
    margin: '20px 20px 0px 0px',
    padding: '10px 20px',
    borderRadius: 4
  }
};
