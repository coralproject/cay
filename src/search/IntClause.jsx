import React from 'react';
import Radium from 'radium';

@Radium
class IntClause extends React.Component {

  getStyles() {
    return {
      base: {
      }
    };
  }

  createText() {
    const f = this.props;
    let text = this.props.description;

    /*
      min is changed, so "more than foo"
      ***remember*** if section or author is clicked so ok if max is higher
    */
    if (
      f.userMin > f.min &&
      f.userMax >= f.max
    ) {
      text = `more than ${this.props.userMin} ${this.props.description}`;
    }

    /* max is changed, so "less than n" */
    if (
      f.userMin === f.min &&
      f.userMax < f.max
    ) {
      text = `less than ${this.props.userMax} ${this.props.description}`;
    }
    /*
      the filters are both changed, so "between n and n1"
      ***remember*** if section or author is clicked
      you'll have a usermax higher than max, hence < rather than !==
    */
    if (f.userMin > f.min && f.userMax < f.max) {
      text = `
        between ${this.props.userMin}
        and ${this.props.userMax}
        ${this.props.description}
      `;
    }
    /* sliders on same number, equality, so "exactly n" */
    if (f.userMin === f.userMax) {
      text = `exactly ${this.props.userMin} ${this.props.description}`;
    }
    return text;
  }
  render() {
    const styles = this.getStyles();
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

export default IntClause;
