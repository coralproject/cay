import React, {PropTypes} from 'react';
import Radium from 'radium';
import _ from 'lodash';

@Radium
export default class RadioButtonGroup extends React.Component {

  constructor(props) {
    super(props);

    const children = React.Children.toArray(this.props.children);
    let selectedIndex = _.findIndex(children, child => {
      return child.props.checked === 'checked'
    });
    let initialValue = (selectedIndex !== -1) ? children[selectedIndex].props.value : undefined;
    if (selectedIndex === -1) {
      selectedIndex = null;
    }

    this.state = {selectedIndex: selectedIndex, value: initialValue};
  }

  handleClick(index, value) {
    this.setState({selectedIndex: index, value: value});
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (content, i) => {
          const checked = this.state.selectedIndex === i ? 'checked' : undefined;
          return React.cloneElement(
            content,
            Object.assign({}, {
              order: i, // key prop does not show up for some reason
              handleClick: this.handleClick.bind(this),
              checked: checked
            })
          );
        })}
      </div>
    );
  }
}
