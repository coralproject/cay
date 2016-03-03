import React from 'react';
import Radium from 'radium';
// import _ from 'lodash';
// import Flex from './layout/Flex';
import { connect } from 'react-redux';
import {Link} from 'react-router';
// import { FOO } from '../actions';
import Page from './Page';
import {fetchPipelinesIfNotFetched, selectPipeline, fetchPipeline} from '../actions';
import Sentence from '../components/Sentence';
import Card from '../components/cards/Card';
import CardHeader from '../components/cards/CardHeader';
import ContentHeader from '../components/ContentHeader';
import Button from '../components/Button';

// const style = {
// };

@connect(state => state.pipelines)
@Radium
class SeeAllGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  componentWillMount() {
    // redirect user to /login if they're not logged in
    if (!this.props.authorized) {
      let {router} = this.context;
      return router.push('/login');
    }

    this.props.dispatch(fetchPipelinesIfNotFetched());
  }
  getStyles() {
    return {
      base: {

      }
    };
  }
  renderGroups() {
    console.log(this.props);
    const groups = this.props.pipelines.map((group, i) => {

      return (
        <Card style={styles.groupCard} key={i}>
          <CardHeader>{group.name}</CardHeader>
          <p>{group.desc}</p>
          <div style={styles.actionsContainer}>
            <Link
              style={styles.viewGroupLink}
              to={`/group/${group.name}`}>View Group</Link>
            <span>Edit Group (coming soon)</span>
          </div>
        </Card>
      );
    });
    return groups;
  }
  render() {
    return (
    <Page>
      <div style={[
        styles.base,
        this.props.style
      ]}>
        <ContentHeader title={ window.L.t('Commenter Groups') } />
        <div style={styles.cardHolder}>
          {this.renderGroups()}
        </div>
      </div>

    </Page>
    );
  }
}

export default SeeAllGroups;

const styles = {
  cardHolder: {
    display: 'flex'
  },
  sentenceHeading: {
    margin: "10px 0px",
    textTransform: "uppercase",
    fontWeight: 500
  },
  actionsContainer: {
    marginTop: 20
  },
  viewGroupLink: {
    marginRight: 20
  },
  groupCard: {
    flex: 1,
    margin: '20px 20px 0 0'
  }
};

/*

propTypes: {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // Anything that can be rendered: numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: React.PropTypes.node,

    // A React element.
    optionalElement: React.PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: React.PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // An object that could be one of many types
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // An array of a certain type
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: React.PropTypes.any.isRequired,

*/
