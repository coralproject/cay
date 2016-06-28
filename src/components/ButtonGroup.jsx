import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class ButtonGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {activeIndex: props.initialActiveIndex || 0};
  }

  static propTypes = {
    // if the {behavior} is "radio", there is only one active button at a time
    // if the {behavior} is "checkbox", there could be more than one
    initialActiveIndex: PropTypes.number.isRequired,
    initialCheckedIndexes: PropTypes.arrayOf(PropTypes.number), // if a checkbox
    behavior: PropTypes.oneOf(['default', 'radio', 'checkbox'])
  }

  setActiveIndex(activeIndex) {
    this.setState({activeIndex});
  }

  layoutButtons(children) {

    function getCorners (i, len) {
      let styleObj = {};
      if (len === 1) { // there is only one button
        // nothin'
      } else if (i === 0) {
        styleObj = {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        };
      } else if (i === len - 1) {
        styleObj = {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 'none'
        };
      } else { // one of the middle buttons
        styleObj = {
          borderRadius: 0,
          borderLeft: 'none'
        };
      }

      return styleObj;
    }

    return React.Children.map(children, (child, i) => {

      if (child.props.category) {
        console.warn('weird things might happen if you have a "category" property set in a ButtonGroup');
      }

      return React.cloneElement(
        child,
        {
          onClick: () => {
            this.setActiveIndex(i);
            // call the click handler on the old button if it exists
            child.props.onClick && child.props.onClick.call(child);
          },
          style: [ getCorners(i, children.length)],
          category: i === this.state.activeIndex ? 'brand' : 'default'
        }
      );
    });
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.layoutButtons(this.props.children)}
      </div>
    );
  }
}
