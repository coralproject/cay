import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

@connect(state => state.playground)
@Radium
class ReportingTool extends React.Component {

  options = [
    { 
      title: 'Spam',
      description: 'This person is advertising a product...',
      key: 1
    },
    { 
      title: 'Cheating',
      description: 'Trying to increase reputation by unethic means.',
      key: 2
    },
    { 
      title: 'Trolling',
      description: 'Provoking others into endless discussions...',
      key: 3
    },
    { 
      title: 'Offensive, insulting',
      description: 'Insulting others',
      key: 4
    },
    { 
      title: 'Discriminatory',
      description: 'Attacking a gender, race, religion...',
      key: 5
    }
  ];

  componentDidMount() {
    //console.log(this.props.position);
  }

  onReportingToolsClick(e) {
    e.stopPropagation();
  }

  render() {

    return (
      <div style={ [ styles.reportingTool ] } onClick={ this.onReportingToolsClick.bind(this) }>
        <div style={ styles.reportingToolOptions }>
          { 
            this.options.map((option, i) => { 
              return (
                <div style={ styles.reportingToolOption } key={i}>
                  <h4 style={ styles.reportingToolOptionHeader } >{ option.title }</h4>
                  <p style={ styles.reportingToolOptionDescription } >{ option.description }</p>
                </div>
              );
            })
          }
        </div>
        <div style={ styles.reportingToolFooter }>
          <p style={ styles.reportingHelp }>
            <strong>Is it more serious?</strong><br />
            If you think what you are trying to report does not fit into any of these categories, consider filing a report.
          </p>
          <button style={ styles.fileReportButton }>File a Report</button>
        </div>
      </div>
    );
  }
}

// same as the @connect decorator above
export default ReportingTool;

var styles = {
  reportingTool: {
    background: '#ccc',
    width: '350px',
    margin: '0',
    boxShadow: '0 0 10px black',
    borderRadius: '8px',
    position: 'absolute',
    top: '50px', // FIXME: Avoid magic numbers
    left: '50px'  // FIXME: Avoid magic numbers
  },
  reportingToolOptions: {
  },
  reportingToolOption: {
    padding: '20px',
    borderBottom: '1px solid #999',
    cursor: 'pointer'
  },
  reportingToolOptionHeader: {
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    lineHeight: '1'
  },
  reportingHelp: {
    width: '50%',
    padding: '5%',
    'float': 'left'
  },
  fileReportButton: {
    width: '30%',
    margin: '5%',
    'float': 'right'
  }
};