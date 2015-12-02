import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../settings';

import Avatar from './avatar';
import Button from './button';
import FormattedDate from './formatted-date';

@Radium
export default class CommentDetail extends React.Component {
  render() {
    return (
      <div style={[styles.base, this.props.style]}>
        CommentDetail
        <FormattedDate date={new Date()} />
      </div>
    );
  }
}

const styles = {
  base: {

  }
};
