import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

@connect(state => state.playground)
@Radium
class CustomizerSlider extends React.Component {

  render() {

    return (
      <div>
        <label>
          Slider Title<br />
          <input type="range" />
        </label>
        <p>
          Slider description
        </p>
      </div>
    );

  }
}

// same as the @connect decorator above
export default CustomizerSlider;
