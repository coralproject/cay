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
class ProximityClause extends React.Component {
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
    style: React.PropTypes.object
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  getStyles() {
    return {
      base: {
      }
    };
  }

  render() {
    console.log(this.props)
    const styles = this.getStyles();
    return (
      <span style={[
        styles.base,
        this.props.style
      ]}>
        {this.props.description.replace("_", this.props.userMax)}

      </span>
    );
  }
}

export default ProximityClause;
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
