import React from 'react';
import Radium from 'radium';
import PipelineCreator from '../components/PipelineCreator';

@Radium
class UserFormulaContainer extends React.Component {

  render() {
    return (
      <div>
        UserFormulaContainer
        <PipelineCreator userOnly={true}/>
      </div>
    );
  }
}

export default UserFormulaContainer;
