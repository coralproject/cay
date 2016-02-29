import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
// import Flex from './layout/Flex';
import moment from 'moment';

// const style = {
// };

@Radium
class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  getStyles() {
    return {
      base: {
        fontSize: 24
      }
    };
  }
  makeTotalCommentsPhrase() {
    const statsCommentMinTotalDefault = 0;
    const statsCommentMaxTotalDefault = 10000;
    /* if the min and max for comments ARE NOT the defaults, render. */
    if (
      this.props['stats.comments.total'].userMin !== statsCommentMinTotalDefault ||
      this.props['stats.comments.total'].userMax !== statsCommentMaxTotalDefault
    ) {
      return (`
        wrote more than
        ${this.props['stats.comments.total'].userMin}
        but less than
        ${this.props['stats.comments.total'].userMax}
        total comments,
      `);
    }
  }
  makeAcceptRatioPhrase() {
    const acceptRatioMinDefault = 0;
    const acceptRatioMaxDefault = 1;
    /* if the min and max for comments ARE NOT the defaults, render. */
    if (
      this.props['stats.accept_ratio'].userMin !== acceptRatioMinDefault ||
      this.props['stats.accept_ratio'].userMax !== acceptRatioMaxDefault
    ) {
      return (`
        had a more than
        ${this.props['stats.accept_ratio'].userMin}
        but less than
        ${this.props['stats.accept_ratio'].userMax}
        accept ratio for comments they submitted,
      `);
    }
  }
  makeRepliesPerCommentPhrase() {
    const repliesPerCommentMaxDefault = 0;
    const repliesPerCommentMinDefault = 1;
    /* if the min and max for comments ARE NOT the defaults, render. */
    if (
      this.props['stats.replies_per_comment'].userMin !== repliesPerCommentMaxDefault ||
      this.props['stats.replies_per_comment'].userMax !== repliesPerCommentMinDefault
    ) {
      return (`
        had more than
        ${this.props['stats.replies_per_comment'].userMin}
        but less than
        ${this.props['stats.replies_per_comment'].userMax}
        replies per comment on average,
      `);
    }
  }
  makeRepliesPhrase() {
    const repliesMaxDefault = 0;
    const repliesMinDefault = 1000;
    /* if the min and max for comments ARE NOT the defaults, render. */
    if (
      this.props['stats.replies'].userMin !== repliesMaxDefault ||
      this.props['stats.replies'].userMax !== repliesMinDefault
    ) {
      return (`
        had more than
        ${this.props['stats.replies'].userMin}
        but less than
        ${this.props['stats.replies'].userMax}
        replies to their comments in total,
      `);
    }
  }

  getClauses() {
    const matchCommands = _.filter(this.props.queries[0].commands, command => {
      return _.has(command, '$match');
    });
    return _.map(matchCommands, command => {
      var name = _.first(_.keys(command.$match));
      return _.find(window.filters, {field: name}).description;
    }).join(' | ');
  }


  render() {
    const styles = this.getStyles();
    console.log('Sentence.render', this.props);
    return (
      <div style={[
        styles.base,
        this.props.style
      ]}>
        <p>
          {
            /* todo disable other inputs ? ask emma
            this.props['user_name'] ?
              `A user with the username ${this.props['user_name']}` :
              'Users who '
          }
          {
            this.props['last_login'] ?
            ` last logged in between
              ${moment(this.props['last_login'][0]).unix()} and
              ${moment(this.props['last_login'][1]).unix()}, ` :
            ''
          }
          {
            this.props['member_since'] ?
            ` became a member between
              ${moment(this.props['member_since'][0]).unix()} and
              ${moment(this.props['member_since'][1]).unix()}, ` :
            ''
          }
          {this.makeTotalCommentsPhrase()}
          {this.makeAcceptRatioPhrase()}
          {this.makeRepliesPerCommentPhrase()}
          {this.makeRepliesPhrase()}
          {
            this.props['status'] ?
              `have status ${this.props['status']}` :
              ''
          */}
          {this.getClauses()}
        </p>
      </div>
    );
  }
}

export default Sentence;

/*

propTypes: {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // Anything that can be rendered: numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: React.PropTypes.node,

    // A React element.
    optionalElement: React.PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: React.PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // An object that could be one of many types
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // An array of a certain type
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: React.PropTypes.any.isRequired,

*/
