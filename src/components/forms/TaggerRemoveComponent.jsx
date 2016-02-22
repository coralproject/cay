import React from 'react';

import { FaTimesCircle } from 'react-icons';

export default class TaggerRemoveComponent extends React.Component {
  render() {
    return (
      <button {...this.props}>
        <FaTimesCircle />
      </button>
    );
  }
}
