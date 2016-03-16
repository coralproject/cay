import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import ReactEmoji from 'react-emoji';

@connect(state => state.playground)
@Radium
class CommentContent extends React.Component {

  filterContent(content) {
    /*
      This pattern searches for tags within comment content,
      those tags relate to the Playground's settings as in:

      {moderation.muting}...something...{/moderation.muting}

      So we can show some mutations inside the content.
    */
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

  // This function should prepare the content to be rendered as HTML
  // within a 'dangerouslySetInnerHTML' call.
  formatContent(content) {   
    if (this.props.togglerGroups["content"].togglers["emoji"].status) {
      content = ReactEmoji.emojify(content);
      // After running emojify, we get an array of strings (which may contain HTML)
      // and objects holding the Emojis
      content = content.map((obj) => {
        if (typeof obj == "object") {
          // We render the Emojis as plain HTML, 
          // or they would render as "[Object object]"
          return React.renderToString(<span>{ obj }</span>);
        } else {
          return obj;
        }
      }).join("");
    }
    return { __html: content };
  }

  render() {

    return (
      <div style={ styles.commentContent } dangerouslySetInnerHTML={ this.formatContent(this.filterContent(this.props.content)) }>
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
