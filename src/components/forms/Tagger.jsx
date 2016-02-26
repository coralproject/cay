import React, {PropTypes} from 'react';
import Radium from 'radium';

import TaggerRemoveComponent from './TaggerRemoveComponent';

import {WithContext as ReactTags} from 'react-tag-input';

@Radium
export default class Tagger extends React.Component {

  static propTypes = {
    type: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    tags: PropTypes.array,
    tagList: PropTypes.array,
    freeForm: PropTypes.bool
  }

  componentWillMount() {
    var tempTagList = [];
    for (var i in this.props.tagList) {
      tempTagList.push(this.props.tagList[i].name);
    }
    this.setState({
      tags: this.props.tags || [],
      tagList: tempTagList,
      isAllowed: true,
      id: this.props.id
    });
  }

  componentDidUpdate() {
    if (this.props.id != this.state.id) {
      this.setState({
        tags: this.props.tags || [],
        id: this.props.id
      });
    }
  }

  handleDelete(i) {
    var tags = this.state.tags.slice();
    tags.splice(i, 1);
    this.setState({tags: tags});
    if (tags.length < 1) this.setState({ isAllowed: true, alreadyAdded: false });
    if (this.props.onChange) {
      this.props.onChange(tags);
    }
  }

  isAlreadyAdded(tag) {
    for (var i in this.state.tags) {
      if (tag == this.state.tags[i].text) return true;// Early return on purpose.
    }
    return false;
  }

  handleAddition(tag) {
    if (this.props.freeForm || (this.state.tagList.indexOf(tag) > -1)) {
      if (!this.isAlreadyAdded(tag)) {
        var tags = this.state.tags.slice();
        tags.push({
          id: tags.length + 1,
          text: tag
        });
        this.setState({tags: tags, isAllowed: true, alreadyAdded: false });
        if (this.props.onChange) {
          this.props.onChange(tags);
        }
      } else {
        this.setState({ alreadyAdded: true, isAllowed: true });
      }
    } else {
      this.setState({ isAllowed: false, alreadyAdded: false });
    }

  }

  handleDrag(tag, currPos, newPos) {
    var tags = this.state.tags.slice();

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
  }

  render() {

    var tags = this.state.tags;

    return (
      <div style={ styles.outer }>
        <ReactTags tags={ tags }
          suggestions={ this.state.tagList }
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)}
          handleDrag={this.handleDrag.bind(this)}
          removeComponent={TaggerRemoveComponent}
          />
        {
          !this.state.isAllowed ?
            <p style={ styles.notAllowed }>The selected tag is not allowed, please select a tag from the dropdown.</p>
          : ''
        }
        {
          this.state.alreadyAdded ?
            <p style={ styles.notAllowed }>Tag was already added.</p>
          : ''
        }
      </div>
    );

  }
}

const styles = {
  outer: {
  },
  notAllowed: {
    color: '#900'
  }
};
