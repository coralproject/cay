import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class GalleryAnswerDate extends React.Component {
  static propTypes = {
    answer: PropTypes.shape().isRequired
  }

  render() {
    const {answer} = this.props;

    console.log('GalleryAnswerDate', answer);

    return (
      <div>Date</div>
    );
  }
}
