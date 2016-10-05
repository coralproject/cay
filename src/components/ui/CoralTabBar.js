import React, { PropTypes, Component } from 'react'
import Radium from 'radium';

@Radium
export default class CoralTabBar extends Component {
  static propTypes = {
    activeTab: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    activeTab: 0
  };

  constructor(props) {
    super(props);

    this.handleClickTab = this.handleClickTab.bind(this);
  }

  handleClickTab(tabId) {
    if (this.props.onChange) {
      this.props.onChange(tabId);
    }
  }

  render () {
    const {
      children,
      style,
      activeTab
      } = this.props;

    return (
      <div
        className="mdl-tabs__tab-bar"
        style={[
          styles.base,
          style
          ]}
      >
        {React.Children.map(children, (child, tabId) =>
            React.cloneElement(child, {
              tabId,
              active: tabId === activeTab,
              onClick: this.handleClickTab,
            }))}
      </div>
    )
  }
};

const styles = {
  base: {
    border: 'none',
    height: 30
  }
}