import React, {PropTypes} from 'react';
import Radium from 'radium';

import settings from '../../settings';

@Radium
export default class Tabs extends React.Component {

  constructor(props) {
    super(props);
    let initialIndex = props.initialSelectedIndex || 0;
    initialIndex = initialIndex < this.getTabCount() ? initialIndex : 0;
    this.state = {selectedIndex: initialIndex};
  }

  changeTabs(index) {
    this.setState({selectedIndex: index});
  }

  makeTabButtons() {
    const activeTab = this.state.selectedIndex;
    return React.Children.map(this.props.children, (tabContent, i) => {
      return <div style={[
        styles.tab,
        i === activeTab && styles.activeTab
      ]} onClick={this.changeTabs.bind(this, i)}>{tabContent.props.title}</div>
    });
  }

  getTabCount() {
    return React.Children.count(this.props.children);
  }

  render() {
    return (
      <div style={this.props.style}>
        <div style={styles.bar}>
          {this.makeTabButtons()}
        </div>
        {React.Children.map(this.props.children, (content, i) => {
          return React.cloneElement(
            content,
            Object.assign({}, {active: i === this.state.selectedIndex})
          );
        })}
      </div>
    );
  }
}

const styles = {
  bar: {
    display: 'table',
    width: '100%'
  },
  tab: {
    display: 'table-cell',
    padding: '10px 15px',
    borderBottom: '1px solid ' + settings.lighterGrey,
    textAlign: 'center',
    cursor: 'pointer'
  },
  activeTab: {
    borderBottom: 'none',
    borderRight: '1px solid ' + settings.lighterGrey,
    borderLeft: '1px solid ' + settings.lighterGrey,
    borderTop: '3px solid ' + settings.primaryColor
  }
}
