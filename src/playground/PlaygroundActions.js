export const SHOW_CUSTOMIZER = "SHOW_CUSTOMIZER";
export const HIDE_CUSTOMIZER = "HIDE_CUSTOMIZER";
export const SET_TOGGLER = "SET_TOGGLER";
export const SET_TOPIC = "SET_TOPIC";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const UNLIKE_COMMENT = "UNLIKE_COMMENT";
export const SEND_COMMENT = "SEND_COMMENT";
export const REPLY_COMMENT = "REPLY_COMMENT";
export const UPVOTE_COMMENT = "UPVOTE_COMMENT";
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";
export const START_PULSATING = "START_PULSATING";
export const STOP_PULSATING = "STOP_PULSATING";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const BLOCK_USER = "BLOCK_USER";

export const showCustomizer = () => {
  return {
    type: SHOW_CUSTOMIZER
  };
};

export const hideCustomizer = () => {
  return {
    type: HIDE_CUSTOMIZER
  };
};

export const setToggler = (groupIndex, togglerIndex, status) => {
  return {
    type: SET_TOGGLER,
    groupIndex: groupIndex,
    togglerIndex: togglerIndex,
    status: status
  };
};

export const blockUser = (user) => {
  return {
    type: BLOCK_USER,
    user: user
  };
};

export const followUser = (user) => {
  return {
    type: FOLLOW_USER,
    user: user
  };
};

export const unFollowUser = (user) => {
  return {
    type: UNFOLLOW_USER,
    user: user
  };
};

export const setTopic = (topic) => {
  return {
    type: SET_TOPIC,
    topic: topic
  };
};

export const deleteComment = (index, parents) => {
  return {
    type: DELETE_COMMENT,
    index,
    parents
  };
};

export const likeComment = (index, parents) => {
  return {
    type: LIKE_COMMENT,
    index,
    parents
  };
};

export const unLikeComment = (index, parents) => {
  return {
    type: UNLIKE_COMMENT,
    index,
    parents
  };
};

export const upVoteComment = (index, parents) => {
  return {
    type: UPVOTE_COMMENT,
    index,
    parents
  };
};

export const downVoteComment = (index, parents) => {
  return {
    type: DOWNVOTE_COMMENT,
    index,
    parents
  };
};

export const sendComment = (comment) => {
  return {
    type: SEND_COMMENT,
    comment: comment
  };
};

export const replyComment = (comment, parents) => {
  return {
    type: REPLY_COMMENT,
    comment: comment,
    parents: parents
  };
};

export const startPulsating = (target) => {
  return {
    type: START_PULSATING,
    target: target
  };
};

export const stopPulsating = (target) => {
  return {
    type: START_PULSATING,
    target: target
  };
};
