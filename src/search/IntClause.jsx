import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from './layout/Flex';
// import { connect } from 'react-redux';
// import { FOO } from '../actions';

// const style = {
// };

// @connect(state => {
//   return state.FOO;
// })
@Radium
class IntClaus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  getStyles() {
    return {
      base: {
        backgroundColor: 'darkGrey',
        color: 'white',
        margin: "20px 20px 0px 0px",
        padding: '10px 20px',
        borderRadius: 4
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

export default IntClaus;
//
// clause(filterName) {
//   const f = this.props[filterName];
//   let _clause = "";
//

//
//   /* the filters are the same */
//   if (f.userMax === f.userMin) {
//     _clause = this.props[filterName].type === 'percentRange' ?
//     `exactly ${Math.floor(this.props[filterName].userMin * 100)}%` :
//     `exactly ${this.props[filterName].userMin}%`
//   }
//
//   return _clause;
//
//
//   // {
//   //   this.props[filterName].type === 'percentRange' ?
//   //   ` ${Math.floor(this.props[filterName].userMin * 100)}` :
//   //   ` ${this.props[filterName].userMin}`
//   // }
//   // {` and`}
//   // {
//   //   this.props[filterName].type === 'percentRange' ?
//   //   ` ${Math.floor(this.props[filterName].userMax * 100)}` :
//   //   ` ${this.props[filterName].userMax}`
//   // }
//   // {
//
//   // }
// }
