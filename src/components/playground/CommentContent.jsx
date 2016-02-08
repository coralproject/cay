import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import ReactEmoji from 'react-emoji';

@connect(state => state.playground)
@Radium
class CommentContent extends React.Component {

  filterContent(content) {
    var tagSearchPattern = /{(.+)}(.*){\/(\1)}/;
    var matches = content.match(tagSearchPattern);
    var filteredContent = content;
    if (matches) {
      var togglerGroupAndKey = matches[1].split(".");
      if (this.props.togglerGroups[togglerGroupAndKey[0]].togglers[togglerGroupAndKey[1]].status) {
        filteredContent = content.replace("{" + matches[1] + "}" + matches[2] + "{/" + matches[1] + "}", matches[2]);
      } else {
        filteredContent = content.replace("{" + matches[1] + "}" + matches[2] + "{/" + matches[1] + "}", "");
      }
      return this.filterContent(filteredContent);
    } else {
      return filteredContent;
    }

  }

  formatContent(content) {
    if (this.props.togglerGroups["content"].togglers["emoji"].status) {
      content = ReactEmoji.emojify(content);
    }
    return content;
  }

  render() {

    return (
      <div style={ styles.commentContent }>
        { this.formatContent(this.filterContent(this.props.content)) }
      </div>
    );

  }
}

// same as the @connect decorator above
export default CommentContent;

var styles = {
  commentContent: {
    fontSize: '12pt',
    minHeight: '60px'
  }
};