import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class Card extends React.Component {
  render() {
    return (
      <div className="card" style={[styles.base, this.props.style]}>{this.props.children}</div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: 'rgb(253,253,253)',
    marginBottom: 14,
    borderRadius: 3,
    padding: 10,
<<<<<<< HEAD
    color: settings.darkGrey,
    WebkitBoxShadow: '3px 3px 6px -1px ' + settings.mediumGrey,
    BoxShadow: '3px 3px 6px -1px ' + settings.mediumGrey
=======
    color: "rgb(100,100,100)",
    WebkitBoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)",
    BoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)"
>>>>>>> 78a0edce0d74e24c3458e13ca389d5b764f32dd7
  }
};
