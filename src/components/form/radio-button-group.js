import React, {PropTypes} from 'react';
import Radium from 'radium';

@Radium
export default class RadioButtonGroup extends React.Component {

  handleClick(e) {
    console.log('RadioButtonGroup', e);
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (content, i) => {
          return React.cloneElement(
            content,
            Object.assign({}, {handleClick: this.handleClick.bind(this)})
          );
        })}
        </div>
    );
  }
}
