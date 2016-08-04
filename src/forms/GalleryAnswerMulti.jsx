import React, {PropTypes} from 'react';
import Radium from 'radium';
import last from 'lodash/array/last';

import settings from 'settings';

@Radium
export default class GalleryAnswerMulti extends React.Component {
  static propTypes = {
    answer: PropTypes.shape({
      answer: PropTypes.shape({
        options: PropTypes.arrayOf(PropTypes.object)
      }).isRequired,
      props: PropTypes.object
    }).isRequired
  }

  render() {
    const {answer} = this.props;

    const selectedIndexes = answer.answer.options.map(o => o.index);
    const options = answer.props.options.map((option, key) => {
      const selected = selectedIndexes.indexOf(key) !== -1;
      return <li style={[styles.option, selected && styles.selected]} key={key}>{key + 1}. {option.title}</li>;
    });

    if (answer.props.otherAllowed) {
      // this is very ambiguous. we should have a better solution for Other answers
      const otherAnswerSelected = last(selectedIndexes) >= answer.props.options.length;

      options.push(
        <li
          style={[styles.option, styles.other, otherAnswerSelected && styles.selected]}
          key='other'>
          Other: {last(answer.answer.options).title}
        </li>
      );
    }

    return <ul style={styles.multiple}>{options}</ul>;
  }
}

const styles = {
  option: {
    width: '49%',
    marginRight: '1%',
    padding: 10,
    display: 'inline-block',
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    border: '1px solid ' + settings.mediumGrey
  },
  selected: {
    backgroundColor: settings.darkerGrey,
    color: 'white'
  },
  other: {
    width: '99%'
  }
};
