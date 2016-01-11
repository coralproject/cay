import React from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

// import our actions

import Slider from '../components/slider';
import Select from 'react-select';
import Paper from '../components/paper';

import DateTime from '../components/utils/date-time';

@connect(state => state.dataExplorer)
@Radium
class ExplorerControls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rangeStart: new Date(2014, 0, 1).getTime(),
      rangeEnd: new Date().getTime(),
      selectedStart: new Date(2014, 0, 1).toString(),
      selectedEnd: new Date().toString()
    };
  }

  handleTypeChange(value, initializer) {
    console.log('handleTypeChange', value, initializer);
  }

  handleFieldChange(value, initializer) {
    console.log('handleFieldChange', value, initializer);
  }

  formatDate(date) {
    return DateTime.format(new Date(date));
  }

  changeDate(values) {
    console.log('changeDate', ...arguments);
    const start = new Date(values[0]);
    const end = new Date(values[1]);

    this.setState({
      selectedStart: start.toString(),
      selectedEnd: end.toString()
    });
  }

  render() {

    var options = [
      { value: 'comment', label: 'Comment' },
      { value: 'asset', label: 'Asset' },
      { value: 'user', label: 'User' },
      { value: 'note', label: 'Note' }
    ];

    var fieldOptions = {
      comment: [
        {label: 'ID', value: 'CommentID'},
        {label: 'Body', value: 'CommentBody'},
        {label: 'ParentID', value: 'ParentID'},
        {label: 'AssetID', value: 'AssetID'},
        {label: 'StatusID', value: 'StatusID'},
        {label: 'CreateDate', value: 'CreateDate'},
        {label: 'UpdateDate', value: 'UpdateDate'},
        {label: 'ApproveDate', value: 'ApproveDate'}
      ],
      asset: [
        {label: 'ID', value: 'AssetID'},
        {label: 'VendorID', value: 'VendorID'},
        {label: 'SourceID', value: 'SourceID'},
        {label: 'AssetURL', value: 'AssetURL'},
        {label: 'CreateDate', value: 'CreateDate'},
        {label: 'UpdateDate', value: 'UpdateDate'},
        {label: 'Taxonomy', value: ''}
      ],
      user: [
        {label: 'id', value: 'UserID'},
        {label: 'displayname', value: 'UserDisplayName'},
        {label: 'name', value: ''},
        {label: 'avatar', value: ''},
        {label: 'email', value: ''}
      ],
      note: [
        {label: 'ID', value: 'commentNoteID'},
        {label: 'CommentID', value: 'CommentID'},
        {label: 'CommentNote', value: 'CommentNote'},
        {label: 'CreateDate', value: 'CreateDate'},
        {label: 'UpdateDate', value: 'UpdateDate'}
      ]
    };

    return (
      <Paper style={styles.base}>
        <p>Types?</p>
        <Select
            name="types"
            value={options[0].value}
            options={options}
            onChange={this.handleTypeChange.bind(this)}
        />
        <p>Fields?</p>
        <Select
          name="fields"
          options={fieldOptions.comment}
          onChange={this.handleFieldChange.bind(this)}
          multi={true} />
        <p>Date Range</p>
        <Slider
          min={this.state.rangeStart}
          max={this.state.rangeEnd}
          onChange={this.changeDate.bind(this)}
          defaultValue={[this.state.rangeStart, this.state.rangeEnd]}
          orientation="horizontal"
          withBars />
          <p>Start Date: {this.formatDate(this.state.selectedStart)}</p>
          <p>End Date: {this.formatDate(this.state.selectedEnd)}</p>
      </Paper>
    );
  }
}

export default ExplorerControls;

var styles = {
  base: {

  }
};
