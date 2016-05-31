import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import ContentHeader from 'components/ContentHeader';
import {connect} from 'react-redux';

import {requestEditAccess, leavingEdit} from 'forms/FormActions';
import Page from 'app/layout/Page';

@connect(state => ({ forms: state.forms }))
@Radium
export default class FormEdit extends Component {

  componentWillMount() {
    const {dispatch, params} = this.props;
    dispatch(requestEditAccess(params.id));
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    this.props.history.listenBefore(() => {
      dispatch(leavingEdit(params.id));
      return true;
    });
  }

  render() {
    const canEdit = this.props.forms.editAccess[this.props.params.id];
    return (
      <Page>
        <ContentHeader title="Ask" />
        <div>Can edit? {canEdit ? 'Yas!' : 'Nope :('}</div>
      </Page>
    );
  }
}
