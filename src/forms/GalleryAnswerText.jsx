import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class GalleryAnswerText extends React.Component {
  static propTypes = {
    answer: PropTypes.shape({
      edited: PropTypes.string,
      answer: PropTypes.shape({
        text: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  render() {
    const {answer} = this.props;

    const text = answer.edited ? answer.edited : answer.answer.text;

    return (
      <div>{text}</div>
    );
  }
}
