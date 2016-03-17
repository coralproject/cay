import _ from 'lodash';
// React isn't referenced, but the app crashes without it.
// even without extending React.Component wat.
import React from 'react';

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

export default class FilterFactory extends React.Component {
  static makeFilters = (type) => {

    if (!_.includes(Object.keys(schema), type)) {
      throw new Error(`FilterFactory type must be of type [${Object.keys(schema).join('|')}]`);
    }

    switch (type) {
    case 'user':
      return <UserFilters />;
    case 'asset':
      return <AssetFilters />;
    case 'comment':
      return <CommentFilters />;
    }
  }
}
