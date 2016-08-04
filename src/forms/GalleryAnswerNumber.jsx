import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class GalleryAnswerNumber extends React.Component {
  static propTypes = {
    answer: PropTypes.shape({
      edited: PropTypes.string,
      answer: PropTypes.shape({
        value: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  }

  render() {

    const {answer} = this.props;
    const text = answer.edited ? answer.edited : answer.answer.value;

    return (
      <div>{text}</div>
    );
  }
}
