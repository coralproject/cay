import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Comment from './Comment';

@connect(state => state.playground)
@Radium
class Stream extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeTab: 'all' };
  }

  getComments(comments, depth = 0, parentIndex = false, parents = []) {
    var parents = parents;
    return comments.map((comment, i) => { 
      return (
        <div style={ depth > 0 ? { marginLeft: '25px' } : null }>
          <Comment {...comment} key={ i } index={ i } depth={ depth } parents={ parents.concat([i]) } />
          {
            this.props.togglerGroups.stream.togglers.replies.status && comment.replies ? 
              this.getComments(comment.replies, depth + 1, i, parents.concat([i]))
            : 
              null
          }
        </div>
      );
    })
  }

  onTabClick(tab, e) {
    this.setState({ activeTab: tab })
  }

  render() {

    return (
      <div style={ styles.stream }>
        {
          this.props.togglerGroups.moderation.togglers.staffpicks.status ? 
            <div>
              <div style={ styles.streamTabs }>
                <button style={ [ styles.streamTab, this.state.activeTab == 'all' ? styles.activeTab : null ] } onClick={ this.onTabClick.bind(this, 'all') }>All</button>
                <button style={ [ styles.streamTab, this.state.activeTab == 'staff' ? styles.activeTab : null ] } onClick={ this.onTabClick.bind(this, 'staff') }>Staff Picks</button>
              </div>
              <div>
                { this.getComments(this.props.comments) }
              </div>

            </div>
          : 
            this.getComments(this.props.comments)
        }      
      </div>
    );

  }
}

// same as the @connect decorator above
export default Stream;

var styles = {
  stream: {
  },
  streamTabs: {
    borderBottom: '1px solid #ddd'
  },
  streamTab: {
    borderTop: '3px solid #ccc',
    borderRight: '1px solid #ddd',
    borderLeft: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    padding: '15px',
    fontSize: '14pt',
    fontWeight: '600',
    background: '#f0f0f0',
    marginTop: '10px',
    marginRight: '-1px',
    marginBottom: '-1px',
    cursor: 'pointer',
    outline: 'none'
  },
  activeTab: {
    borderTop: '3px solid red',
    borderBottom: '1px solid white',
    background: 'white'
  }
};