import _ from 'lodash';
// React isn't referenced, but the app crashes without it.
// even without extending React.Component wat.
import React, {Component} from 'react';

import UserFilters from 'filters/UserFilters';
import CommentFilters from 'filters/CommentFilters';
import AssetFilters from 'filters/AssetFilters';

function ObjectId() { }

var schema = {
  user: {
    id: ObjectId,
    name: String,
    avatar: String,
    status: String,
    lastLogin: Date,
    memberSince: Date,
    tags: [String]
  },
  asset: {

  },
  comment: {

  }
};

export default class FilterFactory extends Component {
  render() {
    switch (this.props.type) {
    case 'user':
      return <UserFilters onChange={this.props.onChange} />;
    case 'asset':
      return <AssetFilters onChange={this.props.onChange} />;
    case 'comment':
      return <CommentFilters onChange={this.props.onChange} />;
    }
  }
}
