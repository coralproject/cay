import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class Tabs extends React.Component {
  makeTabButtons() {
    return React.Children.map(this.props.children, tabContent => {
      console.log(tabContent);
      return <div>Tab</div>
    });
  }
  render() {
    return (
      <div style={this.props.style}>
        <div style={styles.tabBar}>
          {this.makeTabButtons()}
        </div>
        {this.props.children}
      </div>
    );
  }
}

var styles = {
  tabBar: {

  }
}
