
import React, { Component } from 'react';
import Radium from 'radium';
import moment from 'moment';

import { xenia } from 'app/AppActions';
import Page from 'app/layout/Page';

@Radium
export default class SubmissionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submissions: [],
      activeSubmission: null,
      page: 1
    };

    this.fetchSubmissions();
  }

  fetchSubmissions() {
    const { params } = this.props;
    xenia()
      .collection('form_submissions')
      // TODO: The match is not working...
      //.match({ form_id: params.id })
      .skip(0)
    .exec().then(res => this.setState({
      loading: false,
      submissions: res.results[0].Docs,
      activeSubmission: res.results[0].Docs[0]
    }));
  }

  render() {
    const { submissions, activeSubmission } = this.state;
    return (
      <Page>
        <div style={styles.container}>
          <Sidebar submissions={submissions}
            activeSubmission={activeSubmission}
            onSelect={this.onSubmissionSelect.bind(this)} />
          <SubmissionDetail submission={activeSubmission}/>
        </div>
      </Page>
    );
  }

  onSubmissionSelect(activeSubmission) {
    console.log(activeSubmission);
    this.setState({ activeSubmission });
  }
}

@Radium
class Sidebar extends Component {
  render() {
    const { submissions, activeSubmission, onSelect} = this.props;
    return (
      <div style={styles.sidebar.container}>
        <div style={styles.sidebar.countContainer}>
          <p style={styles.sidebar.count}>{submissions.length}</p>
          <p style={styles.sidebar.count}>Submission{submissions.length === 1 ? '' : 's'}</p>
        </div>
        <input style={styles.sidebar.search} type='text' placeholder='Search' />
        <div style={styles.sidebar.sortContainer}>
          <select style={[styles.sidebar.sort, styles.sidebar.firstSort]}>
            <option>View All</option>
          </select>

          <select style={styles.sidebar.sort}>
            <option>Newest First</option>
          </select>
        </div>
        <div>
          {submissions.map((submission, key) => (
            <div onClick={() => onSelect(submission)}
              style={[styles.sidebar.submissionContainer, submission._id === activeSubmission._id ? styles.sidebar.activeSubmission : {}]} key={key}>
              <span>{submissions.length - key}</span>
              <span>{moment(submission.date_updated).format('L LT')}</span>
              <span></span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

@Radium
class SubmissionDetail extends Component {
  render() {
    const { submission } = this.props;
    if(!submission) {
      return (<h1 style={styles.detail.container}>No submissions</h1>);
    }

    return (
      <div style={styles.detail.container}>
        {this.renderAuthorDetail()}
        {this.renderAnswers()}
      </div>
    );
  }

  renderAnswers() {
    const { submission } = this.props;
    return (
      <div style={styles.detail.answersContainer}>
        {submission.replies.map((reply, key) => (
          <div style={styles.detail.questionContainer} key={key}>
            <h2 style={styles.detail.question}>{reply.question}</h2>
            <p>{this.renderAnswer(reply.answer)}</p>
          </div>
        ))}
      </div>
    );
  }

  renderAnswer(answer = {}) {
    if (answer.options) {
      return (
        <ul>
          {answer.options.map(option => (
            <li>- {option.title}</li>
          ))}
        </ul>
      )
    }

    return answer.text
  }

  renderAuthorDetail() {
    const { submission } = this.props;
    const author = submission.author || {};
    return (
      <div>
        <div style={styles.detail.headerContainer}>
          <span>{moment(submission.date_updated).format('L LT')}</span>
        </div>
        <div style={styles.detail.submissionContainer}>
          <div style={styles.detail.authorContainer}>
            <h2 style={styles.detail.authorTitle}>Submission Author Information</h2>
            <div style={styles.detail.authorDetailsContainer}>
              <div style={styles.detail.authorDetailsColumn}>
                <p>Name: {author.name}</p>
                <p>Location: {author.location}</p>
                <p>Email: {author.email}</p>
              </div>
              <div style={styles.detail.authorDetailsColumn}>
                <p>Age: {author.age}</p>
                <p>Phone: {author.phone}</p>
                <p>Occupation: {author.occupation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  detail: {
    questionContainer: {
      marginBottom: 20
    },
    answersContainer: {
      padding: 50,
      paddingTop: 0
    },
    question: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      marginBottom: 10
    },
    authorDetailsContainer: {
      display: 'flex',
      paddingTop: 10
    },
    authorDetailsColumn: {
      flex: 1
    },
    container: {
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
      margin: 30,
      marginTop: 0
    },
    submissionContainer: {
      padding: 50
    },
    headerContainer: {
      paddingBottom: 8,
      borderBottom: '3px solid #aaa'
    },
    authorContainer: {
      padding: 15,
      backgroundColor: '#ddd'
    },
    authorTitle: {
      fontSize: '1.2em'
    }
  },
  container: {
    display: 'flex'
  },
  sidebar: {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    count: {
      textAlign: 'center',
      fontSize: '1.5em'
    },
    countContainer: {
      marginBottom: 20
    },
    search: {
      height: 25,
      marginBottom: 20
    },
    sortContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    sort: {
      flex: 1
    },
    firstSort: {
      marginRight: 10
    },
    submissionContainer: {
      borderRadius: 2,
      backgroundColor: '#ddd',
      marginBottom: 5,
      padding: 8,
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#bbb'
      }
    },
    activeSubmission: {
      backgroundColor: '#bbb'
    }
  }
};
