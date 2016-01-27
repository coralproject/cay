import React, {PropTypes} from 'react';
import Radium from 'radium';

import DateTime from './utils/DateTime';

@Radium
export default class CommentDetail extends React.Component {
  render() {
    return (
      <div style={[styles.base, this.props.style]}>
        CommentDetail
        <p>{DateTime.format(new Date())}</p>
      </div>
    );
  }
}

const styles = {
  base: {

  }
};
