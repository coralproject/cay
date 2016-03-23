import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

import { upVoteComment, downVoteComment } from 'playground/PlaygroundActions';

@connect(state => state.playground)
@Radium
class Upvoter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { upVoted: false, downVoted: false }
  }

  onVoteButtonClick(direction, index, parents, e) {
    e.stopPropagation();
    switch (direction) {
      case 'up':
        if (this.state.downVoted) {
          this.setState({ upVoted: false, downVoted: false });  
        } else {
          this.setState({ upVoted: true, downVoted: false });  
        }
        this.props.dispatch(upVoteComment(index, parents))
      break;
      
      case 'down':
        if (this.state.upVoted) {
          this.setState({ upVoted: false, downVoted: false });  
        } else {
          this.setState({ upVoted: false, downVoted: true });  
        }
        this.props.dispatch(downVoteComment(index, parents))
      break;
    }
  }

  render() {

    var voteUpStyles = styles.voteUp;


    return (
      <div style={ styles.upvoter }>
        <div onClick={ this.onVoteButtonClick.bind(this, 'up', this.props.index, this.props.parents) } style={ [ styles.voteButtonWrapper, this.state.upVoted ? styles.activeArrowUp : null ] }>
          <FaCaretUp style={ styles.voteUp } />
        </div>
        <div style={ styles.number }>{ this.props.upvotes }</div>
        <div onClick={ this.onVoteButtonClick.bind(this, 'down', this.props.index, this.props.parents) } style={ [ styles.voteButtonWrapper, this.state.downVoted ? styles.activeArrowDown : null ] }>
          <FaCaretDown style={ styles.voteDown } />
        </div>
      </div>
    );

  }
}

// same as the @connect decorator above
export default Upvoter;

var styles = {
  upvoter: {
    position: 'absolute',
    width: '50px',
    right: '-10px',
    top: '-15px',
    textAlign: 'center'
  },
  voteUp: {
    fontSize: '39px',
    marginBottom: '5px',
  },
  voteDown: {
    fontSize: '39px',
    marginTop: '5px',
  },
  activeArrowUp: {
    color: '#6C6',
    transition: 'color .5s'
  },
  activeArrowDown: {
    color: '#C66',
    transition: 'color .5s'
  },
  voteButtonWrapper: {
    cursor: 'pointer',
    padding: '0',
    color: '#aaa',
    transition: 'color .5s'
  },
  number: {
    fontSize: '14pt',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '0 10px'
  },
  icon: {
    width: '40px'
  }
};
