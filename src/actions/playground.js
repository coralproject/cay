export const SHOW_CUSTOMIZER = "SHOW_CUSTOMIZER";
export const HIDE_CUSTOMIZER = "HIDE_CUSTOMIZER";
export const SET_TOGGLER = "SET_TOGGLER";
export const SET_TOPIC = "SET_TOPIC";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const UNLIKE_COMMENT = "UNLIKE_COMMENT";
export const SEND_COMMENT = "SEND_COMMENT";

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

export const setTopic = (topic) => {
  return {
    type: SET_TOPIC,
    topic: topic
  };
};

export const likeComment = (index) => {
  return {
    type: LIKE_COMMENT,
    index: index
  };
};

export const unLikeComment = (index) => {
  return {
    type: UNLIKE_COMMENT,
    index: index
  };
};

export const sendComment = (comment) => {
  return {
    type: SEND_COMMENT,
    comment: comment
  };
};

